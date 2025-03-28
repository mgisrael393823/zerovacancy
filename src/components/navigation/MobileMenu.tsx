
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types/navigation';
import { mobileOptimizationClasses } from '@/utils/mobile-optimization';
import { useAuth } from '@/components/auth/AuthContext';

type MobileMenuProps = {
  menuItems: MenuItem[];
  onClose: () => void;
};

const MobileMenu = ({ 
  menuItems, 
  onClose 
}: MobileMenuProps) => {
  const { gradientBgMobile, improvedShadowMobile, coloredBorderMobile } = mobileOptimizationClasses;
  const { isAuthenticated, user, signOut, openAuthDialog } = useAuth();
  const navigate = useNavigate();
  
  // Close menu on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop directly, not menu items
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-[199] bg-black/10 backdrop-blur-sm md:hidden touch-manipulation"
      style={{
        top: '56px', // Start below the header's height
        height: 'calc(100% - 56px)', // Full height minus header
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform, opacity', // Performance hint for browser
        WebkitOverflowScrolling: 'touch' // Ensure smooth scrolling on iOS
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`absolute top-0 left-0 right-0 mx-4 mt-2 pt-2 pb-4 space-y-1 rounded-xl
          ${gradientBgMobile} ${improvedShadowMobile} ${coloredBorderMobile}
          touch-manipulation transform-gpu animate-in fade-in slide-in-from-top duration-300
        `}
        style={{
          zIndex: 9998, // Just below the header z-index (9999)
          maxHeight: 'calc(100vh - 56px)', // Ensure it doesn't go beyond the viewport
          overflow: 'auto', // Allow scrolling if menu is tall
          WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on menu from closing
      >
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block px-4 py-4 text-base font-medium text-brand-purple-dark 
              hover:bg-purple-100 hover:text-brand-purple rounded-lg my-1 transition-colors
              active:bg-purple-200 touch-manipulation min-h-[50px]"
            onClick={(e) => {
              // If it's not a hash link to a section, prevent default and show waitlist
              if (!item.href.startsWith('/#')) {
                e.preventDefault();
                openAuthDialog();
              }
              onClose();
            }}
          >
            {item.label}
            {!item.href.startsWith('/#') && (
              <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-gray-100 text-gray-500 rounded">Soon</span>
            )}
          </a>
        ))}
        
        {/* Authentication options hidden until ready */}
      </div>
    </div>
  );
};

export default MobileMenu;
