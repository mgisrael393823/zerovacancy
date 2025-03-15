import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PreviewCard } from './PreviewCard';
import { PreviewHeader } from './PreviewHeader';
import { PreviewContent } from './PreviewContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const PreviewSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === containerRef.current) {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
            } else {
              entry.target.classList.remove('content-visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '150px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set([...prev, imagePath]));
  };

  const creatorData = [
    {
      name: "Emily Johnson",
      services: ["Photography", "Virtual Staging"],
      price: 150,
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      image: "/newemilyprofile.jpg",
      workExamples: ["/1-d2e3f802.jpg"],
      availabilityStatus: "available-now" as const
    }, 
    {
      name: "Jane Cooper",
      services: ["Video Tours", "Drone Footage"],
      price: 200,
      rating: 4.8,
      reviews: 98,
      location: "Los Angeles, CA",
      image: "/janeprofile.png",
      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"],
      availabilityStatus: "available-tomorrow" as const
    }, 
    {
      name: "Michael Brown",
      services: ["3D Tours", "Floor Plans"],
      price: 175,
      rating: 4.7,
      reviews: 82,
      location: "Chicago, IL",
      image: "/emily profile.jpeg",
      workExamples: ["/1-d2e3f802.jpg"],
      availabilityStatus: "premium-only" as const
    }
  ];

  return (
    <div 
      className={cn(
        "w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 content-visibility-auto",
        "py-6 sm:py-6 md:py-8",
        isMobile ? "relative bg-[#F5F0FF] mt-3 rounded-t-2xl border-t border-purple-100/70" : "bg-[#F5F0FF]/60"
      )} 
      ref={containerRef}
    >
      {/* Enhanced section header with improved design */}
      <div className={cn(
        "text-center relative z-20",
        "pb-4 mb-4",
        isMobile && "border-b border-purple-100"
      )}>
        {/* Section label for better organization */}
        {isMobile && (
          <div className="mb-3 flex items-center justify-center">
            <div className="h-px w-5 bg-purple-200 mr-2"></div>
            <span className="text-xs uppercase tracking-wider text-purple-700 font-semibold">Creator Network</span>
            <div className="h-px w-5 bg-purple-200 ml-2"></div>
          </div>
        )}
        
        <div className={cn(
          "flex",
          isMobile ? "flex-col" : "items-center justify-between"
        )}>
          <div className={cn(
            "flex-1",
            isMobile && "mb-3"
          )}>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2"
            >
              FIND YOUR CREATIVE COLLABORATOR
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm sm:text-base text-gray-600 max-w-md mx-auto"
            >
              Because extraordinary spaces deserve extraordinary storytellers
            </motion.p>
          </div>
          
          {/* Removed CTA button */}
        </div>

        {/* Visual separator for mobile */}
        {isMobile && (
          <div className="w-12 h-1 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 rounded-full mx-auto mt-4 opacity-60"></div>
        )}
      </div>

      <div className="mx-auto relative group max-w-7xl">
        {!isMobile && (
          <div className={cn(
            "absolute -inset-0.5 sm:-inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-800/25 via-indigo-700/30 to-purple-900/25 blur-[2px] sm:blur-sm transition-all duration-500",
            isVisible ? "opacity-70 sm:opacity-80" : "opacity-0",
            "group-hover:opacity-90 group-hover:blur-md"
          )}></div>
        )}

        <PreviewCard isVisible={isVisible}>
          <PreviewContent />
        </PreviewCard>
      </div>
      
      {isMobile && (
        <div className="mobile-section-divider mt-6"></div>
      )}
    </div>
  );
};

export default PreviewSearch;
