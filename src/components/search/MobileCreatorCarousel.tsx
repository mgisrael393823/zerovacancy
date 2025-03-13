
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Grip } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { CreatorCard } from '../creator/CreatorCard';
import type { Creator } from '../creator/types';
import { mobileOptimizationClasses } from '@/utils/mobile-optimization';

interface MobileCreatorCarouselProps {
  creators: Creator[];
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const MobileCreatorCarousel: React.FC<MobileCreatorCarouselProps> = ({
  creators,
  onImageLoad,
  loadedImages,
  imageRef
}) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Optimized carousel settings for mobile with better snap alignment
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: true,
    skipSnaps: false
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Force a reInit after mount with increased delay for more reliable rendering
    const timer = setTimeout(() => {
      emblaApi.reInit();

      // Hide first-time swipe hint after 5 seconds
      setTimeout(() => {
        setIsFirstVisit(false);
      }, 5000);
    }, 500);

    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  const { 
    gradientBgMobile, 
    improvedShadowMobile, 
    coloredBorderMobile, 
    cardBgMobile 
  } = mobileOptimizationClasses;

  return (
    <div className="w-full relative">
      {/* Swipe instruction */}
      {isFirstVisit && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-md">
          <Grip className="w-4 h-4" />
          <span>Swipe to explore</span>
        </div>
      )}

      {/* Simplified carousel container */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {creators.map((creator) => (
            <div 
              key={creator.name} 
              style={{ touchAction: 'pan-y' }} 
              className="min-w-[96%] w-[96%] pl-1 pr-1 my-[6px]"
            >
              <CreatorCard 
                creator={creator} 
                onImageLoad={onImageLoad} 
                loadedImages={loadedImages} 
                imageRef={imageRef} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev} 
        className={cn(
          "absolute left-1 top-[45%] -translate-y-1/2 z-10 rounded-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white", 
          "touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center shadow-md transition-opacity duration-300", 
          !prevBtnEnabled && "opacity-40 cursor-not-allowed"
        )} 
        disabled={!prevBtnEnabled}
        aria-label="Previous creator"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={scrollNext} 
        className={cn(
          "absolute right-1 top-[45%] -translate-y-1/2 z-10 rounded-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white", 
          "touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center shadow-md transition-opacity duration-300", 
          !nextBtnEnabled && "opacity-0 pointer-events-none"
        )} 
        disabled={!nextBtnEnabled}
        aria-label="Next creator"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
