
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck } from '@/icons'; // Changed to shield/lock icon for security
import { Button3DPhysical } from './button-3d-physical';
import { WaitlistButton } from './waitlist/waitlist-button';
import { SocialProof } from './waitlist/social-proof';
import { buttonColors, shadowStyles } from '@/styles/button-style-guide';
import { useIsMobile } from '@/hooks/use-mobile';
import { GlowDialog } from './glow-dialog';

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
  const isMobile = useIsMobile();
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle button click directly for mobile to show the glow dialog
  const handleButtonClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setShowGlowDialog(true);
    }
  };

  return (
    <div className={cn(
      "w-full max-w-md mx-auto", 
      className
    )}>
      {/* For mobile, we'll handle the click directly on the Button3DPhysical */}
      {isMobile ? (
        <>
          <Button3DPhysical 
            ref={buttonRef}
            variant="primaryCta" // Using the enhanced primary CTA variant
            size="lg"
            icon={<ShieldCheck 
              className="w-[20px] h-[20px]"
              style={{
                color: buttonColors.primaryCta.text,
                stroke: buttonColors.primaryCta.text,
                ...style?.icon
              }}
              data-container-style={JSON.stringify(style?.iconContainer)}
            />}
            iconPosition="left"
            className="w-full min-w-[320px] font-semibold tracking-[0.02em]"
            style={{
              // Apply the enhanced styling for the primary CTA button
              height: '56px',
              background: buttonColors.primaryCta.gradient,
              border: `1.5px solid ${buttonColors.primaryCta.border}`,
              boxShadow: `${shadowStyles.primaryCTA}, inset 0 1px 0 ${buttonColors.primaryCta.highlightTop}, inset 0 -1px 0 ${buttonColors.primaryCta.highlightBottom}`,
              color: buttonColors.primaryCta.text,
              transition: 'all 0.3s ease-out',
              // Interactive elements
              cursor: 'pointer',
              // Enhanced hover state will be applied via CSS class in the Button3DPhysical component
              transform: 'translate3d(0, 0, 0)', // Ensure hardware acceleration
              // Apply any custom styles passed from parent
              ...style?.button
            }}
            // Add additional properties that pass the enhanced shadows to the component
            data-hover-box-shadow={shadowStyles.primaryCTAHover}
            data-hover-transform="scale(1.02)" 
            data-hover-transition="all 0.3s ease-out"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button3DPhysical>

          {/* GlowDialog that will be shown on mobile */}
          <GlowDialog
            open={showGlowDialog}
            onOpenChange={setShowGlowDialog}
          />
        </>
      ) : (
        // For desktop, use the original WaitlistButton implementation
        <WaitlistButton 
          source={source}
          buttonText={buttonText}
          className="w-full py-4"
          showEmailInputDirectly={showEmailInputDirectly}
        >
          <Button3DPhysical 
            variant="primaryCta" // Using the enhanced primary CTA variant
            size="lg"
            icon={<ShieldCheck 
              className="w-[20px] h-[20px]"
              style={{
                color: buttonColors.primaryCta.text,
                stroke: buttonColors.primaryCta.text,
                ...style?.icon
              }}
              data-container-style={JSON.stringify({
                // Add rounded rectangle border with subtle white outline
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)',
                ...style?.iconContainer
              })}
            />}
            iconPosition="left"
            className="w-full min-w-[320px] font-semibold tracking-[0.02em]"
            style={{
              // Apply styling to match 3D reference precisely
              height: '64px',  // Taller button as specified
              background: buttonColors.primaryCta.gradient,
              border: 'none',  // No standard border - using outline in box-shadow
              borderRadius: '32px', // Pill shape as specified (half of height)
              boxShadow: shadowStyles.primaryCTA, // Using precise 3D shadow stack
              color: buttonColors.primaryCta.text,
              fontWeight: '600', // Slightly bolder text
              transition: 'all 0.15s ease-out', // Quicker transition for better click feel
              // Interactive elements
              cursor: 'pointer',
              // Enhanced hover state will be applied via CSS class in the Button3DPhysical component
              transform: 'translate3d(0, 0, 0)', // Ensure hardware acceleration
              // Apply any custom styles passed from parent
              ...style?.button
            }}
            // Add additional properties that pass the exact 3D reference-matching hover effect
            data-hover-box-shadow={shadowStyles.primaryCTAHover}
            data-hover-transform="translateY(-2px)" // Slightly more lift for 3D effect
            data-hover-transition="all 0.15s ease-out"
            data-active-transform="translateY(2px)" // Click animation - push down
            data-active-box-shadow="0px 2px 0px rgba(0,0,0,0.3), 0px 4px 10px rgba(0,0,0,0.1), inset 0px -2px 0px rgba(0,0,0,0.25), inset 0px 1px 2px rgba(0,0,0,0.1), inset 0 2px 1px -1px rgba(255,255,255,0.4)"
          >
            {buttonText}
          </Button3DPhysical>
        </WaitlistButton>
      )}
      
      {/* Only show social proof when explicitly requested */}
      {showSocialProof && <SocialProof className="mt-3" />}
    </div>
  );
};
