/**
 * Performance optimizations for improving Core Web Vitals
 */

// Cache for script loaded status
const loadedScripts: Record<string, boolean> = {};

/**
 * Lazy load scripts based on intersection observer
 * @param src Script URL
 * @param options Configuration options
 */
export function lazyLoadScript(
  src: string,
  options: {
    rootMargin?: string;
    threshold?: number;
    async?: boolean;
    defer?: boolean;
    id?: string;
    onLoad?: () => void;
  } = {}
): () => void {
  // Default options
  const {
    rootMargin = '200px',
    threshold = 0.1,
    async = true,
    defer = true,
    id = src.split('/').pop()?.replace(/\W/g, '') || 'lazy-script',
    onLoad,
  } = options;

  // Don't load the same script twice
  if (loadedScripts[src]) {
    if (onLoad) onLoad();
    return () => {}; // Return empty cleanup function
  }

  // Create a wrapper element to observe
  const observerTarget = document.createElement('div');
  observerTarget.id = `script-observer-${id}`;
  observerTarget.style.position = 'absolute';
  observerTarget.style.width = '1px';
  observerTarget.style.height = '1px';
  observerTarget.style.opacity = '0';
  observerTarget.style.pointerEvents = 'none';
  document.body.appendChild(observerTarget);

  // Create and configure the intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        if (async) script.async = true;
        if (defer) script.defer = true;
        
        script.onload = () => {
          loadedScripts[src] = true;
          if (onLoad) onLoad();
        };
        
        document.head.appendChild(script);
        observer.disconnect();
        document.body.removeChild(observerTarget);
      }
    },
    { rootMargin, threshold }
  );
  
  observer.observe(observerTarget);
  
  // Return cleanup function
  return () => {
    observer.disconnect();
    if (document.body.contains(observerTarget)) {
      document.body.removeChild(observerTarget);
    }
  };
}

/**
 * Defers non-critical CSS loading
 * @param href CSS file URL
 * @param id Optional ID for the stylesheet
 */
export function loadCSSDeferred(href: string, id?: string): void {
  // First create a non-render-blocking preload
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'style';
  preload.href = href;
  document.head.appendChild(preload);
  
  // Then load the CSS in a non-blocking way
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = href;
  if (id) stylesheet.id = id;
  
  // Use requestIdleCallback for better performance if available
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      document.head.appendChild(stylesheet);
    });
  } else {
    // Fallback to setTimeout
    setTimeout(() => {
      document.head.appendChild(stylesheet);
    }, 1);
  }
}

/**
 * Performs critical rendering path optimizations
 */
export function optimizeCRP(): void {
  // Prevent layout shifts by setting a base font size early
  document.documentElement.style.fontSize = '16px';
  
  // Add resource hints for critical domains
  const domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'zerovacancy.ai',
  ];
  
  domains.forEach(domain => {
    const dns = document.createElement('link');
    dns.rel = 'dns-prefetch';
    dns.href = `//${domain}`;
    document.head.appendChild(dns);
    
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = `//${domain}`;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  });
  
  // Add event listener for when CSS is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing font-display styles
    const existingFontStyle = document.getElementById('font-display-fix');
    if (existingFontStyle) {
      existingFontStyle.remove();
    }
    
    // Add font-display: swap to ensure text remains visible during font loading
    const style = document.createElement('style');
    style.id = 'font-display-fix';
    style.textContent = `
      @font-face {
        font-display: swap !important;
      }
    `;
    document.head.appendChild(style);
  });
}

/**
 * Fixes Core Web Vitals related issues
 */
export function fixCoreWebVitals(): void {
  // Fix CLS issues by reserving space for elements that load dynamically
  const fixCLS = () => {
    // Find hero sections and ensure they have min-height, but exclude specific #hero element
    document.querySelectorAll('.hero, [class*="hero-"], [id*="hero"]').forEach((el) => {
      const element = el as HTMLElement;
      // Skip our main hero element which has its own responsive styles
      if (element.id === 'hero') return;
      
      // Don't override existing inline styles
      if (!element.style.minHeight) {
        element.style.minHeight = '500px';
      }
    });
    
    // Ensure our specific hero has the right styles on mobile
    const mainHero = document.getElementById('hero');
    if (mainHero) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // IMPORTANT: These styles must match what's in App.tsx
        mainHero.style.setProperty('height', '100vh', 'important');
        mainHero.style.setProperty('minHeight', '100vh', 'important');
        mainHero.style.setProperty('display', 'flex', 'important');
        mainHero.style.setProperty('alignItems', 'center', 'important');
        mainHero.style.setProperty('justifyContent', 'center', 'important');
        
        // Apply negative margins for compact layout
        const heroTitle = mainHero.querySelector('#hero-title');
        if (heroTitle && heroTitle instanceof HTMLElement) {
          heroTitle.style.setProperty('marginTop', '-60px', 'important');
          heroTitle.style.setProperty('marginBottom', '-20px', 'important');
        }
      } else {
        // On desktop, let React handle the styling
        mainHero.style.height = 'auto';
        mainHero.style.minHeight = 'auto';
      }
    }
    
    // Ensure images have width and height attributes
    document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
      const image = img as HTMLImageElement;
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        image.width = image.naturalWidth;
        image.height = image.naturalHeight;
      }
    });
  };
  
  // Fix Largest Contentful Paint by prioritizing hero images
  const fixLCP = () => {
    // Find hero images and give them high priority
    const potentialLCPImages = [
      ...document.querySelectorAll('.hero img, [class*="hero-"] img, [id*="hero"] img'),
      ...document.querySelectorAll('img[class*="hero"], img[id*="hero"]'),
      ...document.querySelectorAll('img[src*="hero"]'),
    ];
    
    // Handle only the first 2 potential LCP images
    potentialLCPImages.slice(0, 2).forEach((img) => {
      const image = img as HTMLImageElement;
      if (image.loading !== 'eager') {
        image.loading = 'eager';
        // Add fetchpriority if supported
        if ('fetchPriority' in image) {
          (image as any).fetchPriority = 'high';
        }
      }
    });
  };
  
  // Fix FID/INP by debouncing event handlers
  const fixInteractionDelays = () => {
    // Add passive to non-passive event listeners
    const nonPassiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
    
    nonPassiveEvents.forEach((event) => {
      document.addEventListener(event, (e) => {}, { passive: true, capture: true });
    });
  };
  
  // Run fixes after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fixCLS();
      fixLCP();
      fixInteractionDelays();
    });
  } else {
    fixCLS();
    fixLCP();
    fixInteractionDelays();
  }
  
  // Run again after everything is loaded
  window.addEventListener('load', () => {
    fixCLS();
    
    // Wait for any async content
    setTimeout(() => {
      fixCLS();
      fixLCP();
    }, 500);
  });
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations(): void {
  optimizeCRP();
  fixCoreWebVitals();
}

/**
 * Mobile performance enhancement for scripts
 * On mobile, some scripts may be deferred further or loaded with lower priority
 * @param isMobile Whether the device is mobile
 */
export function mobilePerformanceEnhancements(isMobile: boolean): void {
  if (isMobile) {
    // Disable heavy animations
    document.documentElement.classList.add('reduced-motion');
    
    // Delay non-critical resource loading
    const nonCriticalResources = [
      ...document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])'),
      ...document.querySelectorAll('script:not([data-critical])'),
    ];
    
    nonCriticalResources.forEach((resource) => {
      if (resource.parentNode) {
        resource.parentNode.removeChild(resource);
        
        setTimeout(() => {
          document.head.appendChild(resource);
        }, 2000); // Delay by 2 seconds
      }
    });
  }
}

// Web Vitals measurement and reporting
export function measureWebVitals() {
  if (typeof window !== 'undefined') {
    // Check if the web-vitals module is available
    try {
      // Use a conditional check instead of dynamic import to prevent build errors
      if (typeof window.__WEB_VITALS_TEST__ !== 'undefined') {
        console.log('Web Vitals installed, measuring performance metrics');
        // This would be replaced with actual implementation when web-vitals is installed
      } else {
        console.log('Web Vitals module not found. Install with: npm install web-vitals');
      }
    } catch (error) {
      console.log('Web Vitals not available. To enable Web Vitals monitoring:');
      console.log('1. Install the package with: npm install web-vitals');
      console.log('2. Add window.__WEB_VITALS_TEST__ = true to your entry point');
    }
    
    // Note: The following code is commented until web-vitals is installed
    /*
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
      // Cumulative Layout Shift
      onCLS(metric => {
        console.log('CLS:', metric.value);
        reportWebVitalToAnalytics('CLS', metric.value);
      });
      
      // First Input Delay
      onFID(metric => {
        console.log('FID:', metric.value);
        reportWebVitalToAnalytics('FID', metric.value);
      });
      
      // Largest Contentful Paint
      onLCP(metric => {
        console.log('LCP:', metric.value);
        reportWebVitalToAnalytics('LCP', metric.value);
      });
      
      // Time to First Byte
      onTTFB(metric => {
        console.log('TTFB:', metric.value);
        reportWebVitalToAnalytics('TTFB', metric.value);
      });
      
      // Interaction to Next Paint (newer metric)
      onINP(metric => {
        console.log('INP:', metric.value);
        reportWebVitalToAnalytics('INP', metric.value);
      });
    }).catch(err => {
      console.error('Error loading web-vitals:', err);
    });
    */
  }
}

// Send metrics to analytics service
function reportWebVitalToAnalytics(metricName: string, value: number) {
  // You can send these metrics to your analytics service
  // For example, using Google Analytics:
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as any).gtag;
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metricName,
      value: Math.round(value * 1000) / 1000, // Round to 3 decimal places
      non_interaction: true, // This doesn't count as a user interaction
      metric_id: metricName,
      metric_value: value,
    });
  }
  
  // Store in localStorage for debugging and continued monitoring
  try {
    const key = `webvitals_${metricName.toLowerCase()}`;
    localStorage.setItem(key, value.toString());
    localStorage.setItem(`${key}_timestamp`, new Date().toISOString());
  } catch (e) {
    // Ignore storage errors
  }
}

/**
 * Background optimization utilities for desktop
 */
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

// Helper function to optimize background performance for desktop sections
export const sectionStyles = (index: number, isActive = true): string => {
  const bgColors = [
    "", // Hero background
    "bg-[#F6F7F9]", // Find creators - Light Pearl Gray
    "bg-white", // How it works
    "bg-[#F8F7FB]", // Features - Very light purple/gray
    "bg-white", // Pricing
    "bg-[#F6F7F9]", // Blog - Light Pearl Gray
    "bg-white", // Call to action
  ];

  // Use consistent fixed padding for all sections
  return cn(
    "relative w-full",
    index === 0 ? "" : "pt-16 pb-20", // No padding for hero, standardized for others
    bgColors[index] || "",
    isActive ? "opacity-100" : "opacity-0 pointer-events-none",
    "transition-all duration-400 ease-out" // Apply transitions for all properties
  );
};

// Get background gradient for a section
export const getSectionGradient = (index: number): string => {
  const gradients = [
    "bg-gradient-to-b from-purple-50/90 to-indigo-50/80", // Hero
    "bg-gradient-to-b from-indigo-50/80 to-blue-50/70", // Find creators
    "bg-gradient-to-b from-blue-50/80 to-indigo-50/70", // How it works
    "bg-gradient-to-b from-purple-50/80 to-indigo-50/70", // Features
    "bg-gradient-to-b from-indigo-50/80 to-blue-50/70", // Pricing
    "bg-gradient-to-b from-blue-50/80 to-purple-50/70", // Testimonials
    "bg-gradient-to-b from-purple-50/80 to-indigo-50/70", // Call to action
  ];
  
  return gradients[index] || gradients[0];
};

type PatternType = 'diagonal' | 'dots' | 'grid';

// Get background pattern based on type
export const getBackgroundPattern = (pattern: PatternType = 'diagonal', opacity = 0.06): string => {
  const patterns: Record<PatternType, string> = {
    diagonal: "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOGE2NGZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDYiPjxwYXRoIGQ9Ik0wIDBMNDAgNDAiLz48cGF0aCBkPSJNNDAgMEwwIDQwIi8+PC9nPjwvc3ZnPg==')]",
    dots: "bg-[radial-gradient(#8A57DE_1px,transparent_1px)] [background-size:20px_20px]",
    grid: "bg-[linear-gradient(to_right,rgba(138,99,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(138,99,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]",
  };
  
  return cn(patterns[pattern], `opacity-[${opacity}]`);
};