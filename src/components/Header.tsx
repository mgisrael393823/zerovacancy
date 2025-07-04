import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, X, Menu } from '@/icons';
import AuthForms from '@/components/auth/AuthForms';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from '@/styles/header.module.css';

// Helper function for smooth scrolling
const handleNavClick = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Resources dropdown component using the built-in DropdownMenu component
const ResourcesDropdown = ({ className, onClick }: { className?: string, onClick?: () => void }) => {
  const location = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={cn(
            "text-[15px] font-medium transition-colors relative py-1.5 px-3",
            "header-nav-link flex items-center justify-center gap-1",
            "before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:scale-x-0 before:origin-right",
            "before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left",
            "before:bg-[#9b87f5]",
            location.pathname.startsWith('/blog')
              ? "text-[#9b87f5] before:scale-x-100"
              : "text-black hover:text-[#9b87f5]"
          )}
        >
          <span className="flex items-center justify-center">
            <span className="leading-none">Resources</span>
            <ChevronDown className="h-4 w-4 ml-1 transition-transform inline-flex flex-shrink-0" style={{ marginTop: '1px' }} />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40 mt-1 p-1">
        <div className="px-1 py-0.5">
          <a 
            href="/blog" 
            className={cn(
              "flex cursor-pointer w-full text-sm py-1.5 px-2 rounded hover:bg-gray-50",
              location.pathname.startsWith('/blog') ? "text-brand-purple font-medium" : "text-gray-700"
            )}
            onClick={(e) => {
              // Allow the default navigation behavior
              if (onClick) onClick();
            }}
          >
            Blog
          </a>
        </div>
        <DropdownMenuItem disabled className="opacity-60 cursor-not-allowed">
          <div className="flex items-center text-sm text-gray-500">
            Learning Center
            <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-1 py-0.5 rounded">Soon</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Navigation Links component
const NavLinks = ({ className, onClick }: { className?: string, onClick?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Don't use conditional logic based on props, create separate components
  const isInMobileView = className?.includes('flex-col') || false;
  
  return (
    <nav className={cn(styles.nav, className)}>
      {/* Navigation Links */}
      {[
        { to: "/#find-creators", label: "Find Creators", sectionId: "find-creators" },
        { to: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" },
        { to: "/#pricing", label: "Pricing", sectionId: "pricing" },
      ].map((link) => {
        // Always render a button, but with different classes based on view
        return (
          <button
            key={link.to}
            onClick={() => {
              if (location.pathname === '/') {
                handleNavClick(link.sectionId);
              } else {
                navigate(`/#${link.sectionId}`);
              }
              if (onClick) onClick();
            }}
            className={cn(
              isInMobileView
                ? styles.mobileNavItem
                : cn(
                    styles.navItem,
                    styles.navItemWithIndicator
                  ),
              location.pathname === link.to 
                ? styles.navItemActive
                : ""
            )}
          >
            {link.label}
          </button>
        );
      })}
      
      {/* Resources section */}
      {!isInMobileView ? (
        // Desktop version - dropdown
        <div className="ml-1">
          <ResourcesDropdown onClick={onClick} />
        </div>
      ) : (
        // Mobile version - resource links
        <div className="w-full">
          <a
            href="/blog"
            className={cn(
              styles.mobileNavItem,
              location.pathname.startsWith('/blog') ? styles.navItemActive : ""
            )}
            onClick={onClick}
          >
            Blog
          </a>
        </div>
      )}
    </nav>
  );
};

// Mobile Header Component
const MobileHeaderComponent = ({ 
  isOpen, 
  setIsOpen, 
  handleLogoInteraction, 
  openAuthDialog 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  handleLogoInteraction: (e: React.MouseEvent | React.TouchEvent) => void;
  openAuthDialog: (type: 'login' | 'register') => void;
}) => {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="flex justify-between items-center w-full h-16">
      {/* Logo with improved alignment */}
      <Link 
        to="/" 
        className={cn("flex items-center justify-center transition-opacity active:opacity-80", styles.logoContainer)}
        onClick={handleLogoInteraction}
        onTouchStart={handleLogoInteraction}
        style={{ 
          height: '100%', 
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img 
          src="/logo.png" srcSet="/logo.webp" type="image/webp"
          alt="ZeroVacancy"
          className="h-7 w-auto"
          style={{ display: 'block' }}
        />
      </Link>
      
      {/* Mobile menu button with rectangular styling */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn("bg-white", styles.mobileMenuButton)}
            aria-label="Open menu"
          >
            <div className="hamburger-icon">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
            <span className="menu-button-text">Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className={cn("flex flex-col pt-16 px-0 w-full max-w-[320px] bg-white", styles.mobileMenu)}>
          {/* Close button positioned in the top-right corner */}
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-9 w-9 rounded-full focus:outline-none relative hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Main navigation links - with improved styling */}
          <div className="w-full px-5 pb-4">
            {/* Primary navigation buttons */}
            <div className="flex flex-col space-y-3 mb-6 w-full">
              {[
                { to: "/#find-creators", label: "Find Creators", sectionId: "find-creators" },
                { to: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" },
                { to: "/#pricing", label: "Pricing", sectionId: "pricing" },
              ].map((link) => (
                <button
                  key={link.to}
                  onClick={() => {
                    if (location.pathname === '/') {
                      handleNavClick(link.sectionId);
                    } else {
                      navigate(`/#${link.sectionId}`);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full py-3 px-4 text-left text-[16px] font-medium rounded-md 
                    bg-brand-purple text-white hover:bg-brand-purple-dark transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            {/* Resources section */}
            <div className="mb-6 space-y-3">
              <h3 className="text-[16px] font-medium text-gray-800 mb-1">Resources</h3>
              <a
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 text-left text-[15px] font-medium rounded-md 
                  border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
              >
                <span>Visit Blog</span>
              </a>
              <div
                className="w-full py-2.5 px-4 text-left text-[15px] font-medium rounded-md 
                  border border-gray-200 flex items-center opacity-60 cursor-not-allowed"
              >
                <span className="text-gray-400">Learning Center</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Soon</span>
              </div>
            </div>
          </div>
          
          {/* Conditional Login/Signup or Dashboard buttons in the mobile menu */}
          <div className="mt-auto border-t border-gray-200 pt-4 px-5 pb-8">
            <h3 className="text-[16px] font-medium text-gray-800 mb-3">Account</h3>
            <div className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <Button 
                    variant="outline" 
                    className={cn("w-full justify-center text-[15px] h-11 border-gray-300 text-gray-700 font-medium", styles.mobileButton)}
                    onClick={() => {
                      openAuthDialog('login');
                      setIsOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className={cn("w-full justify-center text-[15px] h-11 bg-brand-purple hover:bg-brand-purple-dark font-medium", styles.mobileButton)}
                    onClick={() => {
                      openAuthDialog('register');
                      setIsOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className={cn("w-full justify-center text-[15px] h-11 bg-brand-purple text-white hover:bg-brand-purple-dark font-medium", styles.mobileButton)}
                    onClick={() => {
                      navigate('/dashboard');
                      setIsOpen(false);
                    }}
                  >
                    My Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className={cn("w-full justify-center text-[15px] h-11 border-gray-300 text-gray-700 font-medium", styles.mobileButton)}
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Desktop Header Component
const DesktopHeaderComponent = ({ 
  handleLogoInteraction, 
  openAuthDialog 
}: { 
  handleLogoInteraction: (e: React.MouseEvent | React.TouchEvent) => void;
  openAuthDialog: (type: 'login' | 'register') => void;
}) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center w-full h-[4.5rem]">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link 
          to="/" 
          className={cn("flex items-center transition-opacity active:opacity-80", styles.logoContainer)}
          onClick={handleLogoInteraction}
          onTouchStart={handleLogoInteraction}
        >
          <img 
            src="/logo.png" srcSet="/logo.webp" type="image/webp"
            alt="ZeroVacancy"
            className="h-7 w-auto"
          />
        </Link>
      </div>
      
      {/* Center navigation */}
      <div className="flex justify-center flex-grow">
        <NavLinks className="flex items-center" />
      </div>
      
      {/* Conditional Auth buttons or User menu */}
      {!isAuthenticated ? (
        <div className={cn("flex items-center gap-3", styles.buttonsContainer)}>
          <Button
            variant="outline"
            className={cn("text-[15px] border-gray-300 text-gray-700 font-medium", styles.buttonBase)}
            onClick={() => openAuthDialog('login')}
          >
            Log In
          </Button>
          <Button 
            className={cn("text-[15px] bg-brand-purple hover:bg-brand-purple-dark font-medium", 
                          styles.buttonBase, styles.buttonPrimary)}
            onClick={() => openAuthDialog('register')}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className={cn("flex items-center gap-3", styles.buttonsContainer)}>
          <Button 
            variant="outline"
            className={cn("text-[15px] bg-brand-purple text-white hover:bg-brand-purple-dark font-medium", 
                        styles.buttonBase)}
            onClick={() => navigate('/dashboard')}
          >
            My Dashboard
          </Button>
          <Button 
            variant="outline" 
            className={cn("text-[15px] border-gray-300 text-gray-700 font-medium", 
                        styles.buttonBase)}
            onClick={() => signOut()}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

// Main Header component
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Monitor screen size changes to determine if mobile view should be shown
  useEffect(() => {
    // Add media query based detection
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    
    // Initial check
    handleMediaChange(mediaQuery);
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } 
    // Fallback for older browsers
    else {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', checkScreenSize);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        window.removeEventListener('resize', 'checkScreenSize');
      }
    };
  }, []);

  // Detect scroll for header styling changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent scroll on mobile when menu is open
  useEffect(() => {
    if (isOpen) {
      // Store the current body overflow and position
      const originalStyle = {
        overflow: document.body.style.overflow,
      };
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore original body styles
        document.body.style.overflow = originalStyle.overflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle logo interaction
  const handleLogoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    // If we're already on the home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Prevent navigation to avoid page reload
      e.preventDefault();
    }
    // Otherwise, navigation occurs normally
  };

  // Use the openAuthDialog function from the auth context
  const { openAuthDialog } = useAuth();

  return (
    <header className={cn(styles.header, isScrolled && styles.headerScrolled)}>
      <div className={styles.container}>
        {isMobile ? (
          <MobileHeaderComponent 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleLogoInteraction={handleLogoInteraction}
            openAuthDialog={openAuthDialog}
          />
        ) : (
          <DesktopHeaderComponent 
            handleLogoInteraction={handleLogoInteraction}
            openAuthDialog={openAuthDialog}
          />
        )}
      </div>
    </header>
  );
}