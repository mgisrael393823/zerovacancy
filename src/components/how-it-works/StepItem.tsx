
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BadgeCheck, Sparkles } from '@/icons';

export interface StepColor {
  iconBg: string;
  iconText: string;
  numBg: string;
  numText: string;
  lineColor: string;
  borderColor: string;
  glowColor: string;
  tintBg: string;
}

export interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  index: number;
  stepColor: StepColor;
  isCompleted?: boolean;
}

export const StepItem: React.FC<StepProps> = ({
  icon,
  title,
  description,
  number,
  index,
  stepColor,
  isCompleted = false,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          duration: 0.8,
          delay: index * 0.2
        }
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: {
          duration: 0.2
        }
      }}
      whileTap={{
        scale: 0.98
      }}
      viewport={{
        once: true,
        margin: "-50px"
      }}
      className={cn(
        "relative bg-white",
        "min-h-[220px]", // Standardized card height
        "px-6 py-8",
        "rounded-xl",
        "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        "group",
        "border border-gray-100",
        "active:scale-[0.98]",
        "touch-manipulation",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
        "flex flex-col items-center",
        isHovered ? `ring-1 ${stepColor.borderColor}` : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      {...rest}
    >
      <div className="flex flex-col items-center justify-start h-full relative w-full">
        {/* Glow effect background */}
        <motion.div 
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-700",
            stepColor.tintBg
          )}
          animate={{ 
            opacity: isHovered ? 0.08 : 0 
          }}
        />
        
        {/* Step Number with pulsing effect */}
        <div className="absolute -left-[3.25rem] top-0 h-full hidden lg:block" aria-hidden="true">
          <motion.span 
            className={cn(
              "absolute -top-2 left-0",
              "w-8 h-8",
              stepColor.numBg,
              stepColor.numText,
              "rounded-full",
              "flex items-center justify-center",
              "text-sm font-medium",
              "ring-4 ring-white",
              "z-10"
            )} 
            initial={{
              scale: 0.8,
              opacity: 0
            }} 
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                delay: index * 0.2 + 0.3,
                duration: 0.5
              }
            }}
            animate={isHovered ? {
              scale: [1, 1.1, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }
            } : {}}
            viewport={{
              once: true
            }}
          >
            {isCompleted ? (
              <BadgeCheck className="w-4 h-4" />
            ) : (
              number
            )}
          </motion.span>
          
          {/* Vertical connecting line for all steps with shorter length */}
          <motion.div 
            className={cn(
              "absolute top-7 left-[0.875rem] w-[2px]",
              `h-[calc(50%)] ${stepColor.lineColor} bg-gradient-to-b opacity-70`
            )}
            initial={{
              scaleY: 0
            }} 
            whileInView={{
              scaleY: 1,
              transition: {
                delay: index * 0.2 + 0.4,
                duration: 0.5
              }
            }} 
            viewport={{
              once: true
            }} 
          />
        </div>
        
        {/* Icon with enhanced colorful background and animation */}
        <motion.div 
          className={cn(
            "mb-5",
            stepColor.iconBg,
            stepColor.iconText,
            "transition-all duration-300",
            "rounded-xl p-4",
            "group-hover:saturate-150",
            "relative",
            "overflow-hidden"
          )} 
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, 0, -5, 0],
            transition: {
              rotate: {
                duration: 0.5,
                ease: "easeInOut"
              }
            }
          }} 
          whileTap={{
            scale: 0.95
          }}
        >
          {/* Enhanced background animation */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)]" 
            animate={{
              opacity: isHovered ? 0.7 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{
              duration: 0.7
            }}
          />
          
          {/* Sparkle effect on hover */}
          {isHovered && (
            <motion.div 
              className="absolute top-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Sparkles size={12} className="text-white/80" />
            </motion.div>
          )}
          
          {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7 relative z-10" })}
        </motion.div>
        
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 text-center line-clamp-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed text-center">
          {description}
        </p>
        
        {/* Enhanced glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
          <div className={`absolute inset-0 ${stepColor.glowColor} blur-xl opacity-30 scale-90 rounded-xl`}></div>
        </div>
      </div>
    </motion.div>
  );
};
