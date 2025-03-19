
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react'; // Changed to shield/lock icon for security
import { Button3DPhysical } from './button-3d-physical';
import { WaitlistButton } from './waitlist/waitlist-button';
import { SocialProof } from './waitlist/social-proof';

interface WaitlistCTAProps {
  className?: string;
  source?: string;
  buttonText?: string;
  showSocialProof?: boolean;
  showEmailInputDirectly?: boolean;
  style?: {
    button?: React.CSSProperties;
    icon?: React.CSSProperties;
    iconContainer?: React.CSSProperties;
  };
}

export const WaitlistCTA: React.FC<WaitlistCTAProps> = ({ 
  className,
  source = "landing_page", 
  buttonText = "JOIN WAITLIST",
  showSocialProof = false,
  showEmailInputDirectly = false,
  style
}) => {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto", 
      className
    )}>
      <WaitlistButton 
        source={source}
        buttonText={buttonText}
        className="w-full py-4"
        showEmailInputDirectly={showEmailInputDirectly}
      >
        <Button3DPhysical 
          variant="white" // White variant with lighter styling
          size="lg"
          icon={<ShieldCheck 
            className="w-[20px] h-[20px] text-[#7837DB]" 
            style={{
              color: '#7837DB',
              stroke: '#7837DB',
              ...style?.icon
            }}
            data-container-style={JSON.stringify(style?.iconContainer)}
          />} // Purple shield icon
          iconPosition="left"
          className="w-full min-w-[320px] font-medium text-[#4e43ac]" // Text color set to match icon
          style={{
            // Default styling for the button
            height: '56px',
            background: 'rgba(134,65,245,0.02)', // Light background from icon container
            border: '1px solid rgba(0,0,0,0.08)', // Same subtle border as icon container
            boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.05), 0 16px 32px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)',
            // Apply any custom styles passed from parent
            ...style?.button
          }}
        >
          {buttonText}
        </Button3DPhysical>
      </WaitlistButton>
      
      {/* Only show social proof when explicitly requested */}
      {showSocialProof && <SocialProof className="mt-3" />}
    </div>
  );
};
