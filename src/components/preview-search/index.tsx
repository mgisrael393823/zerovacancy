import * as React from 'react';
import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { PreviewCard } from './PreviewCard';
import { PreviewContent } from './PreviewContent';
import { useIsMobile } from '@/hooks/use-mobile';

// Replacing motion animation with CSS to prevent jitter
// Static title component with CSS-based animation that's more efficient
const SectionTitle = memo(({ isVisible, isMobile }: { isVisible: boolean; isMobile: boolean }) => {
  // Pre-compute classes to avoid recalculation during render
  const titleClass = useMemo(() => cn(
    isMobile ? "text-2xl sm:text-3xl" : "section-header",
    "tracking-tight mb-3",
    "transition-all duration-500 transform-gpu", 
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
    // Add padding for mobile to prevent text overflow
    isMobile ? "px-2 w-full mt-2" : ""
  ), [isVisible, isMobile]);

  const subtitleClass = useMemo(() => cn(
    isMobile ? "text-sm sm:text-base" : "body-text",
    "max-w-2xl mx-auto text-gray-600 title-subtitle-spacing",
    "transition-all duration-500 delay-200 transform-gpu",
    isVisible ? "opacity-100" : "opacity-0",
    // Add padding for mobile to prevent text overflow
    isMobile ? "px-3 w-full" : ""
  ), [isVisible, isMobile]);

  // Fixed content that won't change to reduce rerender overhead
  return (
    <div className={cn(
      "flex-1",
      isMobile && "mb-3"
    )}>
      <h2 
        id="creators-title" 
        className={cn(titleClass, "headingLarge")}
        style={{ 
          willChange: 'opacity, transform',
          transform: isVisible ? 'translateZ(0)' : 'translateZ(0) translateY(10px)',
          wordBreak: 'break-word', // Ensures text wraps properly
          maxWidth: '100%', // Constrains the text within its container
          overflowWrap: 'break-word', // Additional support for long words
          hyphens: 'auto', // Adds hyphens when breaking words if needed
          background: 'linear-gradient(to right, #7633DC, #A367E7)', // Gradient text for better visibility
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          display: 'inline-block'
        }}
      >
        {isMobile ? (
          <>
            FIND YOUR<br />
            CREATIVE COLLABORATOR
          </>
        ) : (
          'FIND YOUR CREATIVE COLLABORATOR'
        )}
      </h2>
      
      <p 
        className={cn(subtitleClass, "bodyText tagline")}
        style={{ 
          willChange: 'opacity',
          transitionDelay: '0.2s',
          wordBreak: 'break-word',
          maxWidth: '100%',
          overflowWrap: 'break-word'
        }}
      >
        {isMobile ? 
          "Extraordinary spaces deserve extraordinary storytellers" : 
          "Because extraordinary spaces deserve extraordinary storytellers"
        }
      </p>
    </div>
  );
});

// Direct export with arrow function
const PreviewSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  // Track if component has been seen to avoid reanimation
  const hasBeenSeen = useRef(false);
  
  // Precalculate container styles to avoid recalculation
  const containerClasses = useMemo(() => cn(
    "w-full",
    // Remove content-visibility-auto which can cause jitter when combined with IntersectionObserver
    isMobile ? "pb-8" : "py-2 sm:py-2 md:py-3", // Significantly reduced padding
    isMobile ? "relative mt-3" : ""
  ), [isMobile]);
  
  // Optimize the Intersection Observer to use only when needed
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Use a more conservative threshold and smaller rootMargin to trigger earlier
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Once section becomes visible, set visible state and mark as seen
          setIsVisible(true);
          hasBeenSeen.current = true;
          
          // Add class for CSS transitions if needed
          containerRef.current?.classList.add('content-visible');
          
          // Once we've seen it once, disconnect the observer to save resources
          observer.disconnect();
        }
      },
      // More generous margins to start loading earlier
      { threshold: 0.05, rootMargin: '250px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Pre-compute card style properties
  const cardGlowStyle = useMemo(() => ({
    opacity: isVisible ? 0.8 : 0,
    transform: 'translateZ(0)', // Hardware acceleration
    transition: 'opacity 0.5s ease, blur 0.5s ease',
    willChange: 'opacity, filter', // Optimization hint
  }), [isVisible]);

  return (
    <section 
      id="find-creators"
      aria-labelledby="creators-title"
      className={containerClasses}
      ref={containerRef}
      style={{
        contain: 'layout paint style', // Optimization for layout calculation
        contentVisibility: 'auto', // More efficient than content-visibility CSS class
        position: 'relative',
        transform: 'translateZ(0)', // Hardware acceleration
        backgroundColor: '#EBE3FF', // Consistent lavender background for both mobile and desktop
        backgroundImage: 'none', // Prevent any background patterns
        borderWidth: 0, // Ensure no borders
        borderColor: 'transparent', // Transparent border color
        borderStyle: 'none', // No border style
        outline: 'none', // No outline
        boxShadow: 'none', // No box shadow
        zIndex: 80, // Higher z-index consistent with other sections
        paddingTop: isMobile ? '20px' : '64px', // Standard 64px top padding on desktop
        paddingBottom: isMobile ? '20px' : '40px', // Standard 40px bottom padding on desktop
        borderTop: isMobile ? 'none' : '1px solid rgba(138, 66, 245, 0.1)', // Subtle top border on desktop for separation
        marginTop: isMobile ? '50px' : 0, // Increased top margin on mobile to push section down further
        marginBottom: 0 // Remove any bottom margin
      }}
    >
      {/* Section header with optimized rendering */}
      <div className={cn(
        "text-center relative z-30",
        "pb-4 mb-4 transform-gpu", // Reduced bottom padding and margin
        isMobile ? "px-2 w-full max-w-full" : "" // Add horizontal padding on mobile
      )}
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform', // Optimization hint
        maxWidth: '100%', // Ensure content doesn't overflow
        boxSizing: 'border-box' // Include padding in width calculations
      }}>
        {/* Enhanced section label using the same design pattern as Features section */}
        {isMobile ? (
          <div 
            className="mb-3 flex flex-col items-center justify-center transform-gpu"
            style={{ transform: 'translateZ(0)', marginTop: '0' }}
          >
            <div className="bg-purple-100 px-4 py-1.5 rounded-full mb-2 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-purple-700 font-semibold">Creator Network</span>
            </div>
            <div className="h-px w-16 bg-purple-200/70"></div>
          </div>
        ) : (
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-purple-700">Creator Network</span>
            </div>
            <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mb-6 animate-pulse-subtle" />
          </div>
        )}
        
        <div className={cn(
          "flex transform-gpu",
          isMobile ? "flex-col" : "items-center justify-between"
        )}
        style={{ transform: 'translateZ(0)' }}
        >
          {/* Optimized title component with CSS animations instead of JS */}
          <SectionTitle isVisible={isVisible} isMobile={isMobile} />
        </div>

        {/* Visual separator for mobile removed for cleaner design */}
      </div>

      {/* Main content wrapper with optimized animations */}
      <div 
        className="mx-auto relative group max-w-7xl transform-gpu"
        style={{ 
          transform: 'translateZ(0)',
          width: '100%',
          ...(isMobile ? {} : { 
            padding: '0 24px', // Consistent padding with other sections
            maxWidth: '1280px', // Wider container on desktop
            marginTop: '16px' // Add spacing between title and content
          })
        }}
      >
        {/* Main content card with optimized visibility prop */}
        <PreviewCard isVisible={isVisible || hasBeenSeen.current}>
          <PreviewContent />
        </PreviewCard>
      </div>
      
      {/* Removed mobile-only divider */}
    </section>
  );
}

// Direct export
export default PreviewSearch;
