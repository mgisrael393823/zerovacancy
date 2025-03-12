
import React, { createContext, useContext, useState, ReactNode } from "react";
import { PRICING, SAVINGS } from "./pricingData";

interface PricingContextType {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
  currentPrices: {
    starter: number;
    pro: number;
    premium: number;
  };
  getSavings: (planType: 'pro' | 'premium') => number;
  animateChange: boolean;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [isYearly, setIsYearly] = useState(true);
  const [animateChange, setAnimateChange] = useState(false);
  
  // Update prices based on billing period
  const currentPrices = {
    starter: 0,
    pro: isYearly ? PRICING.starterAnnual : PRICING.starterMonthly,
    premium: isYearly ? PRICING.proAnnual : PRICING.proMonthly
  };
  
  // Calculate savings for each plan
  const getSavings = (planType: 'pro' | 'premium') => {
    if (!isYearly) return 0;
    
    const monthlyCost = planType === 'pro' ? PRICING.starterMonthly : PRICING.proMonthly;
    const annualCost = planType === 'pro' ? PRICING.starterAnnual : PRICING.proAnnual;
    
    return Math.round(12 * (monthlyCost - annualCost));
  };
  
  // Toggle billing period with animation
  const handleSetIsYearly = (value: boolean) => {
    setIsYearly(value);
    setAnimateChange(true);
    setTimeout(() => setAnimateChange(false), 2000);
  };
  
  return (
    <PricingContext.Provider 
      value={{ 
        isYearly, 
        setIsYearly: handleSetIsYearly, 
        currentPrices, 
        getSavings,
        animateChange
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
}
