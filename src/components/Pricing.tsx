
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/use-subscription";
import PricingHeader from "./pricing/PricingHeader";
import { BackgroundEffects } from "./pricing/BackgroundEffects";
import { CommonFeatures } from "./pricing/CommonFeatures";
import { PricingFAQ } from "./pricing/PricingFAQ";
import { PricingProvider } from "./pricing/PricingContext";
import { PricingContainer } from "./pricing/PricingContainer";
import { WaitlistCTA } from "./ui/waitlist-cta";
import { useIsMobile } from "@/hooks/use-mobile";

const Pricing = () => {
  const { subscription, isLoading } = useSubscription();
  const isMobile = useIsMobile();

  return (
    <PricingProvider>
      <div className="relative w-full py-8 sm:py-12 lg:py-20 overflow-hidden">
        {/* Background decorative elements - conditionally rendered for mobile */}
        {!isMobile && <BackgroundEffects />}
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced header with toggle now integrated */}
          <PricingHeader 
            title="PRICING TIERS" 
            subtitle="Select the package that fits your property's marketing needs"
          />
          
          {/* Unified pricing container that handles both mobile and desktop layouts */}
          <div className="mt-6 sm:mt-10 lg:mt-12 mb-6 sm:mb-8 lg:mb-10">
            <PricingContainer />
          </div>
          
          {/* Enhanced notes section */}
          <div className="mt-10 lg:mt-14 mb-4 sm:mb-6 lg:mb-8">
            <CommonFeatures />
          </div>

          {/* Waitlist CTA */}
          <div className="mt-10 sm:mt-12 text-center mb-4 sm:mb-6 lg:mb-8">
            <h3 className="text-xl font-semibold mb-3 text-brand-purple-dark font-jakarta">JOIN THE MOVEMENT</h3>
            <p className="text-brand-text-primary font-inter mb-6 max-w-xl mx-auto">The visionaries changing how we experience space are already here. The most compelling properties don't just show—they tell. They don't just appear—they resonate.</p>
            <WaitlistCTA source="pricing_page" buttonText="ACCESS THE COLLECTIVE" />
          </div>

          {/* FAQ section */}
          <div className="mt-10 sm:mt-12 lg:mt-16">
            <PricingFAQ />
          </div>
        </div>
      </div>
    </PricingProvider>
  );
};

export default Pricing;
