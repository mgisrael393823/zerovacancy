
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

/**
 * MobileOptimizer component that provides global mobile optimizations
 * by adding necessary body classes and event listeners for better
 * touch and scroll behavior.
 */
export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const hasAppliedOptimizations = useRef(false);
  
  useEffect(() => {
    if (isMobile && !hasAppliedOptimizations.current) {
      // Prevent multiple applications of optimizations
      hasAppliedOptimizations.current = true;
      
      // Add mobile optimization classes to body
      document.body.classList.add('mobile-optimized');
      
      // Fix iOS momentum scrolling and prevent overscroll
      document.documentElement.style.setProperty(
        'overscroll-behavior-y', 'none'
      );
      
      // Disable any scroll snap behavior
      document.documentElement.style.setProperty('scroll-snap-type', 'none');
      
      // Simplified optimization approach - avoid DOM manipulation that could cause rendering issues
      const passiveOption = { passive: true };
      
      const addPassiveListeners = () => {
        document.addEventListener('touchstart', () => {}, passiveOption);
        document.addEventListener('touchmove', () => {}, passiveOption);
        document.addEventListener('wheel', () => {}, passiveOption);
      };
      
      addPassiveListeners();
      
      // Clean up on unmount
      return () => {
        document.body.classList.remove('mobile-optimized');
        document.documentElement.style.removeProperty('overscroll-behavior-y');
        document.documentElement.style.removeProperty('scroll-snap-type');
        
        document.removeEventListener('touchstart', () => {});
        document.removeEventListener('touchmove', () => {});
        document.removeEventListener('wheel', () => {});
        
        hasAppliedOptimizations.current = false;
      };
    }
  }, [isMobile]);
  
  return <>{children}</>;
};

export default MobileOptimizer;
