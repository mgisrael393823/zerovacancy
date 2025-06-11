
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar, CalendarDays, Check } from "@/icons";
import { MobilePricingToggle } from "./MobilePricingToggle";
import { mobileOptimizationClasses as moc } from "@/utils/mobile-optimization";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
  isSticky?: boolean;
  isYearly?: boolean;
  setIsYearly?: (isYearly: boolean) => void;
  animateChange?: boolean;
  showStickyHeader?: boolean;
}

const PricingHeader = ({
  title,
  subtitle,
  isSticky = false,
  isYearly = true,
  setIsYearly = () => {},
  animateChange = false,
  showStickyHeader = false
}: PricingHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "text-center mx-auto transition-all duration-300 w-full",
      isSticky ? 
        "max-w-full py-3 bg-white/95 backdrop-blur-sm shadow-sm z-20 border-b border-gray-100" : 
        "max-w-3xl py-0",
      isMobile ? "px-3" : ""
    )}
    style={{ touchAction: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex flex-col items-center w-full",
          isSticky ? "gap-2" : isMobile ? "gap-2" : "gap-4" // Reduced gap for mobile
        )}
      >
        {!isSticky && (
          <>
            {/* Main title with distinctive styling for the pricing section */}
            <h2 className={cn(
              "font-bold font-jakarta w-full text-center",
              moc.headingLarge, 
              isMobile ? 
                "text-2xl mt-4 text-blue-600 relative" : 
                "text-3xl sm:text-4xl mt-4 text-brand-purple-dark"
            )}>
              {title}
              {isMobile && (
                <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full shadow-sm">
                  Plans & Options
                </span>
              )}
            </h2>
            
            {/* Enhanced decorative element for pricing section */}
            <div className={cn(
              isMobile ? 
                "bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 rounded-full mx-auto" : 
                "bg-gradient-to-r from-[#4A2DD9] via-[#8A2BE2] to-[#4169E1] rounded-full mx-auto",
              isMobile ? "w-16 h-1" : "w-20 h-1.5",
              isMobile ? "-mt-2 mb-2" : "mb-4"
            )} />
            
            {/* Subtitle - improved for readability */}
            {subtitle && (
              <p className={cn(
                "mx-auto text-brand-text-secondary font-inter text-center",
                moc.bodyText,
                moc.textContainer,
                isMobile ? 
                  "text-sm leading-relaxed max-w-[85%] mb-1" : 
                  "text-base max-w-xl mb-4"
              )}>
                {subtitle}
              </p>
            )}
          </>
        )}
        
        {/* Conditionally render the appropriate toggle based on device */}
        {isMobile ? (
          <MobilePricingToggle 
            isYearly={isYearly}
            setIsYearly={setIsYearly}
            animateChange={animateChange}
          />
        ) : (
          <div className={cn(
            "flex items-center overflow-hidden rounded-full transition-all duration-300 w-full max-w-md mx-auto",
            isSticky ? "scale-90" : "",
            "bg-slate-100 p-1 border border-slate-200 shadow-sm"
          )}>
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                !isYearly 
                  ? "bg-white text-gray-700 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              )}
              aria-pressed={!isYearly}
            >
              Monthly
            </button>
            
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                isYearly 
                  ? "bg-white text-[#8344FF] shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              )}
              aria-pressed={isYearly}
            >
              Annual
              
              {isYearly && (
                <span className={cn(
                  "text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap",
                  animateChange ? "animate-pulse" : ""
                )}>
                  Save 20%
                </span>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PricingHeader;
