import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { AuroraBackground } from './ui/aurora-background';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const PreviewSearch = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-2 sm:px-3 md:px-6 lg:px-8">
      <div className="mx-auto relative group">
        <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_6px_20px_-10px_rgba(120,80,200,0.2)] sm:shadow-[0_10px_40px_-12px_rgba(120,80,200,0.25)] border border-zinc-200/60 bg-white"
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 30 : 20}
              borderWidth={isMobile ? 0.5 : 1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 3 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.7 : 0.6}
              spread={isMobile ? 8 : 15}
              borderWidth={isMobile ? 0.5 : 1}
              className={isMobile ? "opacity-10" : "opacity-20"}
            />
            <AnimatedGrid className={isMobile ? "opacity-2" : "opacity-5"} />
          </div>
          <AuroraBackground 
            className="min-h-0 w-full" 
            showRadialGradient={!isMobile}
          >
            <div className="flex flex-col w-full relative z-10">
              <div className="text-center pt-3 sm:pt-5 md:pt-6 pb-0.5 sm:pb-1 md:pb-2 px-2 sm:px-3 md:px-4">
                <h2 className="text-lg sm:text-xl md:text-3xl font-bold tracking-tight mb-1 sm:mb-1.5 md:mb-3 text-gray-900 leading-tight">
                  Find Your Perfect Creator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-2 sm:mb-3 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                  Connect with skilled professionals who can showcase your property in its best light
                </p>
              </div>
              
              <div className="w-full px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5">
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              <div className="w-full px-2 sm:px-3 md:px-6 py-3 sm:py-4 md:py-6 bg-gradient-to-b from-transparent to-purple-50/20 sm:to-purple-50/30">
                <CreatorsList 
                  creators={[{
                    name: "Emily Johnson",
                    services: ["Photography", "Virtual Staging"],
                    price: 150,
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, NY",
                    image: "/newemilyprofile.jpg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }, {
                    name: "Jane Cooper",
                    services: ["Video Tours", "Drone Footage"],
                    price: 200,
                    rating: 4.8,
                    reviews: 98,
                    location: "Los Angeles, CA",
                    image: "/janeprofile.png",
                    workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
                  }, {
                    name: "Michael Brown",
                    services: ["3D Tours", "Floor Plans"],
                    price: 175,
                    rating: 4.7,
                    reviews: 82,
                    location: "Chicago, IL",
                    image: "/emily profile.jpeg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }]} 
                  sortBy="rating" 
                  onSort={() => {}} 
                  onImageLoad={() => {}} 
                  loadedImages={new Set()}
                  imageRef={() => {}}
                />
              </div>
            </div>
          </AuroraBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
