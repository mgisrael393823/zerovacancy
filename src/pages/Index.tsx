import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/hero/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import OptimizedHowItWorks from '../components/how-it-works/OptimizedHowItWorks';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeaturesSectionWithHoverEffects } from '@/components/features/Features';
import Pricing from '@/components/Pricing';
import { Waves } from '@/components/ui/waves';
import PreviewSearch from '@/components/PreviewSearch';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

/**
 * Main landing page component with performance optimizations
 */
const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Initialize local storage and dialog state
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    setShowGlowDialog(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);
  
  // Use Intersection Observer to optimize rendering of sections
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
              // Don't disconnect - keep monitoring for scroll in/out
            } else {
              entry.target.classList.remove('content-visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );
      
      observer.observe(section);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  // Helper function to add section refs
  const addSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {showBanner && !isMobile && (
        <div className="relative">
          <Banner variant="purple" size="lg" action={<Button variant="secondary" size="sm" className={cn("flex text-xs sm:text-sm items-center whitespace-nowrap", "px-3 py-2 sm:px-5 sm:py-2.5 min-w-[8rem] sm:min-w-[9rem] min-h-[2.25rem] sm:min-h-[2.5rem]", "bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold", "border-2 border-amber-300", "transition-all duration-200", "touch-manipulation", "shadow-[0_2px_10px_rgba(0,0,0,0.15)]")} onClick={handleTryNowClick}>
                Get Early Access
              </Button>} layout="complex" isClosable onClose={() => setShowBanner(false)} className="animate-in fade-in slide-in-from-top duration-500 relative overflow-hidden min-h-[3.25rem] sm:min-h-[3.5rem] my-0 py-0">
            <div className="flex items-center justify-left gap-3 sm:gap-4 relative z-10">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300 animate-pulse" />
              <AnimatedShinyText className={cn("text-sm sm:text-base font-bold inline-block", "text-white relative z-10 rounded", "px-1 tracking-wide")} shimmerWidth={200}>
                Join the AI-powered revolution in property management!
              </AnimatedShinyText>
            </div>
          </Banner>
        </div>
      )}

      <main className="flex-1 pb-16 sm:pb-0 w-full">
        <BackgroundEffects 
          blobColors={{
            first: "bg-purple-100",
            second: "bg-indigo-100",
            third: "bg-violet-100"
          }}
          blobOpacity={0.15}
          withSpotlight={true}
          spotlightClassName="from-purple-500/5 via-violet-500/5 to-blue-500/5"
          baseColor="bg-white/80" 
          pattern="none"
          className="py-0"
          animationSpeed="slow"
        >
          <div className="space-y-0 w-full">
            {/* Hero Section */}
            <section ref={addSectionRef(0)} className="content-visible w-full">
              <Hero />
            </section>
            
            {/* How It Works Section */}
            <section ref={addSectionRef(1)} id="how-it-works" className="relative w-full content-hidden">
              <div className="relative z-10">
                <OptimizedHowItWorks />
              </div>
            </section>
            
            {/* Search Section */}
            <section ref={addSectionRef(2)} id="find-creators" className="relative w-full content-hidden">
              <div className="max-w-7xl mx-auto relative z-10 py-10 sm:py-16 lg:py-20">
                <PreviewSearch />
              </div>
            </section>
            
            {/* Professional Content Creation Services */}
            <section ref={addSectionRef(3)} className="w-full content-hidden">
              <FeaturesSectionWithHoverEffects />
            </section>

            {/* Pricing Section */}
            <section ref={addSectionRef(4)} className="w-full content-hidden">
              <Pricing />
            </section>

            {/* Final CTA Section */}
            <div ref={addSectionRef(5)} className="relative w-full content-hidden">
              <div className="relative z-10 max-w-7xl mx-auto py-14 sm:py-20 lg:py-24">
                <CallToActionSection />
              </div>
            </div>
          </div>
          
          <Footer />
        </BackgroundEffects>
      </main>
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};
export default Index;
