import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '../components/Header';
import { HeroSection } from '../components/hero/new';
import Footer from '../components/Footer';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { useSectionStyles, smoothScrollTo } from '@/utils/web-vitals';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';
import SEO from '@/components/SEO';
import { homepageSchema, organizationSchema } from '@/lib/seo';
import { supabase } from '@/integrations/supabase/client';
// Removed react-router-dom import since it's causing issues
import { 
  heroPatternDotMatrix, 
  findCreatorsPatternGrid, 
  howItWorksPatternDiagonal,
  featuresPatternHoneycomb,
  pricingPatternPaper,
  generateBackgroundWithPattern 
} from '@/utils/background-patterns';
import { mobileOptimizationClasses as moc } from '@/utils/mobile-optimization';

// Import additional React hooks
import { lazy, Suspense } from 'react';

// Add type declaration for window methods we'll use
declare global {
  interface Window {
    removeDebugOverlays?: () => void;
    removeDebugElements?: () => void;
  }
}

// Standardized section transition component with uniform 40px height and consistent gradient blending
const SectionTransition = ({ 
  fromColor, 
  toColor, 
  height = 40, // Standardized 40px height for all transitions
  withOverlap = true // Parameter maintained for backward compatibility
}: { 
  fromColor: string; 
  toColor: string; 
  height?: number;
  withOverlap?: boolean;
}) => {
  const isMobile = useIsMobile();
  
  // Only apply standardization for desktop
  const actualHeight = isMobile ? Math.max(height, 60) : 40; // Fixed 40px on desktop, mobile remains the same
  
  return (
    <div 
      className="w-full overflow-visible relative z-30 section-transition"
      aria-hidden="true"
      style={{ 
        height: `${actualHeight}px`,
        margin: isMobile ? '-40px 0' : '-20px 0', // Less aggressive negative margins on desktop
        padding: 0,
        pointerEvents: 'none',
        width: '100vw', // Full viewport width to prevent side gaps
        maxWidth: '100vw',
        position: 'relative',
        backgroundColor: 'transparent', // Use transparent background to prevent color bleed
        backgroundImage: 'none', // Prevent any default backgrounds
        left: 0,
        right: 0,
        borderWidth: 0, // Explicitly remove any borders
        overflow: 'visible', // Allow gradient to extend beyond bounds
        transform: !isMobile ? 'translateZ(0)' : 'none', // Hardware acceleration on desktop
        backfaceVisibility: !isMobile ? 'hidden' : 'visible' // Rendering optimization on desktop
      }}>
      <div 
        className="absolute"
        style={{
          // For mobile devices, we keep the existing gradient
          // For desktop, we use a more consistent gradient algorithm
          background: isMobile ? 
            `linear-gradient(to top, 
              ${toColor} 0%, 
              ${toColor} 25%, 
              ${modifyColorOpacity(toColor, fromColor, 0.9)} 40%,
              ${modifyColorOpacity(toColor, fromColor, 0.5)} 50%,
              ${modifyColorOpacity(toColor, fromColor, 0.1)} 60%,
              ${fromColor} 75%, 
              ${fromColor} 100%)`
            :
            `linear-gradient(to top, 
              ${fromColor} 0%, 
              ${modifyColorOpacity(fromColor, toColor, 0.9)} 20%,
              ${modifyColorOpacity(fromColor, toColor, 0.5)} 50%,
              ${modifyColorOpacity(fromColor, toColor, 0.1)} 80%,
              ${toColor} 100%)`, // More evenly distributed gradient stops
          position: 'absolute',
          top: isMobile ? '-40px' : '-25px', // Less aggressive extension on desktop
          left: 0,
          right: 0,
          bottom: isMobile ? '-40px' : '-25px', // Less aggressive extension on desktop
          height: isMobile ? 'calc(100% + 80px)' : 'calc(100% + 50px)', // Appropriate gradient height
          width: '100%',
          boxShadow: 'none',
          borderWidth: 0, // Explicitly remove any borders
          zIndex: 1, // Ensure this is above background but below content
          transform: !isMobile ? 'translateZ(0)' : 'none', // Hardware acceleration on desktop
          willChange: !isMobile ? 'transform' : 'auto' // Performance hint for desktop
        }}
      />
      
      {/* Subtle visual divider element - desktop only */}
      {!isMobile && (
        <div 
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            width: '60px',
            height: '1px',
            background: `linear-gradient(to right, 
              transparent, 
              ${modifyColorOpacity(fromColor, toColor, 0.3)},
              transparent)`,
            top: '50%',
            zIndex: 2,
            opacity: 0.4
          }}
        />
      )}
    </div>
  );
};

// Helper function to create intermediate colors for smoother transitions
const modifyColorOpacity = (fromColor: string, toColor: string, ratio: number) => {
  // Simple implementation for hex colors
  if (fromColor.startsWith('#') && toColor.startsWith('#')) {
    try {
      // Parse hex colors
      const r1 = parseInt(fromColor.slice(1, 3), 16);
      const g1 = parseInt(fromColor.slice(3, 5), 16);
      const b1 = parseInt(fromColor.slice(5, 7), 16);
      
      const r2 = parseInt(toColor.slice(1, 3), 16);
      const g2 = parseInt(toColor.slice(3, 5), 16);
      const b2 = parseInt(toColor.slice(5, 7), 16);
      
      // Blend colors
      const r = Math.round(r1 * ratio + r2 * (1 - ratio));
      const g = Math.round(g1 * ratio + g2 * (1 - ratio));
      const b = Math.round(b1 * ratio + b2 * (1 - ratio));
      
      // Convert back to hex
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } catch (e) {
      // Fallback if parsing fails
      return ratio > 0.5 ? fromColor : toColor;
    }
  }
  
  // For other color formats like rgb, rgba, or named colors
  return `color-mix(in srgb, ${fromColor} ${ratio * 100}%, ${toColor} ${(1 - ratio) * 100}%)`;
};

// Optimized scroll target component designed to work seamlessly with section transitions
interface ScrollTargetProps {
  id: string;
  height?: number;
  className?: string;
}

const ScrollTarget: React.FC<ScrollTargetProps & { style?: React.CSSProperties }> = ({ id, height = 1, className, style = {} }) => {
  const isMobile = useIsMobile();
  return (
    <div 
      id={id}
      aria-hidden="true"
      className={cn(
        "w-full overflow-hidden invisible block",
        className,
        isMobile && "touch-action-pan-y overscroll-behavior-none"
      )}
      style={{ 
        height: `${height}px`,
        position: 'relative',
        zIndex: 5, // Lower z-index to prevent interfering with transitions
        background: 'transparent',
        margin: 0,
        padding: 0,
        pointerEvents: 'none',
        touchAction: isMobile ? 'pan-y' : 'auto',
        ...style // Allow additional styles to be passed in
      }}
    />
  );
};

const OptimizedHowItWorks = lazy(() => import('../components/how-it-works/OptimizedHowItWorks'));
const FeaturesSectionWithHoverEffects = lazy(() => import('@/components/features/Features'));
const Pricing = lazy(() => import('@/components/Pricing'));
const PreviewSearch = lazy(() => import('../components/preview-search'));
const FeaturedBlogPosts = lazy(() => import('@/components/blog/FeaturedBlogPosts'));

const SectionLoader = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Main landing page component with performance optimizations
 */
const Index = () => {
  const { getZIndex, getTransition, getBackgroundTransition } = useSectionStyles(6); // Total of 6 sections
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();
  
  // Create a simple navigation function instead of using react-router
  const navigate = (path: string) => {
    console.log('Navigation to:', path);
    // Use direct location change instead of React Router
    window.location.href = path;
  };
  
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<{[key: number]: boolean}>({
    0: true, // Hero section is visible by default
    1: true, 
    2: true,
    3: true,
    4: true,
    5: true
  });
  
  // Safari-specific fixes for jittering issues
  useEffect(() => {
    // Check if browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isSafari) {
      // Add a class to the document for Safari-specific CSS
      document.documentElement.classList.add('safari');
      
      // Create and add Safari-specific CSS
      const safariStyle = document.createElement('style');
      safariStyle.innerHTML = `
        /* Disable problematic hardware acceleration in creator section */
        .safari .creator-section * {
          will-change: auto !important;
          transform: none !important;
          backface-visibility: visible !important;
          perspective: none !important;
          transition: none !important;
        }
        
        /* Fix the unstable positioning */
        .safari .creator-section {
          isolation: isolate;
          position: relative;
          z-index: 10;
        }
        
        /* Prevent section transitions from causing jitter */
        .safari .w-full.overflow-visible.relative.z-10 {
          margin: 0 !important;
          overflow: hidden !important;
          transition: none !important;
        }
        
        /* Fix scroll targets in Safari */
        .safari [id="find-creators"],
        .safari [id="how-it-works"],
        .safari [id="features"],
        .safari [id="pricing"],
        .safari [id="blog"] {
          position: relative !important;
          margin: 0 !important;
          transform: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(safariStyle);
    }
  }, []);
  
  // Simple flag to track Alt+A+Z key combination
  const adminLoginRef = React.useRef({
    altPressed: false,
    redirected: false
  });
  
  // Add a simpler secure admin login method with keyboard shortcut
  useEffect(() => {
    // Simple keyboard shortcut handling for Alt+A+Z
    const handleKeyDown = (event: KeyboardEvent) => {
      // Track Alt key state (use event.altKey for cross-browser compatibility)
      adminLoginRef.current.altPressed = event.altKey;
      
      // Check for the 'a' key when Alt is pressed
      if (event.altKey && event.key.toLowerCase() === 'a') {
        // Wait for the 'z' key to complete the sequence
        const checkForZ = (e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'z') {
            // Success - the full Alt+A+Z sequence was pressed
            document.removeEventListener('keydown', checkForZ);
            
            // Prompt for verification word
            const secretWord = prompt('Enter admin verification word:');
            if (secretWord === 'zerovacancy2025') {
              // Set the admin access token before navigating
              sessionStorage.setItem('adminAccessToken', 'granted');
              
              // Only redirect if not already done
              if (!adminLoginRef.current.redirected) {
                adminLoginRef.current.redirected = true;
                window.location.href = '/hidden-admin-login';
              }
            }
          } else {
            // Wrong key pressed after Alt+A, remove listener
            document.removeEventListener('keydown', checkForZ);
          }
        };
        
        // Add a temporary listener for the 'z' key
        document.addEventListener('keydown', checkForZ, { once: true });
      }
    };
    
    // Add the keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // Clean up
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Observer that uses requestAnimationFrame for better performance
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (!entries.length) return;
    
    // Use requestAnimationFrame to batch DOM updates and avoid layout thrashing
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.getAttribute('data-section-index') || '-1', 10);
        if (index >= 0) {
          setVisibleSections(prev => ({
            ...prev,
            [index]: entry.isIntersecting || prev[index] // Keep sections visible once they've been seen
          }));
          
          // If this is entering the viewport, update any active section indicators
          if (entry.isIntersecting) {
            // Get the section ID
            const sectionId = entry.target.id || 
                             entry.target.getAttribute('data-section') || 
                             ['hero', 'find-creators', 'how-it-works', 'features', 'pricing', 'blog'][index];
            
            // Dispatch a custom event that the navigation can listen to
            const event = new CustomEvent('sectionVisible', { 
              detail: { section: sectionId }
            });
            document.dispatchEvent(event);
          }
        }
      });
    });
  }, []);
  
  useEffect(() => {
    // Simplified section visibility - show all sections immediately
    // This eliminates the performance overhead of multiple observers
    setVisibleSections({
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    });
    
    // Enhanced debug overlay removal that works on both mobile and desktop
    const removeDebugElements = () => {
      // Import the function from our script declaration
      if (typeof window.removeDebugOverlays === 'function') {
        window.removeDebugOverlays();
      } else {
        // Fallback implementation if the script function isn't available yet
        // Look for any debug overlays with lavender background and class information display
        const debugSelectors = [
          'body > div[style*="#EBE3FF"]',
          'div[style*="background-color: #EBE3FF"]', 
          'div[style*="background: #EBE3FF"]',
          'div:not([id]):not([class])[style*="393 x"]',
          'div[style*=" x "]',
          'body > div:not([id]):not([class])',
          // Target elements showing dimensions with × symbol
          'div:not([id]):not([class])[class*="section.relative"]',
          'body > div:empty:not([id]):not([class])',
          'div[style*="background-color: #EBE3FF"]',
          'div:not([id]):not([class])[data-lovable]',
          // Additional specific selectors for dimensions displays
          'div:not([id]):not([class]):empty',
          'div:not([id]):not([class])[style*="position: absolute"]',
          'div:not([id]):not([class])[style*="z-index: 9999"]',
          'div:not([id]):not([class])[style*="pointer-events: none"]',
          'div[style*="position: fixed"][style*="top:"][style*="left:"]'
        ];
        
        const debugOverlays = document.querySelectorAll(debugSelectors.join(','));
        
        debugOverlays.forEach(el => {
          // Check content for debugging information
          const content = el.textContent || '';
          if (
            content.includes(' x ') || 
            content.includes('section') || 
            content.includes('creator-section') ||
            content.includes('find-creators-section') ||
            content.includes('relative') ||
            content.includes('absolute') ||
            content.includes('py-') ||
            content.includes('px-') ||
            content.includes('w-full') ||
            content.includes('overflow-') ||
            content.includes('px') ||
            // Special check for Lovable tool debug output which shows component dimensions
            (content.match(/\d+(\.\d+)? x \d+(\.\d+)?/) !== null)
          ) {
            // Try to remove it from the DOM
            try {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
            } catch (e) {
              // If removal fails, make it invisible
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.opacity = '0';
              el.style.position = 'absolute';
              el.style.pointerEvents = 'none';
              el.style.zIndex = '-9999';
            }
          }
        });
      }
    };
    
    // Attach the function to window for access by our script
    window.removeDebugElements = removeDebugElements;
    
    // Run immediately
    removeDebugElements();
    
    // Run multiple times with increasing delay to catch elements that appear during rendering
    const timers = [
      setTimeout(removeDebugElements, 100),
      setTimeout(removeDebugElements, 500),
      setTimeout(removeDebugElements, 1000),
      setTimeout(removeDebugElements, 2000),
      setTimeout(removeDebugElements, 5000)
    ];
    
    // Set up a MutationObserver to watch for dynamically added debug elements
    const observer = new MutationObserver((mutations) => {
      let hasRelevantChanges = false;
      
      mutations.forEach(mutation => {
        // Check if nodes were added
        if (mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            // Check if it's an element node
            if (node.nodeType === 1) {
              // Check if it looks like a debug overlay
              if (
                (node.nodeName === 'DIV' && !node.id && !node.className) ||
                (node instanceof HTMLElement && 
                 (node.style.backgroundColor === '#EBE3FF' || 
                  (node.getAttribute('style') || '').includes('#EBE3FF') ||
                  (node.getAttribute('style') || '').includes('position: fixed') ||
                  (node.getAttribute('style') || '').includes('position: absolute') ||
                  (node.getAttribute('style') || '').includes('z-index: 9999') ||
                  (node.getAttribute('style') || '').includes('pointer-events: none') ||
                  (node.textContent || '').includes(' × ') ||
                  (node.textContent || '').includes('section.relative') ||
                  (node.textContent || '').includes('px × ') ||
                  (node.hasAttribute('data-lovable')) ||
                  (node.childNodes.length === 0) // Empty divs
                ))
              ) {
                hasRelevantChanges = true;
                break;
              }
            }
          }
        }
      });
      
      // Only run removal if relevant changes were detected
      if (hasRelevantChanges) {
        removeDebugElements();
      }
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      // Clean up timers and observer
      timers.forEach(timer => clearTimeout(timer));
      observer.disconnect();
    };
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  const addSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };
  
  // Enhanced scroll with custom easing and offset
  const scrollToSection = (id: string) => {
    // Use 80px offset to account for header and provide some breathing room
    smoothScrollTo(id, 80, 1000); // Longer duration (1000ms) for smoother scrolling
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full" 
         style={{
           width: isMobile ? '100vw' : '100%',
           maxWidth: isMobile ? '100vw' : '100%',
           overflow: 'hidden',
           margin: 0,
           padding: 0,
           backgroundColor: '#F9F6EC' // Tan/gold background for consistency
         }}>
      <SEO 
        title="Property Content Creators | ZeroVacancy" 
        description="Connect with elite content creators who transform your spaces into compelling visual stories. Find photographers, videographers, and more for your properties."
        canonicalPath="/"
        structuredData={[homepageSchema, organizationSchema]}
      />
      <Header />
      {showBanner && !isMobile && (
        <div className="relative mb-0">
          <Banner variant="purple" size="lg" action={
              <div className="relative">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className={cn(
                    // Light background with subtle gradient from white to light purple
                    "bg-gradient-to-b from-white to-[#F8F5FF]",
                    // Using brand purple for text to match other CTAs
                    "text-[#7633DC] font-semibold",
                    // Refined border for definition
                    "border border-[rgba(255,255,255,0.2)]", 
                    // Sophisticated 3D shadow effect matching other CTAs
                    "shadow-[0_1px_2px_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.07),_0_4px_8px_rgba(0,0,0,0.07),_0_8px_16px_rgba(0,0,0,0.05),_0_0_8px_rgba(118,51,220,0.03)]",
                    // Enhanced hover effects
                    "hover:bg-gradient-to-b hover:from-white hover:to-[#F5F0FF]",
                    "hover:shadow-[0_1px_2px_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.07),_0_4px_8px_rgba(0,0,0,0.07),_0_8px_16px_rgba(0,0,0,0.06),_0_0_12px_rgba(118,51,220,0.04)]",
                    "hover:scale-[1.02]",
                    // Adding transition for all properties
                    "transition-all duration-300 ease-out",
                    // Standard button height class
                    "button-standard"
                  )} 
                  onClick={handleTryNowClick}
                >
                  Get Early Access
                </Button>
              </div>
            } 
            layout="complex" 
            isClosable 
            onClose={() => setShowBanner(false)} 
            className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0"
          >
            <div className="flex items-center justify-left gap-3 sm:gap-4 relative z-10">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText 
                className={cn(
                  "text-sm sm:text-base font-bold inline-block", 
                  "text-white relative z-10 rounded", 
                  "px-1 tracking-wide"
                )} 
                shimmerWidth={200}
              >
                Join the AI-powered revolution in property management!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 pb-16 sm:pb-0 w-full mt-0" 
             style={{
               width: isMobile ? '100vw' : '100%',
               maxWidth: isMobile ? '100vw' : '100%',
               overflow: 'hidden',
               margin: 0,
               padding: 0,
               backgroundColor: '#F9F6EC' // Tan/gold background for consistency 
             }}
             id="main-content">
        {/* Hero Section */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Additional fix to prevent jumps during render */
          #root {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          
          /* Fix for champagne divs on mobile only */
          @media (max-width: 768px) {
            /* Hide any div that comes right after a section and doesn't have an ID */
            section + div:not([id]),
            /* Also hide any div with section-transition class */
            div.section-transition,
            /* And divs that have zIndex: 30 styling which are usually transitions */
            div[style*="zIndex: 30"]:not(section):not([id]) {
              display: none !important;
              height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              position: absolute !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }
            
            /* Keep section spacing as is, just remove borders */
            section + section {
              border-top: none !important;
            }
            
            /* Fix for the scroll target divs - more specific to avoid hiding content */
            div[id="how-it-works"]:not(section):not([data-section]),
            div[id="features"]:not(section):not([data-section]),
            div[id="pricing"]:not(section):not([data-section]),
            div[id="blog"]:not(section):not([data-section]),
            div[id="find-creators"]:not(section):not([data-section]) {
              display: none !important;
              height: 0 !important;
              position: absolute !important;
              margin: 0 !important;
              padding: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              opacity: 0 !important;
            }
            
            /* Ensure How It Works section is visible on mobile */
            section#how-it-works-section,
            section[id="how-it-works-section"] {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
              height: auto !important;
              min-height: 300px !important;
              background-color: #EDF7F2 !important; /* Add bg color for mobile */
            }
            
            /* Comprehensive fix for mobile sticky header */
            body {
              -webkit-overflow-scrolling: touch !important;
              overflow-x: hidden !important;
              height: auto !important; /* Allow body to size naturally */
              position: relative !important; /* Create proper positioning context */
              touch-action: manipulation !important; /* Improve touch handling */
            }
            
            /* More aggressive header fixing for mobile, especially iOS */
            header, .header, nav[role="navigation"], .navigation-header {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              width: 100vw !important; /* Use viewport width for full coverage */
              max-width: 100vw !important;
              z-index: 9999 !important; /* Super high z-index */
              will-change: auto !important; /* Let browser decide */
              -webkit-backface-visibility: hidden !important; /* Fix iOS rendering */
              backface-visibility: hidden !important;
              background-color: rgba(255, 255, 255, 0.98) !important; /* Use solid color instead of blur */
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important; /* Add visible shadow */
              height: 56px !important; /* Fix exact height */
              min-height: 56px !important;
              max-height: 56px !important;
            }
            
            /* Restore active section indicator in header navigation */
            header a.active-nav-item,
            header a[aria-current="page"],
            header a.nav-indicator-active {
              position: relative !important;
              color: #7633DC !important; /* Purple color for active item */
              font-weight: 600 !important;
            }
            
            /* Add bottom border indicator */
            header a.active-nav-item::after,
            header a[aria-current="page"]::after,
            header a.nav-indicator-active::after {
              content: "" !important;
              position: absolute !important;
              bottom: -2px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: 16px !important;
              height: 2px !important;
              background-color: #7633DC !important;
              border-radius: 4px !important;
              transition: width 0.2s ease !important;
            }
            
            header a:hover::after {
              width: 24px !important;
            }
            
            /* Fix for iOS Safari */
            @supports (-webkit-touch-callout: none) {
              header, .header, nav[role="navigation"], .navigation-header {
                position: sticky !important; /* Use sticky as fallback on iOS */
                top: 0 !important;
              }
            }
            
            /* Add proper spacing below the fixed header */
            main, #main-content, [role="main"] {
              padding-top: 56px !important; /* Match header height */
              margin-top: 0 !important;
            }
            
            /* Ensure no parent element creates stacking context issues */
            #root, #__next, [data-reactroot], body > div {
              transform: none !important;
              filter: none !important;
              perspective: none !important;
            }
          }

          /* Ensure hero section has the correct height on all devices */
          /* Target the exact height that's being set on the section */
          section#hero, section[data-hero-section="true"], div[data-hero-section="true"], [data-hero-section="true"] {
            height: 650px !important; /* Increased height to show full CTAs on desktop */
            min-height: 650px !important;
            max-height: 650px !important;
            padding-top: 64px !important; /* Account for fixed header on desktop */
            overflow: visible !important;
          }
          
          /* Standard typography sizes from our system */
          .section-header {
            font-size: 48px !important;
            font-weight: 600 !important;
            line-height: 1.2 !important;
          }
          
          .section-subheading {
            font-size: 24px !important;
            font-weight: 600 !important;
            line-height: 1.3 !important;
          }
          
          .body-text {
            font-size: 18px !important;
            font-weight: 400 !important;
            line-height: 1.6 !important;
          }
          
          .button-standard {
            height: 56px !important;
            min-height: 56px !important;
          }
          
          /* Mobile Hero Improvements */
          @media (max-width: 768px) {
            /* Main hero container */
            section#hero, 
            section[data-hero-section="true"] {
              padding-top: 56px !important; /* CRITICAL: Add padding for fixed header */
              height: 460px !important; /* Slightly increase height to ensure social proof visibility */
              min-height: 460px !important;
              max-height: 460px !important;
            }
            
            /* Inner content container - reset padding */
            section#hero > div,
            section[data-hero-section="true"] > div {
              padding-top: 0 !important; /* Remove inner padding completely */
            }
            
            /* Main heading - reduce bottom margin */
            .tracking-tight.font-bold.font-jakarta.text-center {
              margin-bottom: 8px !important;
            }
            
            /* Property Content That heading text */
            .text-[2rem].tracking-[-0.02em].font-jakarta,
            [class*="text-[2rem]"] {
              margin-bottom: 4px !important;
            }
            
            /* Paragraph text */
            section#hero p,
            section[data-hero-section="true"] p {
              margin-bottom: 12px !important;
              padding: 0 12px !important;
            }
            
            /* Social proof container */
            .flex.items-center.animate-fade-in.w-fit {
              margin-top: 8px !important;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important; /* Make it stand out more */
            }
          }
          
          /* Force the section to have content-driven height */
          section#hero, section[data-hero-section="true"] {
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            padding-top: 100px !important;
            padding-bottom: 20px !important;
            overflow: visible !important;
          }
          
          /* Hide transition elements below hero */
          section#hero + div {
            display: none !important;
          }
          
          /* Remove any scroll indicators */
          .flex.flex-col.items-center.opacity-60 {
            display: none !important;
          }
          
          /* NUCLEAR OPTION - TARGETING WITH JS */
          section[id="hero"], [data-hero-section="true"] {
            height: 650px !important;
            max-height: 650px !important;
          }
          
          /* Mobile-only NUCLEAR OPTION */
          @media (max-width: 768px) {
            section[id="hero"], [data-hero-section="true"] {
              height: 450px !important;
              max-height: 450px !important;
            }
          }
          
          /* NUCLEAR OPTION - MORE SELECTORS */
          section[id="hero"] *, [data-hero-section="true"] * {
            max-height: none !important;
          }
          
          /* Remove any debug overlays that might be present */
          body > div:not([id]):not([class]) {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            position: absolute !important;
            z-index: -9999 !important;
          }
          
          /* Target specifically debug elements with lavender background and dimensions */
          div[style*="#EBE3FF"],
          div:not([id]):not([class])[style*="393 x"],
          div:not([id]):not([class])[style*=" x "],
          div:not([id]):not([class]):empty,
          div:not([id]):not([class])[data-lovable],
          div:not([id]):not([class])[style*="position: absolute"],
          div:not([id]):not([class])[style*="z-index: 9999"],
          div:not([id]):not([class])[style*="pointer-events: none"],
          div[style*="position: fixed"][style*="top:"][style*="left:"] {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            z-index: -9999 !important;
            clip: rect(0, 0, 0, 0) !important;
            overflow: hidden !important;
            border: 0 !important;
            transform: translate(-9999px, -9999px) !important;
          }
          
          /* Fix overlap between hero and creator sections */
          @media (max-width: 768px) {
            #mobile-hero-cta-section > div {
              margin-bottom: 16px !important;
              position: relative !important;
              z-index: 100 !important;
            }
            
            .find-creators-section {
              margin-top: 16px !important;
            }
          }
          `}} />

        {/* Direct DOM manipulation script */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Direct DOM manipulation to fix heights and remove debug overlays
          (function() {
            function fixHeroHeight() {
              const heroElements = document.querySelectorAll('section#hero, [data-hero-section="true"]');
              heroElements.forEach(el => {
                // Force fixed height - different values for mobile and desktop
                if (window.innerWidth <= 768) {
                  // Mobile height
                  el.style.setProperty('height', '450px', 'important');
                  el.style.setProperty('max-height', '450px', 'important');
                  el.style.setProperty('min-height', '450px', 'important');
                } else {
                  // Desktop height - increased to show full CTAs
                  el.style.setProperty('height', '650px', 'important');
                  el.style.setProperty('max-height', '650px', 'important');
                  el.style.setProperty('min-height', '650px', 'important');
                }
                
                // Force top alignment
                el.style.setProperty('justify-content', 'flex-start', 'important');
                
                // Ensure proper padding
                el.style.setProperty('padding-top', '100px', 'important');
              });
            }
            
            // Enhanced function to remove debug overlays
            function removeDebugOverlays() {
              // Run for both mobile and desktop to ensure consistent experience
              // Target elements with lavender background and class/dimension info
              const debugSelectors = [
                'body > div[style*="#EBE3FF"]', 
                'div[style*="background-color: #EBE3FF"]',
                'div[style*="background: #EBE3FF"]',
                'div:not([id]):not([class])[style*="393 x"]',
                'div:not([id]):not([class])[style*=" x "]',
                'body > div:not([id]):not([class]):not([style])',
                '#root > div:not([id]):not([class]):not([style])',
                'main > div:not([id]):not([class]):not([style])',
                // Target elements showing dimensions with × symbol
                'div:not([id]):not([class])[class*="section.relative"]',
                'body > div:empty:not([id]):not([class])',
                'div:not([id]):not([class])[data-lovable]',
                // Additional specific selectors for dimensions displays
                'div:not([id]):not([class]):empty',
                'div:not([id]):not([class])[style*="position: absolute"]',
                'div:not([id]):not([class])[style*="z-index: 9999"]',
                'div:not([id]):not([class])[style*="pointer-events: none"]',
                'div[style*="position: fixed"][style*="top:"][style*="left:"]'
              ];
              
              const debugOverlays = document.querySelectorAll(debugSelectors.join(','));
              
              debugOverlays.forEach(el => {
                // Check if it contains class names or dimension information
                const content = el.textContent || '';
                // More comprehensive check for debug overlay content
                if (
                  content.includes(' x ') || 
                  content.includes('section') || 
                  content.includes('creator-section') || 
                  content.includes('find-creators-section') ||
                  content.includes('relative') ||
                  content.includes('absolute') ||
                  content.includes('py-') ||
                  content.includes('px-') ||
                  content.includes('w-full') ||
                  content.includes('overflow-') ||
                  content.includes('px') ||
                  (el.style && el.style.backgroundColor === '#EBE3FF') ||
                  // Check for computed style
                  (window.getComputedStyle && window.getComputedStyle(el).backgroundColor === 'rgb(235, 227, 255)') ||
                  // Special check for Lovable tool debug output which shows component dimensions
                  (content.match(/\d+(\.\d+)? x \d+(\.\d+)?/) !== null) ||
                  // Additional checks for debugging elements
                  content.includes('section.relative') ||
                  content.includes('px × ') ||
                  content.includes('width:') ||
                  content.includes('height:') ||
                  content.includes('position:') ||
                  el.hasAttribute('data-lovable') ||
                  (el.children.length === 0 && !el.id && !el.className) || // Empty non-semantic divs
                  (el.nodeName === 'DIV' && !el.id && !el.className && el.style && 
                   (el.style.position === 'fixed' || el.style.position === 'absolute'))
                ) {
                  // First try to make it invisible (in case removal fails)
                  el.style.display = 'none';
                  el.style.opacity = '0';
                  el.style.visibility = 'hidden';
                  el.style.pointerEvents = 'none';
                  el.style.position = 'absolute';
                  el.style.zIndex = '-9999';
                  el.style.width = '0';
                  el.style.height = '0';
                  el.style.overflow = 'hidden';
                  el.style.clip = 'rect(0 0 0 0)';
                  el.style.margin = '0';
                  el.style.padding = '0';
                  
                  // Try to remove from DOM entirely using multiple approaches
                  if (el.parentNode) {
                    try {
                      // Method 1: Direct removal
                      el.parentNode.removeChild(el);
                    } catch (e) {
                      try {
                        // Method 2: Replace with empty comment
                        el.parentNode.replaceChild(document.createComment('debug overlay removed'), el);
                      } catch (e2) {
                        console.log('Could not remove debug element');
                      }
                    }
                  }
                }
              });
              
              // Also look for elements with suspiciously empty content
              // that might be rendering technical information
              const emptyNonSemantic = document.querySelectorAll('div:not([id]):not([class]):empty');
              emptyNonSemantic.forEach(el => {
                try {
                  if (el.parentNode) {
                    el.parentNode.removeChild(el);
                  }
                } catch (e) {
                  // Silently fail
                }
              });
            }
            
            // Run immediately
            fixHeroHeight();
            removeDebugOverlays();
            
            // Also run after load and after any animations
            window.addEventListener('load', function() {
              fixHeroHeight();
              removeDebugOverlays();
            });
            
            // Run multiple times to catch late-rendered elements
            setTimeout(fixHeroHeight, 500);
            setTimeout(removeDebugOverlays, 500);
            setTimeout(removeDebugOverlays, 1000);
            setTimeout(removeDebugOverlays, 2000);
          })();
        `}} />
        
        <div
          data-hero-section="true"
          ref={addSectionRef(0)} 
          style={{
            ...(isMobile ? { 
              position: 'relative',
              zIndex: 70, // High z-index but lower than creator section
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden',
              isolation: 'auto',
              maxHeight: '400px', // Reduced from 550px
              minHeight: 'auto', // Let content determine height
              height: 'auto', // Content-based height
              display: 'flex'
            } : { 
              ...getZIndex(0), 
              ...getBackgroundTransition(0),
              display: 'flex',
              alignItems: 'center', // Change to center alignment
              justifyContent: 'center',
              paddingTop: '20px', // Minimal top padding 
              paddingBottom: '30px', // Add padding to bottom
              minHeight: 'auto',
              height: 'auto', // Allow the section to size to its content
              marginBottom: '-30px', // Add negative margin to eliminate gap
              position: 'relative',
              zIndex: 70, // Consistent z-index with mobile
              width: '100%', // Ensure full width
              maxWidth: '100%', // Prevent overflow
              height: '650px', // Match the height to the CSS
              minHeight: '650px' // Consistent minimum height
            })
          }}
          data-hero-section="true"
          className={cn(
            "w-full bg-[#F9F6EC]", // Tan/gold background for hero section (desktop)
            !isMobile && "flex items-center justify-center pt-0 pb-0", // Reduced vertical padding
            moc.sectionWrapper, // Standardized section wrapper
            isMobile && "touch-action-pan-y overscroll-behavior-none" // Fix mobile scrolling
          )}
        >
          <div 
            style={{
              ...(isMobile ? { 
                position: 'static',
                contain: 'none',
                willChange: 'auto',
                width: '100%',
                overflow: 'hidden'
              } : { 
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
                paddingBottom: '0', // Explicitly remove bottom padding
                marginBottom: '-40px' // Increased negative margin to pull up next section more
              })
            }} 
            className={cn(
              "w-full max-w-none",
              !isMobile && "flex items-start justify-center"
            )}
          >
            <HeroSection />
          </div>
        </div>

        {/* Transition element completely removed for mobile */}
        {false && isMobile && (
          <div 
            style={{
              display: 'none',
              visibility: 'hidden',
              height: '0',
              width: '0',
              position: 'absolute',
              zIndex: -1,
              opacity: 0
            }}
          ></div>
        )}
        
        {/* Desktop transition element - ONLY shown on desktop */}
        {!isMobile && (
          <div 
            style={{
              height: '40px', // Standardized 40px height
              width: '100%',
              position: 'relative',
              zIndex: 30, // Consistent with other transitions (z-index: 30)
              marginTop: '-5px',
              marginBottom: '-5px',
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, #F9F6EC 0%, rgba(249, 246, 236, 0.95) 20%, rgba(249, 246, 236, 0.9) 40%, rgba(242, 237, 245, 0.8) 60%, rgba(235, 227, 255, 0.9) 80%, #EBE3FF 100%)',
              overflow: 'hidden',
              display: 'block',
              transform: 'translateZ(0)', // Hardware acceleration
              backfaceVisibility: 'hidden' // Rendering optimization
            }}
          >
            {/* Visual divider for desktop */}
            <div 
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2" 
              style={{
                width: '60px',
                height: '1px', // Thinner line (1px) for subtlety
                background: 'linear-gradient(to right, rgba(138, 66, 245, 0.1), rgba(138, 66, 245, 0.3), rgba(138, 66, 245, 0.1))',
                borderRadius: '2px',
                zIndex: 2 // Consistent with other dividers (z-index: 2)
              }}
            />
          </div>
        )}
        
        {/* Scroll Target for Find Creators - zero height and absolute position to avoid blocking content */}
        <ScrollTarget id="find-creators" height={0} style={{ 
          backgroundColor: 'transparent',
          position: 'absolute',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0,
          top: isMobile ? 'calc(100vh - 200px)' : 'auto'
        }} />
        
        {/* Mobile-specific style overrides to fix spacing issues */}
        {isMobile && (
          <style dangerouslySetInnerHTML={{ __html: `
            /* Direct targeting of Creator Network title in the preview search component */
            .creator-section .mb-3.flex.flex-col.items-center, 
            .creator-section .mb-3.flex.items-center,
            .creator-section [class*="text-center relative z-30"] {
              margin-top: 0 !important;
              margin-bottom: 0.5rem !important;
              padding-top: 0 !important;
            }
            
            /* Fix the main section padding */
            .creator-section {
              padding-top: 16px !important;
            }

            /* Target the "CREATOR NETWORK" label directly */
            .creator-section .bg-purple-100 {
              margin-top: 0 !important;
            }

            /* Reduce container padding */
            #find-creators {
              padding-top: 0 !important;
            }
          `}} />
        )}

        {/* Find Creators Section */}
        <section 
          ref={addSectionRef(1)}
          style={isMobile ?
            {
              position: 'relative',
              zIndex: 40, // Lower z-index to properly layer with internal content
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden',
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: '0',
              marginRight: '0',
              paddingLeft: '0',
              paddingRight: '0',
              backgroundColor: '#EBE3FF', // Explicitly set lavender background on mobile
              backgroundImage: 'none', // Reset backgroundImage
              background: '#EBE3FF', // Solid lavender background for the Creator section
              marginTop: '0', // NO negative margin - clean edge
              paddingTop: '110px', // Reduced padding further for mobile optimization
              borderTopWidth: '0', // No border on top
              borderBottomWidth: '0',
              borderLeftWidth: '0',
              borderRightWidth: '0',
              borderColor: 'transparent',
              borderStyle: 'none',
              outline: 'none',
              boxShadow: 'none'
            } : 
            {
              ...getZIndex(1),
              // Removed getBackgroundTransition to avoid color conflicts
              position: 'relative',
              zIndex: 80,
              marginTop: '0', // No negative margin
              paddingTop: '10px', // Standard padding on desktop
              backgroundColor: '#EBE3FF', // Lavender background on desktop
              background: '#EBE3FF', // Ensure solid background with no gradient
              backgroundImage: 'none', // Prevent any background patterns
              borderTopWidth: '0' // No top border
            }
          }
          // Remove background classes from the className to avoid conflicts with inline styles
          className={cn(
            "relative w-full pt-16 pb-20", // Standardized vertical spacing
            // Removed background classes that could conflict with inline styles
            isMobile && cn("py-8", moc.sectionPaddingMain), // Standardized mobile padding
            moc.sectionWrapper, // Standardized section wrapper
            "creator-section", // Class for Safari-specific fixes
            isMobile && "px-0 mx-0 max-w-none find-creators-section" // Remove horizontal padding/margin on mobile
          )}
        >
          {/* Removed gradient overlay for consistent background */}
          
          <div 
            className={cn(
              "w-full overflow-hidden",
              isMobile ? "px-0 mx-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            )}
            style={ 
              // Apply same style for both mobile and desktop
              {
                backgroundColor: 'transparent', // Make container transparent to show section background
                backgroundImage: 'none',
                position: 'relative',
                zIndex: 10, // Balanced z-index
                paddingTop: isMobile ? '20px' : '0' // Add padding only on mobile
              }
            }>
          
            <Suspense fallback={<SectionLoader />}>
              <PreviewSearch />
            </Suspense>
          </div>
        </section>
        
        {/* Scroll Target for How It Works */}
        <ScrollTarget id="how-it-works" height={0} />
        
        {/* Section Transition: Find Creators to How It Works - Standardized height and z-index */}
        {/* Section transition - hidden on mobile */}
        {!isMobile && (
          <div style={{ 
            marginTop: '-20px', // Reduced negative margin for better overlap
            position: 'relative',
            zIndex: 30 // Consistent z-index across transitions
          }}>
            <SectionTransition 
              fromColor="#F9F6EC" 
              toColor="#EDF7F2" 
              height={40} // Standardized 40px height
            />
          </div>
        )}
        
        {/* How It Works Section */}
        <section 
          ref={addSectionRef(2)} 
          style={isMobile ?
            {
              position: 'static',
              zIndex: 'auto',
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden'
            } : 
            {
              ...getZIndex(2),
              ...getBackgroundTransition(2)
            }
          }
          className={cn(
            "relative w-full pt-16 pb-20", // Standardized vertical spacing (reduced)
            "bg-[#EDF7F2]", // Pale mint - now applied to both mobile and desktop
            isMobile && cn("py-8", moc.sectionPaddingMain), // Standardized mobile padding
            moc.sectionWrapper // Standardized section wrapper
          )}
        >
          <div className={cn(
            "w-full max-w-7xl mx-auto overflow-hidden", 
            moc.contentPadding // Standardized content padding
          )}>
            <Suspense fallback={<SectionLoader />}>
              <OptimizedHowItWorks />
            </Suspense>
          </div>
        </section>
        
        {/* Section Transition: How It Works to Features - Standardized for desktop */}
        <div style={{ 
          marginTop: isMobile ? '-30px' : '-20px', // Standardized -20px for desktop
          position: 'relative',
          zIndex: 30 // Consistent z-index
        }}>
          <SectionTransition 
            fromColor="#EDF7F2" 
            toColor="#E7E9FF" 
            height={40} // Standardized 40px height
          />
        </div>
        
        {/* Scroll Target for Features */}
        <ScrollTarget id="features" height={0} />
        
        {/* Features Section */}
        <section 
          ref={addSectionRef(3)}
          style={isMobile ?
            {
              position: 'static',
              zIndex: 'auto',
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden'
            } : 
            {
              ...getZIndex(3),
              ...getBackgroundTransition(3)
            }
          }
          className={cn(
            "relative w-full pt-16 pb-20", // Standardized vertical spacing (reduced)
            "bg-[#E7E9FF]", // Rich periwinkle - now applied to both mobile and desktop
            isMobile && cn("py-8", moc.sectionPaddingMain, "touch-action-pan-y overscroll-behavior-none"), // Standardized mobile padding with scroll fix
            moc.sectionWrapper // Standardized section wrapper
          )}
        >
          <div className={cn(
            "w-full max-w-7xl mx-auto overflow-hidden", 
            moc.contentPadding // Standardized content padding
          )}>
            <Suspense fallback={<SectionLoader />}>
              <FeaturesSectionWithHoverEffects />
            </Suspense>
          </div>
        </section>

        {/* Section Transition: Features to Pricing - Standardized for desktop */}
        <div style={{ 
          marginTop: isMobile ? '-30px' : '-20px', // Standardized -20px for desktop
          position: 'relative',
          zIndex: 30 // Consistent z-index
        }}>
          <SectionTransition 
            fromColor="#E7E9FF" 
            toColor="#EEF3F9" 
            height={40} // Standardized 40px height
          />
        </div>

        {/* Scroll Target for Pricing */}
        <ScrollTarget id="pricing" height={0} />

        {/* Pricing Section */}
        <section 
          ref={addSectionRef(4)}
          style={isMobile ?
            {
              position: 'static',
              zIndex: 'auto',
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden'
            } : 
            {
              ...getZIndex(4),
              ...getBackgroundTransition(4)
            }
          }
          className={cn(
            "relative w-full pt-16 pb-20", // Standardized vertical spacing (reduced)
            "bg-[#EEF3F9]", // Soft blue-grey - now applied to both mobile and desktop
            isMobile && cn("py-8", moc.sectionPaddingMain), // Standardized mobile padding
            moc.sectionWrapper // Standardized section wrapper
          )}
        >
          <div className={cn(
            "w-full max-w-7xl mx-auto overflow-hidden", 
            moc.contentPadding // Standardized content padding
          )}>
            <Suspense fallback={<SectionLoader />}>
              <Pricing />
            </Suspense>
          </div>
        </section>

        {/* Section Transition: Pricing to Blog - Standardized for desktop */}
        <div style={{ 
          marginTop: isMobile ? '-30px' : '-20px', // Standardized -20px for desktop
          position: 'relative',
          zIndex: 30 // Consistent z-index
        }}>
          <SectionTransition 
            fromColor="#EEF3F9" 
            toColor="#F9F6EC" 
            height={40} // Standardized 40px height
          />
        </div>

        {/* Scroll Target for Blog */}
        <ScrollTarget id="blog" height={0} />

        {/* Blog Section */}
        <section 
          ref={addSectionRef(5)}
          style={isMobile ?
            {
              position: 'static',
              zIndex: 'auto',
              contain: 'none',
              willChange: 'auto',
              transform: 'none',
              overflow: 'hidden'
            } : 
            {
              ...getZIndex(5),
              ...getBackgroundTransition(5)
            }
          }
          className={cn(
            "relative w-full pt-16 pb-20", // Standardized vertical spacing (reduced)
            "bg-[#F9F6EC]", // Soft champagne (same as Find Creators) - now applied to both mobile and desktop
            isMobile && cn("py-8", moc.sectionPaddingMain), // Standardized mobile padding
            moc.sectionWrapper // Standardized section wrapper
          )}
        >
          <div className={cn(
            "w-full max-w-7xl mx-auto overflow-hidden", 
            moc.contentPadding // Standardized content padding
          )}>
            <Suspense fallback={<SectionLoader />}>
              <FeaturedBlogPosts />
            </Suspense>
          </div>
        </section>

        {/* Section Transition: Blog to Footer - Standardized for desktop */}
        <div style={{ 
          marginTop: isMobile ? '-30px' : '-20px', // Standardized -20px for desktop
          position: 'relative',
          zIndex: 30 // Consistent z-index
        }}>
          <SectionTransition 
            fromColor="#F9F6EC" 
            toColor="#f8f8fb" 
            height={40} // Standardized 40px height
          />
        </div>

        {!isMobile && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-3">
            {['find-creators', 'how-it-works', 'features', 'pricing', 'blog'].map((section, index) => {
              const isActive = visibleSections[index + 1];
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  style={{
                    boxShadow: isActive 
                      ? '0 0 0 2px rgba(255,255,255,0.15), 0 0 10px rgba(138,66,245,0.5)' 
                      : '0 0 0 1px rgba(255,255,255,0.1)',
                    position: 'relative',
                    zIndex: 100
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    isActive 
                      ? "bg-purple-600 scale-125" 
                      : "bg-purple-300/70 hover:bg-purple-400"
                  )}
                  aria-label={`Scroll to ${section.replace('-', ' ')}`}
                />
              );
            })}
          </div>
        )}

        <Footer />
      </main>
      
      <GlowDialog 
        open={showGlowDialog} 
        onOpenChange={setShowGlowDialog}
        triggerStrategy="combined"
      />
    </div>
  );
};

export default Index;