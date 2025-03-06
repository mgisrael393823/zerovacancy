
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SectionHeaderSimple from './SectionHeaderSimple';
import MobileStepsGridSimple from './MobileStepsGridSimple';
import DesktopStepsGridSimple from './DesktopStepsGridSimple';

const OptimizedHowItWorks: React.FC = () => {
  const isMobile = useIsMobile();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('howItWorksProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  // Add intersection observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('how-it-works-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Handle step interaction
  const handleStepInteraction = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div 
      id="how-it-works-section" 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-indigo-50/40 via-purple-50/30 to-gray-50/80 border-t border-b border-gray-100"
    >
      <div className={`max-w-6xl mx-auto relative transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-6 sm:mb-12 lg:mb-16">
          <SectionHeaderSimple 
            title="How It Works" 
            subtitle="Your journey to amazing content in four simple steps"
          />
        </div>
        
        {/* Mobile steps layout */}
        <MobileStepsGridSimple 
          completedSteps={completedSteps} 
          activeStep={activeStep}
          onStepInteraction={handleStepInteraction}
        />
        
        {/* Desktop grid layout */}
        <DesktopStepsGridSimple 
          completedSteps={completedSteps} 
          activeStep={activeStep}
          onStepInteraction={handleStepInteraction}
        />
        
        {/* Section divider for better visual separation */}
        <div className="w-full h-px bg-gray-200/70 my-8 md:my-12 opacity-70"></div>
      </div>
    </div>
  );
};

export default OptimizedHowItWorks;
