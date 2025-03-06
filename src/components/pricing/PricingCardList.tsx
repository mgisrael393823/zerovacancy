
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingCard } from "./PricingCard";
import { motion } from "framer-motion";

interface PricingCardListProps {
  cards: Array<{
    title: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
    cta: string;
    color?: any;
    highlighted?: boolean;
    showPopularTag?: boolean;
    valueProposition?: string;
  }>;
  subscription: any;
  isLoading: boolean;
}

export const PricingCardList = ({ 
  cards, 
  subscription, 
  isLoading 
}: PricingCardListProps) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(
    cards.findIndex(card => card.highlighted) !== -1 
      ? cards.findIndex(card => card.highlighted) 
      : 1
  );
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle navigation between cards on mobile
  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next' && activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (direction === 'prev' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  // Scroll to active card on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.offsetWidth;
      const scrollPosition = activeIndex * cardWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);
  
  // Handle swipe gestures on mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;
    
    let startX: number;
    let currentX: number;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      currentX = startX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      const diff = startX - currentX;
      // Minimum swipe threshold (40px)
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe left - go to next card
          handleNavigation('next');
        } else {
          // Swipe right - go to previous card
          handleNavigation('prev');
        }
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, activeIndex]);

  return (
    <div className="relative">
      {/* Mobile pagination indicators */}
      {isMobile && (
        <div className="flex justify-center mb-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "transition-all duration-300",
                index === activeIndex 
                  ? "w-6 h-2 bg-violet-500 rounded-full" 
                  : "w-2 h-2 bg-slate-300 rounded-full"
              )}
              aria-label={`View ${cards[index].title} plan`}
            />
          ))}
        </div>
      )}
      
      {/* Mobile navigation buttons */}
      {isMobile && (
        <div className="absolute z-10 inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          {activeIndex > 0 && (
            <button
              onClick={() => handleNavigation('prev')}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md ml-1 pointer-events-auto"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
          )}
          
          {activeIndex < cards.length - 1 && (
            <button
              onClick={() => handleNavigation('next')}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md mr-1 pointer-events-auto"
            >
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>
          )}
        </div>
      )}
      
      {/* Cards container */}
      <div
        ref={containerRef}
        className={cn(
          isMobile
            ? "flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
            : "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8",
          "transition-opacity duration-500"
        )}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              isMobile 
                ? "min-w-full flex-shrink-0 snap-center px-4"
                : "",
              !isMobile && card.highlighted 
                ? "md:transform md:scale-105 md:z-10"
                : ""
            )}
          >
            <PricingCard
              {...card}
              isLoading={isLoading}
              isCurrentPlan={subscription?.plan === card.title}
            />
          </div>
        ))}
      </div>
      
      {/* Mobile swipe instruction */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center bg-slate-50 text-slate-500 text-xs px-3 py-1.5 rounded-full shadow-sm">
            <ChevronLeft className="h-3 w-3 mr-1.5 opacity-70" />
            <span>Swipe to compare plans</span>
            <ChevronRight className="h-3 w-3 ml-1.5 opacity-70" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
