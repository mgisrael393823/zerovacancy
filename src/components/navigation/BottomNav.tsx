
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { mobileOptimizationClasses } from '@/utils/mobile-optimization';
import { GlowDialog } from '@/components/ui/glow-dialog';

interface NavItemProps {
  icon: 'home' | 'search' | 'message' | 'user';
  label: string;
  to?: string;
}

const NavItem = ({ icon, label, to = '/' }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const IconComponent = {
    home: Home,
    search: Search,
    message: MessageSquare,
    user: User
  }[icon];

  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-3",
        "touch-manipulation select-none active:scale-95",
        "transition-all duration-200 rounded-lg",
        isActive 
          ? "text-white bg-gradient-to-r from-brand-purple to-brand-purple-medium" 
          : "text-brand-purple-dark hover:bg-purple-50"
      )}
    >
      <IconComponent className={cn(
        "w-5 h-5",
        isActive ? "text-white" : "text-brand-purple"
      )} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
};

export const BottomNav = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { gradientBgMobile, improvedShadowMobile } = mobileOptimizationClasses;
  
  // Explicitly hide on index route
  if (!isMobile || location.pathname === "/" || location.pathname === "") return null;
  
  const [showGlowDialog, setShowGlowDialog] = useState(false);

  return (
    <>
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t border-purple-100 ${improvedShadowMobile} ${gradientBgMobile} rounded-t-xl`}>
        <div className="flex items-center justify-around w-full mx-auto h-16 px-2">
          <NavItem icon="home" label="Home" to="/" />
          
          {/* Use <a> with onClick handler for waitlist registration instead */}
          <a 
            href="#"
            className="flex flex-col items-center gap-1 py-2 px-3 touch-manipulation select-none active:scale-95 transition-all duration-200 rounded-lg text-brand-purple-dark hover:bg-purple-50"
            onClick={(e) => {
              e.preventDefault();
              setShowGlowDialog(true);
            }}
          >
            <Search className="w-5 h-5 text-brand-purple" />
            <span className="text-[10px] font-medium">
              Discover
              <span className="text-[8px] ml-0.5 opacity-75">Soon</span>
            </span>
          </a>
          
          <a 
            href="#"
            className="flex flex-col items-center gap-1 py-2 px-3 touch-manipulation select-none active:scale-95 transition-all duration-200 rounded-lg text-brand-purple-dark hover:bg-purple-50"
            onClick={(e) => {
              e.preventDefault();
              setShowGlowDialog(true);
            }}
          >
            <MessageSquare className="w-5 h-5 text-brand-purple" />
            <span className="text-[10px] font-medium">
              Messages
              <span className="text-[8px] ml-0.5 opacity-75">Soon</span>
            </span>
          </a>
          
          <a 
            href="#"
            className="flex flex-col items-center gap-1 py-2 px-3 touch-manipulation select-none active:scale-95 transition-all duration-200 rounded-lg text-brand-purple-dark hover:bg-purple-50"
            onClick={(e) => {
              e.preventDefault();
              setShowGlowDialog(true);
            }}
          >
            <User className="w-5 h-5 text-brand-purple" />
            <span className="text-[10px] font-medium">
              Profile
              <span className="text-[8px] ml-0.5 opacity-75">Soon</span>
            </span>
          </a>
        </div>
      </nav>
      
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </>
  );
};
