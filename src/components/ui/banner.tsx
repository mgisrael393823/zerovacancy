
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Star, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const bannerVariants = cva(
  "relative w-full flex items-center justify-between gap-2 overflow-hidden px-3 py-2.5 sm:px-6 sm:py-3", 
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
        purple: "bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 text-white"
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg"
      },
      layout: {
        simple: "justify-center text-center",
        complex: "justify-between items-center"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      layout: "simple"
    }
  }
);

interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}

export function Banner({
  className,
  variant,
  size,
  layout,
  icon,
  action,
  isClosable,
  onClose,
  children,
  ...props
}: BannerProps) {
  return (
    <div 
      className={cn(
        bannerVariants({ variant, size, layout }), 
        "min-h-[3rem] sm:min-h-[3.5rem]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        "relative z-50",
        className
      )} 
      {...props}
    >
      {/* Enhanced pattern overlay for visual interest */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] z-0"></div>
      
      <div className="
        flex items-center justify-center gap-4 sm:gap-6 flex-1
        flex-nowrap
        px-2 sm:px-4
        relative z-10
      ">
        <div className="flex items-center gap-3 justify-center text-center">
          {children}
        </div>

        {icon && (
          <span className="flex-shrink-0 animate-pulse">
            {icon}
          </span>
        )}

        {action && (
          <div className="flex-shrink-0">
            <div className="scale-95 sm:scale-100 transform hover:scale-105 transition-all duration-300">
              {action}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
