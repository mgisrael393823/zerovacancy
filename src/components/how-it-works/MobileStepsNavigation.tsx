
import React from 'react';
import { ChevronLeft, ChevronRight } from '@/icons';
import { cn } from '@/lib/utils';

interface MobileStepsNavigationProps {
  activeStep: number | null;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const MobileStepsNavigation: React.FC<MobileStepsNavigationProps> = ({
  activeStep,
  totalSteps,
  onPrevious,
  onNext
}) => {
  if (activeStep === null) return null;
  
  return (
    <div className="flex justify-between items-center px-2 mb-2 text-gray-500 text-sm">
      <button 
        onClick={onPrevious}
        className={cn(
          "flex items-center p-1 rounded-full",
          activeStep > 0 ? "text-violet-600 hover:bg-violet-50" : "text-gray-300 cursor-not-allowed"
        )}
        disabled={activeStep <= 0}
      >
        <ChevronLeft size={16} />
        <span className="sr-only">Previous</span>
      </button>
      
      <span className="text-xs">
        Step {activeStep + 1} of {totalSteps}
      </span>
      
      <button 
        onClick={onNext}
        className={cn(
          "flex items-center p-1 rounded-full",
          activeStep < totalSteps - 1 ? "text-violet-600 hover:bg-violet-50" : "text-gray-300 cursor-not-allowed"
        )}
        disabled={activeStep >= totalSteps - 1}
      >
        <ChevronRight size={16} />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};
