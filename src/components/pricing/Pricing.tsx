
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/use-subscription";
import PricingHeader from "./PricingHeader";
import { BackgroundEffects } from "./BackgroundEffects";
import { PricingProvider, usePricing } from "./PricingContext";
import { PricingContainer } from "./PricingContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { isLandscapeMode } from "@/utils/mobile-optimization";
import { useEffect, useState } from "react";

// Wrapper component that uses the pricing context and passes values to PricingHeader
const PricingContent = () => {
  const { isYearly, setIsYearly, animateChange } = usePricing();
  const isMobile = useIsMobile();
  const [isLandscape, setIsLandscape] = useState(false);
  
  // Update landscape state when orientation changes
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(isLandscapeMode());
    };
    
    // Check initially
    checkOrientation();
    
    // Add listeners for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  return (
    <>
      {/* Enhanced header with toggle now integrated */}
      <PricingHeader 
        title="PRICING TIERS" 
        subtitle="Select the package that fits your property's marketing needs"
        isYearly={isYearly}
        setIsYearly={setIsYearly}
        animateChange={animateChange}
      />
      
      {/* Removed wrapping div around PricingContainer for mobile */}
      <div className={cn(
        "mt-6 sm:mt-10 lg:mt-12 mb-6 sm:mb-8 lg:mb-10",
        !isMobile && "mx-auto rounded-xl shadow-sm max-w-[95%] py-8 px-4", // Only apply container div on desktop
        isLandscape && "landscape-content-fix mt-2 mb-2 py-2" // Apply landscape specific fixes
      )}>
        <PricingContainer />
      </div>
      
      {/* Small copy text replacing the CommonFeatures component */}
      <div className={cn(
        "text-center text-sm text-slate-500 max-w-2xl mx-auto mt-4 mb-10",
        isLandscape && "mt-1 mb-4 landscape-text-fix" // Reduce margins in landscape mode
      )}>
        <p className={cn(
          "px-[6px] mx-[34px] mt-[-20px] text-xs font-light py-0",
          isLandscape && "mt-[-10px]" // Adjust top margin in landscape
        )}>
          All plans include: High-resolution images, dedicated support, property website, mobile-optimized, digital downloads, no watermarks. Custom plans available for agencies and teams. 
        </p>
      </div>
    </>
  );
};

const Pricing = () => {
  const {
    subscription,
    isLoading
  } = useSubscription();
  
  // Track landscape mode
  const [isLandscape, setIsLandscape] = useState(false);
  
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(isLandscapeMode());
    };
    
    // Check initially
    checkOrientation();
    
    // Add listeners for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  return (
    <PricingProvider>
      <div className={cn(
        "relative w-full py-8 sm:py-12 lg:py-20 overflow-hidden",
        isLandscape && "landscape-pricing py-2 sm:py-4" // Apply landscape specific classes
      )}>
        {/* Background decorative elements - now showing on both mobile and desktop */}
        <BackgroundEffects />
        
        <div className={cn(
          "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
          isLandscape && "px-2 sm:px-3" // Reduce padding in landscape mode
        )}>
          <PricingContent />
        </div>
      </div>
    </PricingProvider>
  );
};

export default Pricing;
