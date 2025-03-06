
import React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreatorTagsProps {
  tags: string[];
}

export const getDefaultTags = (name: string, services: string[]) => {
  if (name === 'John Smith' && services.includes('Photography')) {
    return ['#RealEstate', '#Aerial', '#IndoorDroneTour'];
  }
  if (name === 'Jane Cooper') {
    return ['#Interior', '#Design', '#Staging'];
  }
  if (name === 'Emily Johnson') {
    return ['#POV', '#TikTok', '#ComeTourWithMe'];
  }
  if (name === 'Michael Brown') {
    return ['#3DTours', '#FloorPlans', '#Interactive'];
  }
  return ['#Professional', '#Creative', '#Expert'];
};

export const getTagStyle = (tag: string) => {
  if (['#RealEstate', '#Aerial', '#IndoorDroneTour'].includes(tag)) {
    return "bg-[#E5DEFF]/90 text-[#4E387C] hover:bg-[#D6BCFA] hover:text-[#3730A3] border border-[#4F46E5]/20";
  }
  if (['#Interior', '#Design', '#Staging'].includes(tag)) {
    return "bg-[#F2FCE2]/90 text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31] border border-[#3B823E]/20";
  }
  if (['#POV', '#TikTok', '#ComeTourWithMe'].includes(tag)) {
    return "bg-[#FDE1D3]/90 text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F] border border-[#C4704F]/20";
  }
  if (['#3DTours', '#FloorPlans', '#Interactive'].includes(tag)) {
    return "bg-[#E0F2FE]/90 text-[#0284C7] hover:bg-[#BAE6FD] hover:text-[#0284C7] border border-[#0EA5E9]/20";
  }
  return "bg-[#F3F4F6]/90 text-[#4B5563] hover:bg-gray-200 hover:text-gray-800 border border-gray-300/50";
};

// Helper function to determine if a tag should have an icon
const shouldHaveIcon = (tag: string): boolean => {
  return ['#POV', '#RealEstate', '#3DTours', '#Staging'].includes(tag);
};

export const CreatorTags: React.FC<CreatorTagsProps> = ({ tags }) => {
  const isMobile = useIsMobile();
  
  // For mobile, limit visible tags to first 3
  const visibleTags = isMobile ? tags.slice(0, 3) : tags;
  const hasMoreTags = isMobile && tags.length > 3;
  
  return (
    <div 
      className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      role="list"
      aria-label="Creator specialties"
    >
      <div className="flex flex-wrap gap-2.5 sm:gap-2.5">
        {visibleTags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              isMobile ? "text-sm px-3.5 py-2.5" : "text-[10px] sm:text-xs px-2.5 py-1.5", // Much larger tags on mobile
              "rounded-full",
              "transition-all duration-200 whitespace-nowrap",
              "hover:scale-105 cursor-pointer shadow-sm hover:shadow-md",
              "flex items-center gap-1.5",
              getTagStyle(tag)
            )}
            role="listitem"
          >
            {shouldHaveIcon(tag) && (
              <Tag className={cn(
                isMobile ? "w-3.5 h-3.5" : "w-3 h-3" // Larger icon on mobile
              )} aria-hidden="true" />
            )}
            {tag}
          </span>
        ))}
        
        {/* Indicator for more tags */}
        {hasMoreTags && (
          <span
            className={cn(
              "text-sm px-3.5 py-2.5", // Match other tag styles
              "rounded-full",
              "transition-all duration-200 whitespace-nowrap",
              "hover:scale-105 cursor-pointer",
              "flex items-center gap-1.5",
              "bg-gray-100 text-gray-500 hover:bg-gray-200"
            )}
          >
            +{tags.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};
