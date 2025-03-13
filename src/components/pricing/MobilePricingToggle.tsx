
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MobilePricingToggleProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
  animateChange?: boolean;
}

export const MobilePricingToggle = ({
  isYearly,
  setIsYearly,
  animateChange = false
}: MobilePricingToggleProps) => {
  const [hydrated, setHydrated] = useState(false);
  
  // Handle hydration to prevent SSR/client mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      {/* Label text */}
      <div className="mb-2 flex items-center justify-center gap-6 text-sm font-medium">
        <span className={!isYearly ? "text-brand-purple-dark font-semibold" : "text-slate-600"}>
          Monthly
        </span>
        
        {/* The actual toggle switch - styled as a single toggle */}
        <button 
          onClick={() => setIsYearly(!isYearly)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2",
            isYearly ? "bg-brand-purple" : "bg-slate-200",
          )}
          type="button"
          role="switch"
          aria-checked={isYearly}
        >
          <span 
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform",
              isYearly ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
        
        <span className={isYearly ? "text-brand-purple-dark font-semibold" : "text-slate-600"}>
          Annual
        </span>
      </div>
      
      {/* Savings label for annual billing */}
      {isYearly && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1"
        >
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-[#4CAF50] bg-[#E8F5E9] rounded-full shadow-sm border border-[#C8E6C9]">
            <Check className="h-3 w-3 mr-1 text-[#4CAF50]" />
            Save 20%
          </span>
        </motion.div>
      )}
    </div>
  );
};
