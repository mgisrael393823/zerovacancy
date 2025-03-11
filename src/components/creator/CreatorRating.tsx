 import React, { useEffect, useState } from 'react';
  import { Star, Calendar, Clock, Crown } from 'lucide-react';
  import { cn } from '@/lib/utils';
  import { useIsMobile, useViewportSize } from '@/hooks/use-mobile';
  import type { AvailabilityStatus } from './types';

  interface CreatorRatingProps {
    rating: number;
    reviews?: number;
    name: string;
    availabilityStatus?: AvailabilityStatus;
  }

  export const CreatorRating: React.FC<CreatorRatingProps> = ({ 
    rating, 
    reviews = 0,
    name,
    availabilityStatus
  }) => {
    const isMobile = useIsMobile();
    const viewportSize = useViewportSize();
    const [isNarrowScreen, setIsNarrowScreen] = useState(false);

    useEffect(() => {
      setIsNarrowScreen(viewportSize.width < 350);
    }, [viewportSize.width]);

    const availabilityConfig = {
      'available-now': {
        text: 'Available Now',
        icon: <Calendar className="mr-1 text-emerald-500 w-3 h-3" />,
        className: 'border-green-100/50 text-emerald-700 availability-indicator'
      },
      'available-tomorrow': {
        text: 'Available Tomorrow',
        icon: <Clock className="mr-1 text-amber-500 w-3 h-3" />,
        className: 'border-amber-100/50 text-amber-700 tomorrow-status'
      },
      'premium-only': {
        text: 'Premium Only',
        icon: <Crown className="mr-1 text-purple-500 w-3 h-3" />,
        className: 'border-purple-100/50 text-purple-700 premium-status'
      }
    };

    const mobileText = {
      'available-now': 'Available',
      'available-tomorrow': 'Tomorrow',
      'premium-only': 'Premium'
    };

    return (
      <div className={cn(
        "flex items-center",
        isNarrowScreen ? "flex-col items-start gap-2" : "justify-between w-full"
      )}>
        {/* Rating styled similar to availability pill */}
        <div className={cn(
          "flex items-center justify-center",
          "bg-white backdrop-blur-[4px]",
          isNarrowScreen ? "px-1.5 py-0.5" : "px-2.5 py-1",
          "rounded-full whitespace-nowrap",
          isNarrowScreen ? "text-[10px]" : "text-xs",
          "font-medium",
          "border border-yellow-100/50",
          "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          "text-yellow-700"
        )}>
          <Star className="mr-1 text-yellow-400 fill-yellow-400 w-3 h-3" />
          <span>
            {rating.toFixed(1)}
            {reviews > 0 && <span className="text-gray-500 ml-1">({reviews})</span>}
          </span>
        </div>

        {/* Availability Indicator */}
        {availabilityStatus && availabilityConfig[availabilityStatus] && (
          <div className={cn(
            "flex items-center justify-center",
            "bg-white backdrop-blur-[4px]",
            isNarrowScreen ? "px-1.5 py-0.5" : "px-2.5 py-1",
            !isNarrowScreen && "ml-1",
            "rounded-full whitespace-nowrap",
            isNarrowScreen ? "text-[10px]" : "text-xs",
            "font-medium",
            "border",
            "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
            availabilityConfig[availabilityStatus].className
          )}>
            {availabilityConfig[availabilityStatus].icon}
            <span className={cn(
              "truncate",
              isNarrowScreen ? "max-w-[60px]" : "max-w-[90px]"
            )}>
              {isNarrowScreen
                ? mobileText[availabilityStatus]
                : availabilityConfig[availabilityStatus].text}
            </span>
          </div>
        )}
      </div>
    );
  };
