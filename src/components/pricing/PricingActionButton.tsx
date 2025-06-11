
import { useState } from "react";
import { ArrowRight } from '@/icons';
import { cn } from "@/lib/utils";
import { ColorVariant } from './PricingCardColors';

interface PricingActionButtonProps {
  isLoading: boolean;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
  title: string;
  cta: string;
  subscription?: any;
  isMobile?: boolean;
  colorTheme?: ColorVariant;
}

export const PricingActionButton = ({
  isLoading,
  isCurrentPlan,
  isSubscriptionActive,
  title,
  cta,
  subscription,
  isMobile = false,
  colorTheme = "blue"
}: PricingActionButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Streamlined button text for mobile
  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    
    if (isMobile) {
      if (title === "Basic") return "Start Basic";
      if (title === "Professional") return "Choose Pro";
      if (title === "Premium") return "Go Premium";
      return cta;
    }
    
    if (title === "Basic") return `Start with ${title}`;
    if (title === "Professional") return `Choose ${title}`;
    if (title === "Premium") return `Upgrade to ${title}`;
    return cta;
  };

  // Get color-specific classes
  const getColorClasses = () => {
    if (colorTheme === "blue") return "hover:bg-blue-600/90 active:bg-blue-700";
    if (colorTheme === "purple") return "hover:bg-violet-600/90 active:bg-violet-700";
    return "hover:bg-emerald-600/90 active:bg-emerald-700";
  };

  const handleSubscription = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);
    
    try {
      // This is a simplified version - add your actual subscription logic here
      setTimeout(() => {
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error('Subscription error:', error);
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className={cn(
        "flex justify-center",
        isMobile ? "mb-2" : "mb-6"
      )}>
        <div className="animate-pulse h-9 w-full bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (isCurrentPlan && isSubscriptionActive) {
    return (
      <button 
        className={cn(
          "w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium shadow-sm",
          isMobile ? "mb-2 py-1.5 text-xs" : "mb-6"
        )}
        disabled
      >
        Current Plan
      </button>
    );
  }

  return (
    <button 
      className={cn(
        "w-full font-medium transition-all duration-300 rounded-lg",
        "bg-gradient-to-r shadow-md touch-manipulation",
        isMobile ? "h-9 text-sm mb-2" : "h-12 text-base mb-6",
        colorTheme === "blue" ? "from-blue-500 to-blue-600" :
        colorTheme === "purple" ? "from-violet-500 to-violet-600" :
        "from-emerald-500 to-emerald-600",
        "text-white",
        getColorClasses(),
        // Add a subtle pulse animation for the highlighted plan on mobile
        isMobile && colorTheme === "purple" ? "animate-subtle-bounce" : ""
      )}
      onClick={handleSubscription}
      disabled={isProcessing}
    >
      <div className="flex items-center justify-center">
        <span>{getButtonText()}</span>
        <ArrowRight className={cn(
          "text-white/90",
          isMobile ? "w-3.5 h-3.5 ml-1" : "w-5 h-5 ml-2"
        )} />
      </div>
    </button>
  );
};
