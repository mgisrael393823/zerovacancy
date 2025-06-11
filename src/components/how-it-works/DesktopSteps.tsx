
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from '@/icons';
import { cn } from '@/lib/utils';
import { Step, StepStyle } from './stepsUtils';
import { ConnectingLines } from './ConnectingLines';

interface DesktopStepsProps {
  steps: Step[];
  completedSteps: number[];
  stepColors: StepStyle[];
  activeStep: number | null;
  onStepClick: (index: number) => void;
}

export const DesktopSteps: React.FC<DesktopStepsProps> = ({ 
  steps, 
  completedSteps, 
  stepColors,
  activeStep,
  onStepClick
}) => {
  return (
    <div className="hidden md:block w-full mx-auto relative">
      {/* Connecting lines between steps */}
      <ConnectingLines />
      
      {/* Grid container */}
      <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 relative">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                duration: 1.0,
                delay: index * 0.2,
                stiffness: 50
              }
            }}
            animate={{
              scale: activeStep === index ? 1.05 : 1,
              boxShadow: activeStep === index 
                ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderWidth: activeStep === index ? "2px" : "1px",
              borderColor: activeStep === index ? stepColors[index].borderColor.replace("border-", "") : "rgb(243, 244, 246)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
              transition: {
                duration: 0.3
              }
            }}
            whileTap={{
              scale: 0.98
            }}
            viewport={{
              once: true,
              margin: "-50px"
            }}
            onClick={() => onStepClick(index)}
            className={cn(
              "relative h-full",
              stepColors[index].gradient,
              "min-h-[220px]", // Standardized card height
              "px-6 py-8",
              "rounded-xl",
              "transition-all duration-300",
              "group cursor-pointer",
              "border border-gray-100",
              activeStep === index ? `${stepColors[index].borderColor} ${stepColors[index].tintBg} shadow-lg` : "",
              "active:scale-[0.98]",
              "touch-manipulation",
              "shadow-md hover:shadow-xl",
              "flex flex-col items-center justify-start"
            )}
            aria-label={`Step ${index + 1}: ${step.title}`}
          >
            {/* Step Number badge */}
            <div 
              className={cn(
                "absolute -top-3 left-6",
                "z-10"
              )}
            >
              <motion.span 
                className={cn(
                  "inline-flex items-center justify-center",
                  "w-8 h-8",
                  stepColors[index].numBg, 
                  stepColors[index].numText,
                  "rounded-full",
                  "text-sm font-medium",
                  "ring-4 ring-white",
                  "shadow-sm"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    delay: index * 0.2 + 0.3,
                    duration: 0.5
                  }
                }}
                animate={{
                  scale: activeStep === index ? 1.1 : 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                viewport={{ once: true }}
              >
                {step.number}
                
                {/* Completed checkmark */}
                {completedSteps.includes(index) && (
                  <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                )}
              </motion.span>
            </div>
            
            {/* Icon with enhanced colorful background and animations */}
            <motion.div 
              className={cn(
                "mb-5",
                stepColors[index].iconBg, 
                stepColors[index].iconText,
                "transition-all duration-300",
                "rounded-xl p-4",
                "group-hover:saturate-150",
                "group-hover:scale-110", 
                "shadow-sm group-hover:shadow-md"
              )}
              initial={{ rotateY: 0 }}
              whileHover={{
                rotateY: 180,
                transition: { duration: 0.6 }
              }}
              animate={{
                scale: activeStep === index ? 1.15 : 1,
                rotate: activeStep === index ? [0, 5, 0, -5, 0] : 0,
                transition: {
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                  rotate: { 
                    repeat: activeStep === index ? 1 : 0, 
                    duration: 0.5, 
                    ease: "easeInOut" 
                  }
                }
              }}
            >
              {React.isValidElement(step.icon) ? step.icon : <div className="w-7 h-7" />}
            </motion.div>
            
            {/* Title with motion */}
            <motion.h4 
              className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1"
              initial={{ opacity: 0.8 }}
              whileInView={{ 
                opacity: 1,
                transition: { delay: index * 0.1 + 0.5 }
              }}
              animate={{
                scale: activeStep === index ? 1.05 : 1,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
            >
              {step.title}
            </motion.h4>
            
            {/* Description with staggered animation */}
            <motion.p 
              className="text-sm text-gray-600 leading-relaxed text-center"
              initial={{ opacity: 0.6 }}
              whileInView={{ 
                opacity: 1,
                transition: { delay: index * 0.1 + 0.7 }
              }}
              viewport={{ once: true }}
            >
              {step.description}
            </motion.p>
            
            {/* Subtle visual indicator of clickability */}
            <div className={cn(
              "absolute bottom-3 right-3 w-6 h-6",
              "flex items-center justify-center",
              "rounded-full",
              "opacity-0 group-hover:opacity-70",
              activeStep === index ? "opacity-90" : "",
              "transition-opacity duration-300",
              stepColors[index].numBg
            )}>
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
