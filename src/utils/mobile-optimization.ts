
/**
 * Utility functions for improving mobile performance
 * Disables heavy animations and effects on mobile devices
 */

export const MOBILE_BREAKPOINT = 768;

// Check if the user has requested reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Optimized mobile viewport settings that prevent unwanted zooming
export const optimizeMobileViewport = () => {
  if (typeof window === "undefined") return;
  // Find existing viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    // Set viewport to prevent unwanted zooming
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  }
  
  // Add touch-action to body to prevent pull-to-refresh
  document.body.style.touchAction = 'pan-y';
  document.body.style.overscrollBehavior = 'contain';
  
  // Force text size to prevent auto-zoom on inputs
  const style = document.createElement('style');
  style.innerHTML = `
    input, select, textarea {
      font-size: 16px !important;
    }
    
    body {
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }
  `;
  document.head.appendChild(style);
};

// Helper classes to conditionally apply to components
export const mobileOptimizationClasses = {
  // Hide elements completely on mobile
  hideOnMobile: "sm:block hidden",
  // Only show on mobile
  showOnMobile: "sm:hidden block",
  // Disable hover effects on mobile
  noHoverEffectsMobile: "sm:hover:scale-105 sm:hover:shadow-lg sm:transition-all",
  // Improved shadows for mobile
  improvedShadowMobile: "shadow-md sm:shadow-lg",
  // Gradient background for mobile (subtle purple tint)
  gradientBgMobile: "bg-gradient-to-br from-white to-purple-50 sm:bg-white",
  // Colored background for mobile, white for desktop
  coloredBgMobile: "bg-purple-50 sm:bg-white",
  // Card background for mobile with subtle gradient
  cardBgMobile: "bg-gradient-to-tr from-white via-white to-purple-50 sm:bg-white",
  // Reduced opacity on mobile
  reducedOpacityMobile: "opacity-70 sm:opacity-100",
  // Border with color for mobile
  coloredBorderMobile: "border border-purple-100 sm:border-gray-200",
  
  // New subtle gradients for different components
  subtleGradientPurple: "bg-gradient-to-br from-white to-purple-50/70 hover:from-white hover:to-purple-50/90",
  subtleGradientBlue: "bg-gradient-to-br from-white to-blue-50/70 hover:from-white hover:to-blue-50/90",
  subtleGradientIndigo: "bg-gradient-to-br from-white to-indigo-50/70 hover:from-white hover:to-indigo-50/90",
  subtleGradientCyan: "bg-gradient-to-br from-white to-cyan-50/70 hover:from-white hover:to-cyan-50/90",
  
  // Brighter gradients for pricing cards
  pricingGradientBasic: "bg-gradient-to-br from-white to-blue-50/80 hover:to-blue-50",
  pricingGradientPro: "bg-gradient-to-br from-white to-purple-50/80 hover:to-purple-50",
  pricingGradientPremium: "bg-gradient-to-br from-white to-emerald-50/80 hover:to-emerald-50",
  
  // Clean border with subtle color
  cleanBorderMobile: "border border-gray-100 sm:border-gray-200",
};
