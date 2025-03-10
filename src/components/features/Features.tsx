
import { useState } from "react";
import { features } from "./feature-data";
import { FeatureHeader } from "./FeatureHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { FeaturesGrid } from "./FeaturesGrid";
import { MobileViewButton } from "./MobileViewButton";

export function FeaturesSectionWithHoverEffects() {
  const isMobile = useIsMobile();
  const [showAllCards, setShowAllCards] = useState(false);
  
  // Function to toggle showing all cards
  const toggleShowAllCards = () => {
    setShowAllCards(prev => !prev);
  };
  
  // On mobile, show only first 3 cards (including Video Production)
  const visibleFeatures = isMobile && !showAllCards 
    ? features.slice(0, 3) 
    : features;
  
  return (
    <section 
      className="relative py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible" 
      id="features"
      // Add scroll margin to prevent skipping over section
      style={{ scrollMarginTop: isMobile ? '80px' : '0' }}
    >
      {/* Only show background on non-mobile devices */}
      {!isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white pointer-events-none"></div>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <FeatureHeader 
          title="THE CREATIVE ARSENAL"
          description="Visual weaponry to transform perception and drive desire"
        />
        
        <FeaturesGrid
          features={features}
          visibleFeatures={visibleFeatures}
          isMobile={isMobile}
          showAllCards={showAllCards}
          toggleShowAllCards={toggleShowAllCards}
        />
        
        {/* Only show view all button on desktop or when on mobile and not showing all cards */}
        {(!isMobile || !showAllCards) && (
          <MobileViewButton
            showAllCards={showAllCards}
            toggleShowAllCards={toggleShowAllCards}
            isMobile={isMobile}
          />
        )}
      </div>
    </section>
  );
}

// Export both named and default export for backward compatibility
export default FeaturesSectionWithHoverEffects;
