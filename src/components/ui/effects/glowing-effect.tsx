"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";
import { prefersReducedMotion } from "@/lib/mobile";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  optimized?: boolean;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
    optimized = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [angle, setAngle] = useState(0);
    
    // Check if reduced motion is preferred
    const reducedMotion = prefersReducedMotion();
    
    // Determine whether to use optimized version
    const useOptimized = optimized || reducedMotion || isMobile;
    
    // Check if mobile on mount
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);
    
    // If on mobile or disabled, don't process any animations
    const effectivelyDisabled = disabled || (isMobile && !useOptimized);

    // Standard complex effect handler
    const handleStandardMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current || useOptimized || effectivelyDisabled) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration, useOptimized, effectivelyDisabled]
    );
    
    // Optimized effect handler
    const handleOptimizedMove = useCallback((e: MouseEvent) => {
      if (!containerRef.current || effectivelyDisabled || !useOptimized) return;
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Only activate if mouse is outside the inactive zone
        const distance = Math.sqrt(x * x + y * y);
        const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * inactiveZone;
        
        if (distance < inactiveRadius) {
          setIsActive(false);
          return;
        }
        
        // Check if mouse is near the element
        const isNear = 
          e.clientX > rect.left - proximity &&
          e.clientX < rect.left + rect.width + proximity &&
          e.clientY > rect.top - proximity &&
          e.clientY < rect.top + rect.height + proximity;
          
        setIsActive(isNear);
        
        if (isNear) {
          // Calculate angle for the gradient
          const angleRad = Math.atan2(y, x);
          const angleDeg = (angleRad * 180) / Math.PI + 90;
          setAngle(angleDeg);
        }
      });
    }, [inactiveZone, proximity, effectivelyDisabled, useOptimized]);

    // Choose the appropriate handler based on optimization setting
    const handleMove = useOptimized ? handleOptimizedMove : handleStandardMove;

    useEffect(() => {
      if (effectivelyDisabled) return;

      const handleScroll = () => {
        if (useOptimized) {
          setIsActive(false);
        } else {
          handleStandardMove();
        }
      };
      
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, handleStandardMove, effectivelyDisabled, useOptimized]);

    // Render optimized version
    if (useOptimized) {
      return (
        <>
          <div
            className={cn(
              "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
              glow && "opacity-100",
              variant === "white" && "border-white",
              disabled && "!block"
            )}
          />
          <div
            ref={containerRef}
            style={{
              '--blur': `${blur}px`,
              '--spread': spread,
              '--angle': `${angle}deg`,
              '--active': isActive ? '1' : '0',
              '--border-width': `${borderWidth}px`,
            } as React.CSSProperties}
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
              glow && "opacity-100",
              blur > 0 && "blur-[var(--blur)]",
              "overflow-hidden",
              className,
              disabled && "!hidden"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-[inherit]",
                'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--border-width))]',
                "after:border-[length:var(--border-width)] after:border-transparent",
                variant === "white" 
                  ? "after:bg-white" 
                  : "after:bg-gradient-to-r after:from-[#dd7bbb] after:via-[#d79f1e] after:to-[#4c7894]",
                "after:opacity-0 after:transition-opacity after:duration-300",
                "after:opacity-[var(--active)]",
                isActive && "after:animate-rotate-gradient"
              )}
            />
          </div>
        </>
      );
    }

    // Render standard complex version
    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block",
            isMobile && "hidden" // Hide on mobile
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden",
            isMobile && "hidden" // Hide on mobile
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
export default GlowingEffect;