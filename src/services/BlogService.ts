import { 
  BlogCategories, 
  BlogPost, 
  BlogPostPreview, 
  BlogPostResponse, 
  BlogPosts, 
  BlogPostsFilters,
  BlogCategory,
  BlogAuthor
} from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

// Helper function to calculate reading time based on content length
const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

// Helper to transform Supabase blog post data to our frontend format
const transformPost = async (post: any): Promise<BlogPost> => {
  // Get category
  const { data: categoryData } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', post.category_id)
    .single();
  
  // Get author
  const { data: authorData } = await supabase
    .from('blog_authors')
    .select('*')
    .eq('id', post.author_id)
    .single();
  
  // Get tags
  const { data: tagRelations } = await supabase
    .from('blog_posts_tags')
    .select('tag_id')
    .eq('post_id', post.id);
  
  let tags: string[] = [];
  
  if (tagRelations && tagRelations.length > 0) {
    const tagIds = tagRelations.map(relation => relation.tag_id);
    const { data: tagsData } = await supabase
      .from('blog_tags')
      .select('name')
      .in('id', tagIds);
    
    if (tagsData) {
      tags = tagsData.map(tag => tag.name);
    }
  }
  
  // Transform to our model
  const category: BlogCategory = {
    id: categoryData.id,
    name: categoryData.name,
    slug: categoryData.slug
  };
  
  const author: BlogAuthor = {
    id: authorData.id,
    name: authorData.name,
    avatar: authorData.avatar,
    role: authorData.role,
    bio: authorData.bio
  };
  
  // Determine if this is a scheduled post (published in the future)
  let status = post.status || (post.published_at ? 'published' : 'draft');
  
  // If the post is published but has a future date, mark it as scheduled
  if (status === 'published' && post.published_at) {
    const publishDate = new Date(post.published_at);
    const now = new Date();
    if (publishDate > now) {
      status = 'scheduled';
    }
  }
  
  // Create post object with consistent camelCase properties
  const transformedPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    coverImage: post.cover_image,
    publishedAt: post.published_at,
    category,
    author,
    tags,
    status,
    lastSaved: post.updated_at || post.created_at,
    readingTime: post.reading_time || calculateReadingTime(post.content),
    seoTitle: post.seo_title || post.title,
    seoDescription: post.seo_description || post.excerpt || ''
  };
  
  // CRITICAL: Include the original properties to prevent hydration mismatches
  // This is a defense against property naming inconsistencies
  return {
    ...transformedPost,
    // Include original snake_case properties for backwards compatibility
    // This ensures both camelCase and snake_case properties are available
    cover_image: post.cover_image,
    published_at: post.published_at,
  };
};

// Helper to transform Supabase blog post data to preview format
const transformPostPreview = async (post: any): Promise<BlogPostPreview> => {
  const fullPost = await transformPost(post);
  const { content, ...previewPost } = fullPost;
  return previewPost;
};

export class BlogService {
  // Get all blog posts with pagination
  static async getPosts(filters: BlogPostsFilters = {}): Promise<BlogPosts> {
    const { 
      category, 
      search, 
      tag, 
      page = 1, 
      limit = 10 
    } = filters;
    
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });
    
    // Only show published posts to regular users
    query = query.eq('status', 'published');
    
    // Only show posts with published_at date in the past or now
    const now = new Date().toISOString();
    query = query.lte('published_at', now);
    
    // Apply category filter
    if (category) {
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }
    
    // Apply search filter - using safe parameterized filters
    if (search) {
      // Instead of string interpolation, use individual filter calls
      query = query.or([
        { title: { ilike: `%${search}%` } },
        { excerpt: { ilike: `%${search}%` } },
        { content: { ilike: `%${search}%` } }
      ]);
    }
    
    // Apply tag filter
    if (tag) {
      const { data: tagData } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('name', tag)
        .single();
      
      if (tagData) {
        const { data: postIds } = await supabase
          .from('blog_posts_tags')
          .select('post_id')
          .eq('tag_id', tagData.id);
        
        if (postIds && postIds.length > 0) {
          const ids = postIds.map(item => item.post_id);
          query = query.in('id', ids);
        } else {
          // No posts with this tag, return empty
          return {
            posts: [],
            totalCount: 0
          };
        }
      }
    }
    
    // Order by published date (newest first)
    query = query.order('published_at', { ascending: false });
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);
    
    // Execute query
    const { data, count, error } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
    
    const posts = await Promise.all(
      (data || []).map(post => transformPostPreview(post))
    );
    
    return {
      posts,
      totalCount: count || 0
    };
  }
  
  // Get featured posts for homepage
  static async getFeaturedPosts(count: number = 3): Promise<BlogPostPreview[]> {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', now)
      .order('published_at', { ascending: false })
      .limit(count);
    
    if (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }
    
    return Promise.all(
      (data || []).map(post => transformPostPreview(post))
    );
  }
  
  // Get a single blog post by slug
  static async getPostBySlug(slug: string, isAdmin: boolean = false): Promise<BlogPostResponse | null> {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug);
    
    // For public access, only return published posts that are not scheduled for the future
    if (!isAdmin) {
      const now = new Date().toISOString();
      query = query
        .eq('status', 'published')
        .lte('published_at', now);
    }
    
    const { data, error } = await query.single();
    
    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    const post = await transformPost(data);
    
    // Get related posts (same category, excluding current post)
    const { data: relatedData } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category_id', data.category_id)
      .eq('status', 'published')
      .neq('id', data.id)
      .limit(3);
    
    const related = await Promise.all(
      (relatedData || []).map(post => transformPostPreview(post))
    );
    
    return {
      post,
      related
    };
  }
  
  // Get all categories
  static async getCategories(): Promise<BlogCategories> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
    
    return {
      categories: data || []
    };
  }
  
  // Get popular tags
  static async getPopularTags(limit: number = 10): Promise<string[]> {
    // Get tag counts via a Supabase query
    const { data, error } = await supabase
      .from('blog_posts_tags')
      .select('tag_id, blog_tags(name)', { count: 'exact' })
      .order('tag_id');
    
    if (error) {
      console.error('Error fetching popular tags:', error);
      throw error;
    }
    
    // Count occurrences of each tag
    const tagCounts: Record<string, number> = {};
    
    data?.forEach(item => {
      // @ts-ignore - Supabase typings don't handle this well
      const tagName = item.blog_tags?.name;
      if (tagName) {
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      }
    });
    
    // Sort by count and return top tags
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
      .slice(0, limit);
  }
  
  // ADMIN FUNCTIONS - these would typically be protected by authentication
  
  // Create a new blog post
  static async createPost(postData: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      // Ensure required fields
      if (!postData.title || !postData.content) {
        throw new Error('Title and content are required');
      }
      
      // Generate slug if not provided
      if (!postData.slug) {
        const baseSlug = postData.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Check if slug already exists
        postData.slug = baseSlug;
        await this.ensureUniqueSlug(postData);
      } else {
        // Also check custom slugs for uniqueness
        await this.ensureUniqueSlug(postData);
      }
      
      // Calculate reading time if not provided
      if (!postData.readingTime && postData.content) {
        postData.readingTime = calculateReadingTime(postData.content);
      }
      
      // Validate required relationships
      if (!postData.category?.id) {
        throw new Error('Category is required');
      }
      
      if (!postData.author?.id) {
        throw new Error('Author is required');
      }
      
      // Extract tags before inserting
      const tags = postData.tags || [];
      delete (postData as any).tags;
      
      // Transform to Supabase format
      const supabasePost: any = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt || null,
        content: postData.content,
        cover_image: postData.coverImage || null,
        published_at: postData.publishedAt || null,
        status: postData.status || (postData.publishedAt ? 'published' : 'draft'),
        category_id: postData.category?.id,
        author_id: postData.author?.id,
        reading_time: postData.readingTime || null
      };
      
      // SEO fields - now enabled after migration
      supabasePost.seo_title = postData.seoTitle || postData.title;
      supabasePost.seo_description = postData.seoDescription || postData.excerpt || null;
      
      // Log each field to verify it's being sent correctly
      console.log('Creating post with these fields:', {
        title: supabasePost.title ? `${supabasePost.title.substring(0, 20)}...` : 'MISSING',
        content: supabasePost.content ? `${supabasePost.content.length} chars` : 'MISSING',
        excerpt: supabasePost.excerpt ? `${supabasePost.excerpt.substring(0, 20)}...` : 'MISSING'
      });
      
      console.log('Creating blog post with data:', JSON.stringify(supabasePost, null, 2));
      
      // Insert the post
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(supabasePost)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating blog post:', error);
        throw error;
      }
      
      if (!data || !data.id) {
        throw new Error('Failed to get created post data');
      }
      
      console.log('Blog post created successfully with ID:', data.id);
      
      // Add tags if provided
      if (tags.length > 0) {
        console.log('Adding tags to post:', tags);
        // Get or create tags
        for (const tagName of tags) {
          try {
            // Check if tag exists
            const { data: existingTag, error: tagLookupError } = await supabase
              .from('blog_tags')
              .select('id')
              .eq('name', tagName)
              .single();
            
            if (tagLookupError && tagLookupError.code !== 'PGRST116') { // Not found error
              console.error('Error looking up tag:', tagLookupError);
              continue;
            }
            
            let tagId;
            
            if (existingTag) {
              tagId = existingTag.id;
              console.log('Using existing tag:', tagName, tagId);
            } else {
              // Create new tag
              const { data: newTag, error: tagError } = await supabase
                .from('blog_tags')
                .insert({ name: tagName })
                .select()
                .single();
              
              if (tagError) {
                console.error('Error creating tag:', tagError);
                continue;
              }
              
              tagId = newTag.id;
              console.log('Created new tag:', tagName, tagId);
            }
            
            // Add relation
            const { error: relationError } = await supabase
              .from('blog_posts_tags')
              .insert({ post_id: data.id, tag_id: tagId });
              
            if (relationError) {
              console.error('Error creating tag relation:', relationError);
            }
          } catch (tagError) {
            console.error('Error processing tag:', tagName, tagError);
          }
        }
      }
      
      // Get the full post with relations (using admin=true to see scheduled posts)
      return this.getPostBySlug(data.slug, true)
        .then(response => response?.post || null);
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  }
  
  // Update an existing blog post
  static async updatePost(id: string, postData: Partial<BlogPost>, isPublishing: boolean = false): Promise<BlogPost | null> {
    try {
      // Extract tags before updating
      const tags = postData.tags;
      
      // Create a clean copy without complex objects
      const cleanPostData = { ...postData };
      delete cleanPostData.tags;
      delete cleanPostData.category;
      delete cleanPostData.author;
      
      // Transform to Supabase format
      const supabasePost: any = {
        title: cleanPostData.title,
        slug: cleanPostData.slug,
        excerpt: cleanPostData.excerpt,
        content: cleanPostData.content,
        cover_image: cleanPostData.coverImage,
        reading_time: cleanPostData.readingTime,
        updated_at: new Date().toISOString()
      };
      
      // SEO fields - now enabled after migration
      supabasePost.seo_title = cleanPostData.seoTitle;
      supabasePost.seo_description = cleanPostData.seoDescription;
      
      // IMPORTANT: Make sure key fields are sent even if undefined
      // This fixes issues where fields weren't being updated
      if (cleanPostData.title !== undefined) {
        supabasePost.title = cleanPostData.title;
      }
      
      if (cleanPostData.content !== undefined) {
        supabasePost.content = cleanPostData.content;
      }
      
      if (cleanPostData.excerpt !== undefined) {
        supabasePost.excerpt = cleanPostData.excerpt;
      }
      
      // Only update provided fields
      Object.keys(supabasePost).forEach(key => {
        if (supabasePost[key] === undefined) {
          delete supabasePost[key];
        }
      });
      
      // Handle published status
      if (isPublishing || cleanPostData.publishedAt !== undefined) {
        supabasePost.published_at = cleanPostData.publishedAt;
        
        if (cleanPostData.status) {
          supabasePost.status = cleanPostData.status;
        } else {
          supabasePost.status = cleanPostData.publishedAt ? 'published' : 'draft';
        }
      }
      
      // Directly set status if provided
      if (cleanPostData.status) {
        supabasePost.status = cleanPostData.status;
        
        // Ensure published_at is set or cleared based on status
        if ((cleanPostData.status === 'published' || cleanPostData.status === 'scheduled') && !supabasePost.published_at) {
          supabasePost.published_at = new Date().toISOString();
        } else if (cleanPostData.status === 'draft' && supabasePost.published_at === undefined) {
          supabasePost.published_at = null;
        }
      }
      
      // Update category if provided
      if (postData.category?.id) {
        supabasePost.category_id = postData.category.id;
      }
      
      // Update author if provided
      if (postData.author?.id) {
        supabasePost.author_id = postData.author.id;
      }
      
      console.log('Updating blog post:', id, JSON.stringify(supabasePost, null, 2));
      
      // Log the actual data being sent to Supabase for update
      console.log('Sending to Supabase for update:', {
        id,
        supabasePost,
        title: supabasePost.title ? 'PRESENT' : 'MISSING',
        content: supabasePost.content ? 'PRESENT' : 'MISSING',
        excerpt: supabasePost.excerpt ? 'PRESENT' : 'MISSING',
        fieldsCount: Object.keys(supabasePost).length
      });
      
      // Update the post
      const { data, error } = await supabase
        .from('blog_posts')
        .update(supabasePost)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned from update operation');
      }
      
      console.log('Blog post updated successfully, returned data:', {
        id: data.id,
        title: data.title || 'MISSING',
        content: data.content ? 'PRESENT' : 'MISSING',
        fieldsUpdated: Object.keys(data).length
      });
      
      // Update tags if provided
      if (tags) {
        try {
          console.log('Updating tags for post:', id, tags);
          
          // Remove existing tags
          const { error: deleteError } = await supabase
            .from('blog_posts_tags')
            .delete()
            .eq('post_id', id);
            
          if (deleteError) {
            console.error('Error deleting existing tags:', deleteError);
          }
          
          // Add new tags
          for (const tagName of tags) {
            try {
              // Check if tag exists
              const { data: existingTag, error: tagLookupError } = await supabase
                .from('blog_tags')
                .select('id')
                .eq('name', tagName)
                .single();
              
              if (tagLookupError && tagLookupError.code !== 'PGRST116') { // Not found error
                console.error('Error looking up tag:', tagLookupError);
                continue;
              }
              
              let tagId;
              
              if (existingTag) {
                tagId = existingTag.id;
                console.log('Using existing tag:', tagName, tagId);
              } else {
                // Create new tag
                const { data: newTag, error: tagError } = await supabase
                  .from('blog_tags')
                  .insert({ name: tagName })
                  .select()
                  .single();
                
                if (tagError) {
                  console.error('Error creating tag:', tagError);
                  continue;
                }
                
                tagId = newTag.id;
                console.log('Created new tag:', tagName, tagId);
              }
              
              // Add relation
              const { error: relationError } = await supabase
                .from('blog_posts_tags')
                .insert({ post_id: id, tag_id: tagId });
                
              if (relationError) {
                console.error('Error creating tag relation:', relationError);
              }
            } catch (tagError) {
              console.error('Error processing tag:', tagName, tagError);
            }
          }
        } catch (tagsError) {
          console.error('Error handling tags update:', tagsError);
        }
      }
      
      // Get the full post with relations (using admin=true to see scheduled posts)
      return this.getPostBySlug(data.slug, true)
        .then(response => response?.post || null);
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  }
  
  // Delete a blog post
  static async deletePost(id: string): Promise<boolean> {
    // Delete the post
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
    
    return true;
  }
  
  // Unpublish a blog post
  static async unpublishPost(id: string): Promise<BlogPost | null> {
    try {
      console.log('Unpublishing blog post:', id);
      
      // Update the post to set status to draft and remove published date
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          status: 'draft',
          published_at: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error unpublishing blog post:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned from unpublish operation');
      }
      
      console.log('Blog post unpublished successfully');
      
      // Get the full post with relations (using admin=true to see scheduled posts)
      return this.getPostBySlug(data.slug, true)
        .then(response => response?.post || null);
    } catch (error) {
      console.error('Error in unpublishPost:', error);
      throw error;
    }
  }
  
  // Get all blog posts for admin (including drafts and scheduled posts)
  static async getAdminPosts(filters: BlogPostsFilters = {}): Promise<BlogPosts> {
    const { 
      category, 
      search, 
      tag,
      status,
      page = 1, 
      limit = 10 
    } = filters;
    
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });
    
    // Apply status filter if specified
    if (status) {
      if (status === 'scheduled') {
        // Special case for scheduled posts (published status but future date)
        const now = new Date().toISOString();
        query = query
          .eq('status', 'published')
          .gt('published_at', now);
      } else {
        query = query.eq('status', status);
      }
    }
    
    // Admin can see all posts regardless of status
    
    // Apply category filter
    if (category) {
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }
    
    // Apply search filter - using safe parameterized filters
    if (search) {
      // Instead of string interpolation, use individual filter calls
      query = query.or([
        { title: { ilike: `%${search}%` } },
        { excerpt: { ilike: `%${search}%` } },
        { content: { ilike: `%${search}%` } }
      ]);
    }
    
    // Apply tag filter
    if (tag) {
      const { data: tagData } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('name', tag)
        .single();
      
      if (tagData) {
        const { data: postIds } = await supabase
          .from('blog_posts_tags')
          .select('post_id')
          .eq('tag_id', tagData.id);
        
        if (postIds && postIds.length > 0) {
          const ids = postIds.map(item => item.post_id);
          query = query.in('id', ids);
        } else {
          // No posts with this tag, return empty
          return {
            posts: [],
            totalCount: 0
          };
        }
      }
    }
    
    // Order by updated date (newest first)
    query = query.order('updated_at', { ascending: false });
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);
    
    // Execute query
    const { data, count, error } = await query;
    
    if (error) {
      console.error('Error fetching admin blog posts:', error);
      throw error;
    }
    
    const posts = await Promise.all(
      (data || []).map(post => transformPostPreview(post))
    );
    
    return {
      posts,
      totalCount: count || 0
    };
  }
  
  // Create or update a category
  static async saveCategory(categoryData: Partial<BlogCategory>): Promise<BlogCategory> {
    if (!categoryData.name) {
      throw new Error('Category name is required');
    }
    
    // Generate slug if not provided
    if (!categoryData.slug) {
      categoryData.slug = categoryData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    let result;
    
    if (categoryData.id) {
      // Update
      const { data, error } = await supabase
        .from('blog_categories')
        .update({
          name: categoryData.name,
          slug: categoryData.slug
        })
        .eq('id', categoryData.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating category:', error);
        throw error;
      }
      
      result = data;
    } else {
      // Create
      const { data, error } = await supabase
        .from('blog_categories')
        .insert({
          name: categoryData.name,
          slug: categoryData.slug
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating category:', error);
        throw error;
      }
      
      result = data;
    }
    
    return {
      id: result.id,
      name: result.name,
      slug: result.slug
    };
  }
  
  // Create or update an author
  static async saveAuthor(authorData: Partial<BlogAuthor>): Promise<BlogAuthor> {
    if (!authorData.name) {
      throw new Error('Author name is required');
    }
    
    let result;
    
    if (authorData.id) {
      // Update
      const { data, error } = await supabase
        .from('blog_authors')
        .update({
          name: authorData.name,
          avatar: authorData.avatar,
          role: authorData.role,
          bio: authorData.bio
        })
        .eq('id', authorData.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating author:', error);
        throw error;
      }
      
      result = data;
    } else {
      // Create
      const { data, error } = await supabase
        .from('blog_authors')
        .insert({
          name: authorData.name,
          avatar: authorData.avatar,
          role: authorData.role,
          bio: authorData.bio
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating author:', error);
        throw error;
      }
      
      result = data;
    }
    
    return {
      id: result.id,
      name: result.name,
      avatar: result.avatar,
      role: result.role,
      bio: result.bio
    };
  }
  
  // Delete a category (only if not used)
  static async deleteCategory(id: string): Promise<boolean> {
    // Check if category is used by any posts
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('id', { count: 'exact' })
      .eq('category_id', id);
    
    if (countError) {
      console.error('Error checking category usage:', countError);
      throw countError;
    }
    
    if (count && count > 0) {
      throw new Error('Cannot delete category that is used by posts');
    }
    
    // Delete the category
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
    
    return true;
  }
  
  // Delete an author (only if not used)
  static async deleteAuthor(id: string): Promise<boolean> {
    // Check if author is used by any posts
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('id', { count: 'exact' })
      .eq('author_id', id);
    
    if (countError) {
      console.error('Error checking author usage:', countError);
      throw countError;
    }
    
    if (count && count > 0) {
      throw new Error('Cannot delete author that is used by posts');
    }
    
    // Delete the author
    const { error } = await supabase
      .from('blog_authors')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting author:', error);
      throw error;
    }
    
    return true;
  }
  
  // Autosave a draft blog post
  static async autosaveDraft(id: string, postData: Partial<BlogPost>): Promise<boolean> {
    try {
      // Create a minimal update payload focused on content and related fields
      const updatePayload = {
        content: postData.content,
        title: postData.title,
        excerpt: postData.excerpt,
        status: 'draft',
        updated_at: new Date().toISOString()
      };
      
      // Only include fields that are defined
      Object.keys(updatePayload).forEach(key => {
        if (updatePayload[key] === undefined) {
          delete updatePayload[key];
        }
      });
      
      // Skip if nothing to update
      if (Object.keys(updatePayload).length === 0) {
        return false;
      }
      
      // Update the post
      const { error } = await supabase
        .from('blog_posts')
        .update(updatePayload)
        .eq('id', id);
      
      if (error) {
        console.error('Error autosaving draft:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error in autosaveDraft:', error);
      // Silently fail for autosave
      return false;
    }
  }
  
  // Get all authors
  static async getAuthors(): Promise<BlogAuthor[]> {
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
    
    return data || [];
  }
  
  // Upload an image for the blog post - using base64 encoding to bypass storage buckets
  static async uploadImage(file: File, postId: string, type: 'cover' | 'content'): Promise<string> {
    try {
      if (!postId) {
        throw new Error('Post ID is required for image upload');
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed');
      }
      
      // Validate file size (more strict for base64)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB max for base64 storage
      if (file.size > maxSizeInBytes) {
        throw new Error(`Image is too large. Maximum size is ${maxSizeInBytes / (1024 * 1024)}MB for direct storage`);
      }
      
      console.log('Using base64 encoding for image storage (bypassing Supabase Storage)');
      
      // Read the file as base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          try {
            // The result is the base64 string
            const base64String = reader.result as string;
            
            // Use the base64 string directly as the image URL
            // This bypasses storage buckets completely
            console.log('Image encoded as base64 successfully');
            
            // For memory efficiency, we could store these base64 strings
            // in the database instead of returning them directly, but
            // for simplicity we're just returning the data URI
            resolve(base64String);
          } catch (e) {
            reject(new Error('Failed to process base64 image data'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Failed to read file as base64'));
        };
        
        // Read the file as a data URL (base64)
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  }
  
  // Get default author - finds or creates "Team Zero" author
  static async getDefaultAuthor(): Promise<BlogAuthor> {
    try {
      // Look for existing Team Zero author
      const { data, error } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('name', 'Team Zero')
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found error
        console.error('Error finding default author:', error);
        throw error;
      }
      
      // If found, return the existing author
      if (data) {
        return data;
      }
      
      // If not found, create a new Team Zero author
      const { data: newAuthor, error: createError } = await supabase
        .from('blog_authors')
        .insert({
          name: 'Team Zero',
          role: 'ZeroVacancy Team',
          bio: 'The team at ZeroVacancy'
        })
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating default author:', createError);
        throw createError;
      }
      
      return newAuthor;
    } catch (error) {
      console.error('Error getting default author:', error);
      throw error;
    }
  }

  // Helper to ensure a blog post has a unique slug
  static async ensureUniqueSlug(postData: any): Promise<void> {
    if (!postData.slug) return;
    
    const baseSlug = postData.slug;
    let currentSlug = baseSlug;
    let counter = 1;
    let isUnique = false;
    
    while (!isUnique) {
      // Check if this slug exists
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', currentSlug)
        .maybeSingle();
      
      // If updating existing post, exclude current post
      if (data && 'id' in postData && data.id === postData.id) {
        // This is the same post, so slug is fine
        isUnique = true;
        break;
      }
      
      // If no existing post with this slug, we're good
      if (!data || error) {
        isUnique = true;
        break;
      }
      
      // Otherwise, increment counter and try again
      currentSlug = `${baseSlug}-${counter}`;
      counter++;
      
      // Safety limit to prevent infinite loops
      if (counter > 100) {
        throw new Error('Could not generate a unique slug after 100 attempts');
      }
    }
    
    // Set the unique slug on the post data
    postData.slug = currentSlug;
  }
}