
import React from 'react';
import { Camera, Compass, Video, Laptop, Grid3x3, Share2 } from '@/icons';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const CreatorSpecialties: React.FC = () => {
  const isMobile = useIsMobile();
  const specialties = [
    { icon: <Camera className="h-5 w-5" />, label: "Photography" },
    { icon: <Grid3x3 className="h-5 w-5" />, label: "3D Tours" },
    { icon: <Share2 className="h-5 w-5" />, label: "Drone Footage" },
    { icon: <Video className="h-5 w-5" />, label: "Video Tours" },
    { icon: <Laptop className="h-5 w-5" />, label: "Virtual Staging" },
    { icon: <Compass className="h-5 w-5" />, label: "Floor Plans" },
  ];
  
  return (
    <div className={cn(
      "w-full py-2 sm:py-4 px-2",
      isMobile ? 
        "overflow-x-auto scrollbar-hide flex flex-nowrap px-4 pb-4 gap-2 snap-x snap-mandatory" : 
        "flex flex-wrap justify-center gap-3 sm:gap-4"
    )}>
      {specialties.map((specialty, index) => (
        <div 
          key={index}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm",
            "border border-purple-100 text-xs sm:text-sm text-gray-700 font-medium",
            "hover:bg-purple-50/90 hover:border-purple-200 transition-all duration-200",
            isMobile && "snap-center flex-shrink-0"
          )}
        >
          <span className="text-purple-500">{specialty.icon}</span>
          <span>{specialty.label}</span>
        </div>
      ))}
    </div>
  );
};
