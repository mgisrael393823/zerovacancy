
import React from 'react';
import SmallFeatureCard from './SmallFeatureCard';
import { steps } from './step-data';

interface MobileStepsGridSimpleProps {
  completedSteps?: number[];
  activeStep?: number;
  onStepInteraction?: (index: number) => void;
}

const MobileStepsGridSimple: React.FC<MobileStepsGridSimpleProps> = () => {
  return (
    <div className="md:hidden w-full mb-4 block">
      {/* Simple grid layout for mobile with subtle gradient backgrounds */}
      <div className="grid grid-cols-1 gap-4 block">
        {steps.map((step, index) => (
          <SmallFeatureCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            gradientStyle={step.gradientStyle}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileStepsGridSimple;
