
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from '@/types/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DesktopNavigationProps = {
  menuItems: MenuItem[];
  onPrelaunchLinkClick?: () => void;
};

const DesktopNavigation = ({ menuItems, onPrelaunchLinkClick }: DesktopNavigationProps) => {
  // Get current section from hash or default to home
  const [activeSection, setActiveSection] = React.useState("");
  
  // Update active section based on URL hash
  React.useEffect(() => {
    const updateActiveSection = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSection(hash || 'hero');
      
      // Also check scroll position for sections
      const sections = ['find-creators', 'how-it-works', 'features', 'pricing', 'blog'];
      
      // Find which section is currently in view
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };
    
    // Listen for the custom event from the intersection observer
    const handleSectionVisible = (event: any) => {
      if (event.detail && event.detail.section) {
        setActiveSection(event.detail.section);
      }
    };
    
    // Update on load
    updateActiveSection();
    
    // Update on scroll (throttled to improve performance)
    let lastScrollTime = 0;
    const scrollHandler = () => {
      const now = Date.now();
      if (now - lastScrollTime > 100) { // Only update every 100ms
        lastScrollTime = now;
        updateActiveSection();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Update on hash change
    window.addEventListener('hashchange', updateActiveSection);
    
    // Listen for the custom section visibility event
    document.addEventListener('sectionVisible', handleSectionVisible);
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('hashchange', updateActiveSection);
      document.removeEventListener('sectionVisible', handleSectionVisible);
    };
  }, []);
  
  return (
    <nav className="hidden md:flex items-center justify-center flex-1 mx-auto">
      <div className="flex items-center space-x-4">
        {menuItems.map((item) => {
          if (item.children) {
            return (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900">
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.label}>
                      <Link
                        to={child.href}
                        target={child.isExternal ? '_blank' : undefined}
                        rel={child.isExternal ? 'noopener noreferrer' : undefined}
                        className="w-full"
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          // If it's a hash link to a section on the homepage
          if (item.href.startsWith('/#')) {
            // Extract section name from href
            const sectionFromHref = item.href.replace('/#', '');
            const isActive = activeSection === sectionFromHref;
            
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 relative ${
                  isActive ? 'active-nav-item text-purple-700 font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            );
          } else {
            // For links to non-existent pages, trigger waitlist dialog instead
            return (
              <button
                key={item.label}
                onClick={onPrelaunchLinkClick}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 relative group"
              >
                {item.label}
                {/* "Coming Soon" tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                  Coming Soon
                </div>
              </button>
            );
          }
        })}
      </div>
    </nav>
  );
};

export default DesktopNavigation;
