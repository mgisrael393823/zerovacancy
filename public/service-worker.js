// Service Worker with improved CSS and font handling
const CACHE_NAME = 'zerovacancy-cache-v2';
const FONT_CACHE_NAME = 'zerovacancy-fonts-v1';
const STATIC_CACHE_NAME = 'zerovacancy-static-v1';

// Assets that need special handling
const CRITICAL_ASSETS = [
  '/index.html',
  '/logo.png',
  '/src/main.tsx',
  '/assets/css/styles.css'
];

// Google Fonts resources
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400&display=swap'
];

// Known font file patterns
const FONT_FILE_PATTERNS = [
  /\.woff2$/,
  /\.woff$/,
  /\.ttf$/,
  /\.otf$/,
  /\.(eot|svg)$/,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/
];

// Install event - precache critical assets and fonts
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Service worker pre-caching critical assets');
          return cache.addAll(CRITICAL_ASSETS);
        })
        .catch(err => {
          console.error('Pre-caching critical assets failed:', err);
        }),
        
      // Cache font stylesheet URLs
      caches.open(FONT_CACHE_NAME)
        .then((fontCache) => {
          console.log('Service worker pre-caching font stylesheets');
          return fontCache.addAll(FONT_URLS);
        })
        .catch(err => {
          console.error('Pre-caching font stylesheets failed:', err);
        })
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Keep current versions of each cache type
          if (cacheName !== CACHE_NAME && 
              cacheName !== FONT_CACHE_NAME && 
              cacheName !== STATIC_CACHE_NAME) {
            console.log('Service worker removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Immediately claim clients so the service worker controls page without reload
      return self.clients.claim();
    })
  );
});

// Special handling for CSS files to prevent caching issues
const handleCssRequest = async (request) => {
  // Validate request scheme before proceeding
  const url = new URL(request.url);
  const protocol = url.protocol;
  if (!['http:', 'https:'].includes(protocol)) {
    // Skip any non-HTTP(S) requests
    console.log('Skipping CSS handling for non-HTTP request:', protocol);
    return fetch(request);
  }
  
  // Try network first for CSS files
  try {
    const networkResponse = await fetch(request);
    
    // Only cache successful, complete responses
    if (networkResponse.status === 200 && networkResponse.ok) {
      // Clone the response to save in cache
      const responseToCache = networkResponse.clone();
      
      // Update the cache with fresh CSS
      caches.open(CACHE_NAME).then(cache => {
        try {
          cache.put(request, responseToCache);
        } catch (cacheError) {
          console.warn('Failed to cache CSS response:', cacheError);
        }
      });
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If cache fails too, return a simple CSS file
    return new Response('/* Emergency CSS fallback */', {
      headers: { 'Content-Type': 'text/css' }
    });
  }
};

// Helper to determine if a request is for a font resource
const isFontRequest = (url) => {
  return FONT_FILE_PATTERNS.some(pattern => pattern.test(url.href));
};

// Handle font requests - use cache first, then network with long caching
const handleFontRequest = async (request) => {
  // Try from the font cache first
  const cacheResponse = await caches.match(request, { cacheName: FONT_CACHE_NAME });
  if (cacheResponse) {
    return cacheResponse;
  }

  // If not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    
    // Only cache successful responses
    if (networkResponse.status === 200 && networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      
      // Store in the font-specific cache
      const cache = await caches.open(FONT_CACHE_NAME);
      try {
        await cache.put(request, responseToCache);
      } catch (err) {
        console.warn('Failed to cache font response:', err);
      }
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, fallback to any cache match
    console.warn('Failed to fetch font from network:', error);
    const anyCache = await caches.match(request);
    if (anyCache) {
      return anyCache;
    }
    
    // If all fails, throw to trigger app font fallbacks
    throw new Error('Failed to fetch font: ' + request.url);
  }
};

// Fetch event - specialized handling for fonts, CSS, and other assets
self.addEventListener('fetch', (event) => {
  try {
    const url = new URL(event.request.url);
    const protocol = url.protocol;

    // Skip non-HTTP requests entirely
    if (!['http:', 'https:'].includes(protocol)) {
      // Just pass through without service worker handling
      return;
    }
    
    // Special handling for font requests - cache aggressively
    if (isFontRequest(url)) {
      event.respondWith(handleFontRequest(event.request));
      return;
    }
    
    // Handle CSS files specially
    if (url.pathname.endsWith('.css') || url.pathname.includes('/assets/css/')) {
      event.respondWith(handleCssRequest(event.request));
      return;
    }
    
    // For all other requests, use cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return the cached response if we have it
          if (response) {
            return response;
          }
          
          // Otherwise try to fetch from network
          return fetch(event.request).then(
            (networkResponse) => {
              // Don't cache if not a GET request
              if (event.request.method !== 'GET') {
                return networkResponse;
              }
              
              // Only cache successful complete responses
              if (networkResponse.status !== 200 || !networkResponse.ok) {
                return networkResponse;
              }
              
              // Clone the response to save in cache and return the original
              const responseToCache = networkResponse.clone();
              
              // Choose appropriate cache based on content type
              let cacheName = CACHE_NAME;
              const contentType = networkResponse.headers.get('content-type') || '';
              
              if (contentType.includes('image/') || 
                  contentType.includes('video/') || 
                  url.pathname.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/)) {
                cacheName = STATIC_CACHE_NAME;
              }
              
              caches.open(cacheName)
                .then((cache) => {
                  try {
                    cache.put(event.request, responseToCache);
                  } catch (cacheError) {
                    console.warn('Failed to cache response:', cacheError);
                  }
                });
              
              return networkResponse;
            }
          );
        })
        .catch((error) => {
          console.warn('Fetch handler error:', error);
          
          // If both cache and network fail for resources like images, 
          // return an empty response with appropriate content type
          const url = new URL(event.request.url);
          if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
            return new Response('', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
          
          // Let the browser handle other failed requests
          return;
        })
    );
  } catch (parseError) {
    // Handle URL parsing errors or other exceptions
    console.error('Service worker fetch handler error:', parseError);
    // Continue without service worker intervention
    return;
  }
});

// Listen for messages from the main page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // This allows the service worker to become active immediately
    self.skipWaiting();
  }
  
  // Handle font preload request
  if (event.data && event.data.type === 'PRELOAD_FONTS') {
    console.log('Preloading fonts from service worker');
    
    // Prefetch font stylesheets and add to font cache
    caches.open(FONT_CACHE_NAME).then(cache => {
      FONT_URLS.forEach(url => {
        fetch(url)
          .then(response => {
            if (response.ok) {
              // Cache the stylesheet
              cache.put(new Request(url), response.clone());
              
              // Parse the response to find font files
              response.text().then(cssText => {
                // Extract font URLs from CSS
                const fontUrlMatches = cssText.match(/url\((.+?)\)/g) || [];
                
                // Extract the URLs
                const fontUrls = fontUrlMatches.map(match => {
                  // Remove url() wrapper and quotes if present
                  return match.replace(/url\(['"]?(.+?)['"]?\)/g, '$1');
                });
                
                // Prefetch and cache each font file
                fontUrls.forEach(fontUrl => {
                  // Make sure URL is absolute
                  const absoluteUrl = new URL(fontUrl, url).href;
                  
                  fetch(absoluteUrl, { mode: 'no-cors' })
                    .then(fontResponse => {
                      if (fontResponse.status === 200 || fontResponse.type === 'opaque') {
                        cache.put(new Request(absoluteUrl), fontResponse);
                        console.log('Cached font file:', absoluteUrl);
                      }
                    })
                    .catch(err => {
                      console.warn('Failed to prefetch font:', absoluteUrl, err);
                    });
                });
              });
            }
          })
          .catch(err => {
            console.warn('Failed to prefetch font stylesheet:', url, err);
          });
      });
    });
  }
  
  // Handle prefetch request
  if (event.data && event.data.type === 'PREFETCH_RESOURCES' && event.data.resources) {
    // Prefetch resources in the background
    event.data.resources.forEach(urlString => {
      try {
        // Validate URL before fetching
        const url = new URL(urlString);
        const protocol = url.protocol;
        
        // Only prefetch HTTP/HTTPS resources
        if (['http:', 'https:'].includes(protocol)) {
          // Determine which cache to use based on URL
          const cacheName = isFontRequest(url) ? FONT_CACHE_NAME : 
                           urlString.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/) ? STATIC_CACHE_NAME : 
                           CACHE_NAME;
                           
          // Fetch and cache
          caches.open(cacheName).then(cache => {
            fetch(urlString, { mode: 'no-cors' })
              .then(response => {
                // Cache any successful or opaque responses
                if (response.status === 200 || response.type === 'opaque') {
                  cache.put(new Request(urlString), response);
                  console.log(`Prefetched and cached: ${urlString} in ${cacheName}`);
                }
              })
              .catch(() => {
                // Silently fail prefetch attempts
              });
          });
        }
      } catch (error) {
        // Silently handle invalid URLs
        console.warn('Invalid prefetch URL: ' + urlString);
      }
    });
  }
});
