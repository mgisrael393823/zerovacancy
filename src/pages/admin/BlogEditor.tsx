import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, 
  Calendar, 
  FilePlus,
  Eye, 
  ArrowLeft, 
  X, 
  Plus,
  AlertCircle,
  Clock,
  Send,
  ImageIcon,
  Archive,
  FileText,
  Tag,
  Users,
  Settings, 
  LogOut,
  CheckCircle,
  Search,
  Keyboard,
  KeyRound
} from '@/icons';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { BlogService } from '@/services/BlogService';
import { BlogPost, BlogCategory, BlogAuthor } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import SEO from '@/components/SEO';
import { useAuth } from '@/components/auth/AuthContext';
const RichTextEditor = lazy(() => import('@/components/blog/RichTextEditor'));
const ImageUploader = lazy(() => import('@/components/blog/ImageUploader'));
const CategorySelector = lazy(() => import('@/components/blog/CategorySelector'));
const SEOPanel = lazy(() => import('@/components/blog/SEOPanel'));
const KeyboardShortcutsHelp = lazy(() => import('@/components/blog/KeyboardShortcutsHelp'));
import { useBlogAutosave } from '@/hooks/use-blog-autosave';
import { usePreventNavigation } from '@/hooks/use-prevent-navigation';
import { registerShortcuts, commonEditorShortcuts, KeyboardShortcut } from '@/utils/keyboard-shortcuts';
// Temporarily removing CSS Module usage due to loading issues
// import styles from './BlogEditor.module.css';

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const isEditing = !!id;
  const [hydrated, setHydrated] = useState(false);
  
  // This helps prevent hydration errors by ensuring we only render
  // the full component after the client-side code is running
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  // Check admin access
  useEffect(() => {
    // Wait until auth state is loaded
    if (!authLoading) {
      const adminToken = sessionStorage.getItem('adminAccessToken');
      
      // If not authenticated or no admin token, redirect to login
      if (!isAuthenticated || adminToken !== 'granted') {
        navigate('/admin/login');
      }
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // Publishing state
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  // SEO metadata state
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  
  // UI enhancement states
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Track when content changes to determine if there are unsaved changes
  useEffect(() => {
    // If content changes after initial load, mark as having unsaved changes
    if (id && lastSaved) {
      setHasUnsavedChanges(true);
    }
  }, [title, content, excerpt, tags, coverImage, categoryId, authorId, seoTitle, seoDescription, id, lastSaved]);
  
  // Reset unsaved changes flag when content is saved
  useEffect(() => {
    if (lastSaved) {
      setHasUnsavedChanges(false);
    }
  }, [lastSaved]);
  
  // Enhanced navigation prevention when there are unsaved changes
  const { navigateSafely } = usePreventNavigation(
    hasUnsavedChanges,
    'You have unsaved changes that will be lost if you leave. Do you want to continue?',
    async () => {
      try {
        // Try to save before navigation
        return await manualSave();
      } catch (error) {
        console.error('Error saving before navigation:', error);
        return false;
      }
    }
  );
  
  // Use navigateSafely directly for all navigation
  const handleSafeNavigation = navigateSafely;
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  // isAutosaving and lastAutosaved now come from the useBlogAutosave hook
  
  // Use the save hook after state declarations
  const { 
    isAutosaving, 
    lastAutosaved, 
    showRecoveryDialog,
    recoveryData,
    triggerSave, // renamed from triggerAutosave
    clearLocalBackup,
    setShowRecoveryDialog
  } = useBlogAutosave({
    id,
    title,
    content,
    excerpt,
    isPublished: status === 'published',
    onSaved: (timestamp) => {
      setLastSaved(timestamp);
      setHasUnsavedChanges(false); // Clear unsaved changes flag when saved
      console.log('Saved at:', new Date(timestamp).toLocaleTimeString());
    },
    onError: (error) => {
      console.error('Save error:', error);
      // Don't show validation errors for save failures to avoid disrupting workflow
    }
  });
  
  // Load post data if editing, and load categories and authors
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch categories and authors
        const [categoriesData, authorsData, defaultAuthor] = await Promise.all([
          BlogService.getCategories(),
          BlogService.getAuthors(),
          BlogService.getDefaultAuthor()
        ]);
        
        setCategories(categoriesData.categories);
        setAuthors(authorsData);
        
        // Set default author to Team Zero if not editing
        if (!isEditing) {
          setAuthorId(defaultAuthor.id);
        }
        
        // If editing, fetch post data
        if (isEditing && id) {
          const posts = await BlogService.getAdminPosts();
          const post = posts.posts.find(p => p.id === id);
          
          if (post) {
            const fullPost = await BlogService.getPostBySlug(post.slug, true);
            
            if (fullPost && fullPost.post) {
              populateForm(fullPost.post);
              
              // No need to manually start autosave timer anymore
              // The useBlogAutosave hook handles this automatically
            } else {
              navigate('/admin/blog');
            }
          } else {
            navigate('/admin/blog');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditing, navigate]);
  
  // Populate form with post data
  const populateForm = (post: BlogPost) => {
    setTitle(post.title || '');
    setSlug(post.slug || '');
    setExcerpt(post.excerpt || '');
    setContent(typeof post.content === 'string' ? post.content : '');
    setCoverImage(post.coverImage || '');
    setCategoryId(post.category?.id || '');
    setAuthorId(post.author?.id || '');
    setTags(Array.isArray(post.tags) ? post.tags : []);
    
    // Set SEO metadata
    setSeoTitle(post.seoTitle || post.title || '');
    setSeoDescription(post.seoDescription || post.excerpt || '');
    
    // Determine status based on post status or published date
    let postStatus = post.status;
    if (!postStatus) {
      if (post.publishedAt) {
        const publishDate = new Date(post.publishedAt);
        const now = new Date();
        postStatus = publishDate > now ? 'scheduled' : 'published';
      } else {
        postStatus = 'draft';
      }
    }
    
    setStatus(postStatus);
    setPublishedAt(post.publishedAt);
    setLastSaved(post.lastSaved || null);
  };
  
  // Remove the old autosave functions since we're now using the hook
  
  // Function to manually trigger save when needed
  const manualSave = async () => {
    if (saving || publishing) {
      return;
    }
    
    if (!isEditing || !id) {
      return; // Can't save new posts (they don't have an ID yet)
    }
    
    // Use the hook's triggerSave function
    return await triggerSave(true);
  };
  
  // Generate slug from title
  const generateSlug = () => {
    if (!title || title.trim() === '') {
      setValidationError('Cannot generate slug from empty title');
      return;
    }
    
    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    if (!slug || slug === '') {
      setValidationError('Generated slug is empty. Please enter a title with alphanumeric characters.');
      return;
    }
    
    setSlug(slug);
    setValidationError(''); // Clear any validation errors
  };
  
  // Add a tag
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Form validation state
  const [validationError, setValidationError] = useState('');
  
  // Validate form before submission
  const validateForm = () => {
    if (!title) {
      setValidationError('Title is required');
      return false;
    }
    
    if (!slug) {
      setValidationError('Slug is required');
      return false;
    }
    
    if (!content) {
      setValidationError('Content is required');
      return false;
    }
    
    if (!categoryId) {
      setValidationError('Category is required');
      return false;
    }
    
    if (!authorId) {
      setValidationError('Author is required');
      return false;
    }
    
    return true;
  };
  
  // Handle save (without publishing)
  const handleSave = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setValidationError('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      const now = new Date().toISOString();
      // Log all form values for debugging
      console.log('Current form values:', {
        title: title || 'MISSING',
        slug: slug || 'MISSING',
        excerpt: excerpt || 'MISSING',
        content: content || 'MISSING',
        coverImage: coverImage ? 'PRESENT' : 'MISSING',
        categoryId: categoryId || 'MISSING',
        authorId: authorId || 'MISSING',
        tags: tags || 'MISSING',
        contentLength: content ? content.length : 0
      });
      
      const postData: Partial<BlogPost> = {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: 'draft',
        publishedAt: null,
        category: { id: categoryId } as BlogCategory,
        author: { id: authorId } as BlogAuthor,
        tags,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt
      };
      
      console.log('Saving draft with data:', JSON.stringify({
        ...postData,
        content: postData.content ? `[CONTENT: ${postData.content.substring(0, 100)}...]` : 'MISSING',
        coverImage: postData.coverImage ? 'PRESENT' : 'MISSING'
      }, null, 2));
      
      if (isEditing && id) {
        await BlogService.updatePost(id, postData);
      } else {
        const newPost = await BlogService.createPost(postData);
        if (newPost && newPost.id) {
          // Redirect to edit page for the new post
          navigate(`/admin/blog/edit/${newPost.id}`);
          return;
        }
      }
      
      // Update last saved time
      setLastSaved(now);
      
      // Show success message
      alert('Draft saved successfully');
    } catch (error: any) {
      // Extract meaningful error message
      const errorMessage = error.message || 'Failed to save post. Please try again.';
      console.error('Error saving post:', error);
      setValidationError(errorMessage);
      
      // Don't navigate away on error
      window.scrollTo(0, 0); // Scroll to top to show error
    } finally {
      setSaving(false);
    }
  };
  
  // Handle publish
  const handlePublish = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setValidationError('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setPublishing(true);
    
    try {
      // Use the selected date or current date if not specified
      const publishDate = publishedAt || new Date().toISOString();
      const isScheduled = publishedAt && new Date(publishedAt) > new Date();
      
      // Determine if we're scheduling or publishing immediately
      const postStatus = isScheduled ? 'scheduled' : 'published';
      const statusMessage = isScheduled ? 'scheduled' : 'published';
      
      const postData: Partial<BlogPost> = {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: postStatus,
        publishedAt: publishDate,
        category: { id: categoryId } as BlogCategory,
        author: { id: authorId } as BlogAuthor,
        tags,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt
      };
      
      console.log(`${isScheduled ? 'Scheduling' : 'Publishing'} post:`, postData);
      
      if (isEditing && id) {
        await BlogService.updatePost(id, postData, true);
      } else {
        const newPost = await BlogService.createPost(postData);
        if (newPost && newPost.id) {
          // Go to blog admin
          navigate('/admin/blog');
          return;
        }
      }
      
      // Show appropriate success message
      alert(`Post has been ${statusMessage} successfully`);
      
      // Success - go back to blog admin
      navigate('/admin/blog');
    } catch (error: any) {
      // Extract meaningful error message
      const errorMessage = error.message || 'Failed to publish post. Please try again.';
      console.error('Error publishing post:', error);
      setValidationError(errorMessage);
      
      // Don't navigate away on error
      window.scrollTo(0, 0); // Scroll to top to show error
    } finally {
      setPublishing(false);
    }
  };
  
  // Handle unpublish
  const handleUnpublish = async () => {
    if (!isEditing || !id) {
      setValidationError('Cannot unpublish a new post');
      return;
    }
    
    // Confirm before unpublishing
    if (!window.confirm('Are you sure you want to unpublish this post? It will no longer be visible to visitors.')) {
      return;
    }
    
    setValidationError('');
    setUnpublishing(true);
    
    try {
      const updatedPost = await BlogService.unpublishPost(id);
      
      if (updatedPost) {
        // Update local state to match server state
        setStatus('draft');
        setPublishedAt(null);
        
        // Show success message
        alert('Post has been unpublished and is now a draft');
      }
    } catch (error: any) {
      // Extract meaningful error message
      const errorMessage = error.message || 'Failed to unpublish post. Please try again.';
      console.error('Error unpublishing post:', error);
      setValidationError(errorMessage);
      
      // Scroll to top to show error
      window.scrollTo(0, 0);
    } finally {
      setUnpublishing(false);
    }
  };

  // Handle image upload for rich text editor
  const handleContentImageUpload = (url: string) => {
    // Optional: store the URLs of uploaded images if needed
    console.log('Content image uploaded:', url);
  };
  
  // Register keyboard shortcuts
  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      ...commonEditorShortcuts({
        save: () => handleSave(new Event('keyboardShortcut') as any),
        publish: () => handlePublish(new Event('keyboardShortcut') as any),
        preview: () => setPreviewMode(!previewMode),
        cancel: () => {
          if (showKeyboardShortcuts) {
            setShowKeyboardShortcuts(false);
          } else if (previewMode) {
            setPreviewMode(false);
          }
        }
      }),
      {
        key: 'k',
        ctrlKey: true,
        description: 'Show keyboard shortcuts',
        action: () => setShowKeyboardShortcuts(true)
      }
    ];
    
    const cleanup = registerShortcuts(shortcuts);
    return cleanup;
  }, [previewMode, handleSave, handlePublish, showKeyboardShortcuts]);
  
  // Preview post
  const renderPreview = () => {
    const previewPost: BlogPost = {
      id: id || 'preview',
      title: title || 'Untitled Post',
      slug: slug || 'untitled-post',
      excerpt: excerpt || '',
      content: content || '<p>No content provided</p>',
      coverImage: coverImage || '/placeholder.svg',
      publishedAt: publishedAt,
      status,
      category: categories.find(c => c.id === categoryId) || { id: '', name: 'Uncategorized', slug: 'uncategorized' },
      author: authors.find(a => a.id === authorId) || { id: '', name: 'Team Zero' },
      tags: tags,
      readingTime: Math.ceil(content.split(/\s+/).length / 200) || 1
    };
    
    return (
      <div className="prose prose-lg max-w-none">
        {/* Tags at top */}
        {previewPost.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {previewPost.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {coverImage && (
          <>
            <div className="w-full mb-6 rounded-lg overflow-hidden" style={{ maxHeight: '400px' }}>
              <OptimizedImage
                src={coverImage} 
                alt={title} 
                objectFit="cover"
                useSrcSet={true}
                withWebp={true}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 75vw"
                lcpCandidate={true}
                className="w-full"
                onError={(e) => {
                  console.error('Image failed to load in preview:', e);
                  console.log('Cover image data length:', coverImage.length);
                  console.log('Cover image data starts with:', coverImage.substring(0, 50) + '...');
                  const img = e.target as HTMLImageElement;
                  img.style.border = '2px solid red';
                  img.style.backgroundColor = '#ffeeee';
                }}
                onLoad={() => console.log('Image loaded successfully in preview')}
              />
            </div>
          </>
        )}
        
        <h1>{title || 'Untitled Post'}</h1>
        
        <div className="flex items-center text-gray-500 mb-6 text-sm">
          <span className="font-medium text-gray-700 mr-2">
            {authors.find(a => a.id === authorId)?.name || 'Team Zero'}
          </span>
          <span className="mx-2">•</span>
          <span>
            {status === 'published' 
              ? formatDate(publishedAt || new Date().toISOString(), { format: 'long' }) 
              : 'Draft'
            }
          </span>
          <span className="mx-2">•</span>
          <span>
            {Math.ceil(content.split(/\s+/).length / 200) || 1} min read
          </span>
        </div>
        
        {excerpt && <p className="text-lg font-medium text-gray-700 mb-8 italic">{excerpt}</p>}
        
        <div 
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  };
  
  // Navigation items
  const navItems = [
    { label: 'Blog Posts', icon: <FileText size={18} />, path: '/admin/blog' },
    { label: 'Categories', icon: <Tag size={18} />, path: '/admin/categories' },
    { label: 'Authors', icon: <Users size={18} />, path: '/admin/authors' },
    { label: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
  ];

  // Show loading state if data is loading or component isn't hydrated yet
  if (loading || !hydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm flex items-center justify-between px-4 md:px-6 py-3">
          <h1 className="text-lg font-bold text-brand-purple-dark">ZeroVacancy Admin</h1>
        </header>
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-brand-purple-dark mr-8">ZeroVacancy Admin</h1>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (hasUnsavedChanges) {
                    e.preventDefault();
                    handleSafeNavigation(item.path);
                  }
                }}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-brand-purple-light/20 text-brand-purple-dark'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={async () => {
            if (hasUnsavedChanges) {
              const shouldSave = window.confirm('You have unsaved changes. Do you want to save before logging out?');
              
              if (shouldSave) {
                try {
                  await manualSave();
                  signOut();
                } catch (error) {
                  console.error('Error saving before logout:', error);
                  if (window.confirm('Failed to save changes. Continue logging out?')) {
                    signOut();
                  }
                }
                return;
              }
              
              if (!window.confirm('Continue logging out without saving?')) {
                return;
              }
            }
            signOut();
          }}
          className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span className="ml-2 hidden md:inline">Logout</span>
        </button>
      </header>
      
      {/* Mobile navigation */}
      <div className="bg-white border-t border-b md:hidden p-2">
        <nav className="flex justify-between overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => {
                if (hasUnsavedChanges) {
                  e.preventDefault();
                  handleSafeNavigation(item.path);
                }
              }}
              className={`flex flex-col items-center p-2 rounded ${
                location.pathname.startsWith(item.path)
                  ? 'text-brand-purple-dark'
                  : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={async () => {
              if (hasUnsavedChanges) {
                const shouldSave = window.confirm('You have unsaved changes. Do you want to save before logging out?');
                
                if (shouldSave) {
                  try {
                    await manualSave();
                    signOut();
                  } catch (error) {
                    console.error('Error saving before logout:', error);
                    if (window.confirm('Failed to save changes. Continue logging out?')) {
                      signOut();
                    }
                  }
                  return;
                }
                
                if (!window.confirm('Continue logging out without saving?')) {
                  return;
                }
              }
              signOut();
            }}
            className="flex flex-col items-center p-2 text-gray-700"
          >
            <LogOut size={18} />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="w-full">
        <SEO
          title={isEditing ? "Edit Blog Post | ZeroVacancy Admin" : "Create Blog Post | ZeroVacancy Admin"}
          description="Create or edit blog content for ZeroVacancy"
          noindex={true}
        />
        <div className="w-full">
        <div className="mb-6 flex justify-between items-center w-full flex-wrap gap-4">
          
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            {/* Manual save indicator */}
            {isEditing && (
              <div className="text-sm flex items-center px-3 py-1 rounded-full">
                {isAutosaving ? (
                  <div className="text-blue-600 flex items-center bg-blue-50 px-2 py-1 rounded-full">
                    <Clock size={14} className="mr-1 animate-pulse" />
                    <span className="whitespace-nowrap">Saving...</span>
                  </div>
                ) : lastAutosaved ? (
                  <div className="text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle size={14} className="mr-1" />
                    <span className="whitespace-nowrap">Last saved at {new Date(lastAutosaved).toLocaleTimeString()}</span>
                  </div>
                ) : (
                  <div className="text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span className="whitespace-nowrap">Not saved yet</span>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => {
                // Save draft before showing preview
                if (!previewMode && id) {
                  manualSave();
                }
                setPreviewMode(!previewMode);
              }}
              className={`flex items-center px-4 py-2 border rounded-md ${
                previewMode
                  ? 'bg-brand-purple-light/30 border-brand-purple text-brand-purple'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              title="Toggle Preview Mode (Ctrl+E)"
            >
              <Eye size={18} className="mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            
            {/* Save button with indicator for unsaved changes */}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center px-4 py-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed ${
                hasUnsavedChanges
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-700 text-white hover:bg-gray-800'
              }`}
              title="Save Draft (Ctrl+S)"
            >
              <Save size={18} className="mr-2" />
              {saving ? 'Saving...' : (
                <span className="flex items-center">
                  Save Draft
                  {hasUnsavedChanges && (
                    <span className="relative flex h-2 w-2 ml-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                  )}
                </span>
              )}
            </button>
            
            {/* Publish button with shortcut hint */}
            <button
              onClick={handlePublish}
              disabled={publishing || unpublishing}
              className="flex items-center px-4 py-2 bg-brand-purple text-white rounded-md hover:bg-brand-purple-dark disabled:opacity-70 disabled:cursor-not-allowed"
              title="Publish/Schedule (Ctrl+Shift+P)"
            >
              <Send size={18} className="mr-2" />
              {publishing ? 'Publishing...' : 
                status === 'published' ? 'Update' : 
                (publishedAt && new Date(publishedAt) > new Date()) ? 'Schedule' : 'Publish'}
            </button>
            
            {/* Unpublish button - only show for published posts */}
            {status === 'published' && isEditing && (
              <button
                onClick={handleUnpublish}
                disabled={unpublishing || publishing}
                className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Archive size={18} className="mr-2" />
                {unpublishing ? 'Unpublishing...' : 'Unpublish'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          status === 'scheduled' || (status === 'published' && publishedAt && new Date(publishedAt) > new Date())
            ? 'bg-blue-100 text-blue-800' 
            : status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          <FilePlus size={14} className="mr-1" />
          {status === 'scheduled' || (status === 'published' && publishedAt && new Date(publishedAt) > new Date())
            ? 'Scheduled' 
            : status === 'published' 
              ? 'Published' 
              : 'Draft'}
          
          {(status === 'scheduled' || (status === 'published' && publishedAt && new Date(publishedAt) > new Date())) && publishedAt && (
            <span className="ml-1 text-xs text-blue-700">
              for {new Date(publishedAt).toLocaleDateString()} at {new Date(publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          
          {lastSaved && (
            <span className="ml-2 text-xs text-gray-500">
              Last saved {formatDate(lastSaved, { format: 'relative' })}
            </span>
          )}
        </div>
        
        {/* Keyboard shortcuts button */}
        <button
          type="button"
          onClick={() => setShowKeyboardShortcuts(true)}
          className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
          title="Keyboard Shortcuts (Ctrl+K)"
        >
          <Keyboard size={14} className="mr-1" />
          <span className="hidden sm:inline">Keyboard Shortcuts</span>
        </button>
      </div>
      
      {/* Keyboard shortcuts help dialog */}
      <Suspense fallback={null}>
        <KeyboardShortcutsHelp
          shortcuts={[
          ...commonEditorShortcuts({
            save: () => {}, // Dummy functions that aren't used
            publish: () => {},
            preview: () => {},
            cancel: () => {}
          }),
          {
            key: 'k',
            ctrlKey: true,
            description: 'Show keyboard shortcuts',
            action: () => {}
          }
        ]}
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
        />
      </Suspense>
      
      {/* Validation error message */}
      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error saving post</p>
            <p className="text-sm">{validationError}</p>
          </div>
        </div>
      )}
      
      {/* Unsaved changes warning */}
      {hasUnsavedChanges && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">You have unsaved changes</p>
            <p className="text-sm">
              Remember to save your work. You can press <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-gray-100 border border-gray-300 rounded-md">Ctrl+S</kbd> to save.
            </p>
          </div>
        </div>
      )}
      
      {/* Recovery dialog for unsaved changes */}
      {showRecoveryDialog && recoveryData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRecoveryDialog(false)} // Close when clicking outside the modal
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full m-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Recover Unsaved Changes</h3>
              <button 
                type="button"
                onClick={() => setShowRecoveryDialog(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              We found a more recent draft from {new Date(recoveryData.lastSaved).toLocaleString()}. 
              Would you like to recover these changes?
            </p>
            
            <div className="border border-gray-200 rounded-md p-4 mb-4 max-h-60 overflow-auto">
              <h4 className="font-medium">{recoveryData.title || 'Untitled'}</h4>
              {recoveryData.excerpt && (
                <p className="text-sm text-gray-600 mt-2 italic">{recoveryData.excerpt}</p>
              )}
              <div className="text-sm mt-2 prose prose-sm max-w-none">
                {recoveryData.content ? (
                  <div dangerouslySetInnerHTML={{ 
                    __html: recoveryData.content.length > 500 
                      ? recoveryData.content.substring(0, 500) + '...' 
                      : recoveryData.content 
                  }} />
                ) : (
                  <p className="text-gray-500">No content in the recovered draft</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => {
                  // Discard the local backup - using try/catch to prevent errors
                  try {
                    clearLocalBackup();
                    console.log('Local backup cleared');
                    // Force hiding the dialog even if clearLocalBackup fails
                    setShowRecoveryDialog(false);
                  } catch (error) {
                    console.error('Error clearing local backup:', error);
                    // Force hide the dialog even on error
                    setShowRecoveryDialog(false);
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Discard
              </button>
              <button 
                type="button"
                onClick={() => {
                  // Apply recovered data - using try/catch to prevent errors
                  try {
                    if (recoveryData.title) setTitle(recoveryData.title);
                    if (recoveryData.content) setContent(recoveryData.content);
                    if (recoveryData.excerpt) setExcerpt(recoveryData.excerpt);
                    
                    // Clear local backup since we've applied it
                    try {
                      clearLocalBackup();
                    } catch (error) {
                      console.error('Error clearing local backup after recovery:', error);
                    }
                    
                    // Force hiding the dialog
                    setShowRecoveryDialog(false);
                  } catch (error) {
                    console.error('Error recovering draft:', error);
                    // Force hide the dialog even on error
                    setShowRecoveryDialog(false);
                  }
                }}
                className="px-4 py-2 bg-brand-purple text-white rounded-md hover:bg-brand-purple-dark"
              >
                Recover This Version
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6 w-full" style={{ width: "100%" }}>
        {previewMode ? (
          <div className="w-full py-8">
            {renderPreview()}
          </div>
        ) : (
          <form onSubmit={handleSave} className="w-full max-w-none">
            <main className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-6 w-full max-w-none">
                
                {/* Main Form Column */}
                <div className="flex-1 space-y-6 w-full max-w-none">
                  {/* Title */}
                  <div className="w-full">
                    <label 
                      htmlFor="title" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        // If no slug exists, auto-generate one when typing
                        if (!slug) {
                          // Debounce slug generation to not regenerate on every keystroke
                          if (e.target.value.length > 3) {
                            const cleanTitle = e.target.value
                              .trim()
                              .toLowerCase()
                              .replace(/[^\w\s-]/g, '')
                              .replace(/[\s_-]+/g, '-')
                              .replace(/^-+|-+$/g, '');
                              
                            if (cleanTitle) {
                              setSlug(cleanTitle);
                            }
                          }
                        }
                      }}
                      onBlur={() => !slug && generateSlug()}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  
                  {/* Slug */}
                  <div>
                    <label 
                      htmlFor="slug" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      URL Slug
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        /blog/
                      </span>
                      <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                        placeholder="enter-post-slug"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="mt-1 text-xs text-brand-purple hover:text-brand-purple-dark"
                    >
                      Generate from title
                    </button>
                  </div>
                  
                  {/* Excerpt */}
                  <div>
                    <label 
                      htmlFor="excerpt" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                      placeholder="Brief summary of the post"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      A short summary that appears on blog listings and social shares
                    </p>
                  </div>
                  
                  {/* Rich Text Editor */}
                  <div>
                    <label 
                      htmlFor="content" 
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Content
                    </label>
                    <Suspense fallback={null}>
                      <RichTextEditor
                      value={content}
                      onChange={(newContent) => {
                        // Update the content state
                        setContent(newContent);
                        
                        // Mark as having unsaved changes
                        if (newContent !== content) {
                          setHasUnsavedChanges(true);
                        }
                      }}
                      placeholder="Write your blog post content here..."
                      postId={id}
                      onImageUpload={handleContentImageUpload}
                      editorId={`blog-editor-${id || 'new'}`}
                    />
                    </Suspense>
                  </div>
                </div>

                {/* Sidebar Column */}
                <aside className="w-full md:w-[280px] flex-shrink-0 space-y-6" style={{ flexShrink: 0 }}>
                  {/* SEO Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowSeoPanel(!showSeoPanel)}
                    className={`flex items-center w-full justify-between p-2 mb-2 rounded-md border ${
                      showSeoPanel 
                        ? 'bg-brand-purple-light/20 border-brand-purple text-brand-purple' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <Search size={16} className="mr-2" />
                      <span className="text-sm font-medium">SEO & Search Settings</span>
                    </span>
                    <span className="text-xs">
                      {showSeoPanel ? 'Hide' : 'Show'}
                    </span>
                  </button>
                  
                  {/* SEO Panel */}
                  {showSeoPanel && (
                    <Suspense fallback={null}>
                      <SEOPanel
                        title={seoTitle || title}
                        description={seoDescription || excerpt}
                        slug={slug}
                        onTitleChange={setSeoTitle}
                        onDescriptionChange={setSeoDescription}
                      />
                    </Suspense>
                  )}
                  
                  {/* Publish Options */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Publish</h3>
                    
                    <div className="space-y-4">
                      {/* Status toggle */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <div className="flex rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={() => setStatus('draft')}
                            className={`flex-1 py-2 px-3 text-sm border ${
                              status === 'draft'
                                ? 'bg-yellow-100 border-yellow-400 text-yellow-800 font-medium'
                                : 'bg-white border-gray-300 text-gray-700'
                            } rounded-l-md focus:outline-none`}
                          >
                            Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStatus('published');
                              if (!publishedAt) {
                                setPublishedAt(new Date().toISOString());
                              }
                            }}
                            className={`flex-1 py-2 px-3 text-sm border ${
                              status === 'published'
                                ? 'bg-green-100 border-green-400 text-green-800 font-medium'
                                : 'bg-white border-gray-300 text-gray-700'
                            } rounded-r-md focus:outline-none`}
                          >
                            Published
                          </button>
                        </div>
                      </div>
                      
                      {/* Publish date */}
                      {status === 'published' && (
                        <div>
                          <label 
                            htmlFor="publishDate" 
                            className="block text-sm font-medium text-gray-700"
                          >
                            <Calendar size={14} className="inline mr-1" />
                            Publish Date
                          </label>
                          <input
                            type="datetime-local"
                            id="publishDate"
                            value={publishedAt ? new Date(publishedAt).toISOString().slice(0, 16) : ''}
                            onChange={(e) => setPublishedAt(e.target.value ? new Date(e.target.value).toISOString() : null)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                          />
                          {publishedAt && new Date(publishedAt) > new Date() ? (
                            <div className="mt-2 bg-blue-50 p-2 rounded border border-blue-200 text-xs">
                              <p className="text-blue-700 font-medium">
                                This post will be scheduled for future publication on:
                              </p>
                              <p className="text-blue-900 font-bold mt-1">
                                {new Date(publishedAt).toLocaleString()}
                              </p>
                              <p className="text-blue-600 mt-1">
                                The post will automatically become visible to readers on this date and time.
                              </p>
                            </div>
                          ) : (
                            <p className="mt-1 text-xs text-gray-500">
                              Leave empty for current time or set a future date to schedule the post.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Featured Image */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      <ImageIcon size={16} className="inline mr-1" />
                      Featured Image
                    </h3>
                    
                    <Suspense fallback={null}>
                      <ImageUploader
                        initialImage={coverImage}
                        postId={id}
                        onImageChange={setCoverImage}
                        aspectRatio={16/9}
                      />
                    </Suspense>
                  </div>
                  
                  {/* Categories */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <Suspense fallback={null}>
                      <CategorySelector
                        categories={categories}
                        selectedCategoryId={categoryId}
                        onChange={setCategoryId}
                        onCategoriesChange={setCategories}
                      />
                    </Suspense>
                  </div>
                  
                  {/* Authors */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Author</h3>
                    
                    <select
                      value={authorId}
                      onChange={(e) => setAuthorId(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Tags */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                    
                    <div className="flex">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                        placeholder="Add a tag"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-purple-light/20 text-brand-purple-dark"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-brand-purple-dark hover:text-brand-purple focus:outline-none"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </main>
          </form>
        )}
      </div>
      </div>
      </main>
    </div>
  );
};

export default BlogEditor;