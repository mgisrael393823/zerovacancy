import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Image, BadgeCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Creator {
  name: string;
  services: string[];
  location: string;
}

interface CreatorInfoProps {
  creator: Creator;
}

export const CreatorInfo: React.FC<CreatorInfoProps> = ({ creator }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-3.5 sm:p-4.5 text-white select-text z-10">
      {/* Enhanced darker semi-transparent gradient overlay for better text visibility on mobile */}
      <div className={cn(
        "absolute inset-0 pointer-events-none",
        isMobile 
          ? "bg-gradient-to-t from-black/95 via-black/75 to-transparent" // Darker gradient for mobile
          : "bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      )}></div>
      
      <div className={cn(
        "relative z-10",
        isMobile ? "pl-1" : "" // Extra left padding on mobile for better alignment
      )}>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <h3 className={cn(
            "font-bold text-white",
            isMobile ? "text-base" : "text-lg sm:text-xl" // Smaller text size on mobile
          )}>
            {creator.name}
          </h3>
          {/* Smaller verification badge on mobile */}
          <BadgeCheck 
            className={cn(
              isMobile ? "w-4 h-4" : "w-4.5 h-4.5 sm:w-5 sm:h-5",
              "text-white/90",
              "transition-all duration-300",
              isMobile 
                ? "bg-indigo-500/30 rounded-full p-0.5" // More subtle on mobile
                : "bg-indigo-500/30 rounded-full p-0.5",
              "group-hover:bg-indigo-500/50" // Subtle hover effect
            )}
            aria-label="Verified Creator"
          />
        </div>
        
        {/* Combined location and services for mobile */}
        {isMobile ? (
          <div className="flex items-center gap-2 mt-1.5">
            <MapPin 
              className="w-3 h-3 text-white/90 flex-shrink-0" 
              aria-hidden="true"
            />
            <span className="text-xs text-white/90 truncate max-w-[calc(100%-20px)]">
              {creator.location} • {creator.services.join(", ")}
            </span>
          </div>
        ) : (
          <>
            {/* Location display for desktop */}
            <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3">
              <MapPin 
                className="w-3.5 h-3.5 text-white/90 flex-shrink-0" 
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm text-white/90 font-medium">{creator.location}</span>
            </div>
            
            {/* Services display for desktop */}
            <div className="flex items-center gap-1.5 mt-2 sm:mt-2.5">
              <Image
                className="w-3.5 h-3.5 text-white/85 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-xs sm:text-sm text-white/85">
                {creator.services.join(" • ")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
