
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
  id?: string;
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.18 + Math.random() * 0.22, // Increased opacity range
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03
  };
}

export function BeamsBackground({
  className,
  children,
  intensity = "medium",
  id
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;
  const opacityMap = {
    subtle: 0.8, // Increased from 0.7
    medium: 0.95, // Increased from 0.85
    strong: 1.0
  };
  
  // Run basic beams on mobile too, just fewer of them
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const isMobile = window.innerWidth < 768;
    
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      const totalBeams = isMobile ? MINIMUM_BEAMS * 0.75 : MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({
        length: Math.floor(totalBeams)
      }, () => createBeam(canvas.width, canvas.height));
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    
    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;
      const column = index % 3;
      const spacing = canvas.width / 3;
      beam.y = canvas.height + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + index * 70 / totalBeams;
      beam.opacity = 0.25 + Math.random() * 0.15; // Increased opacity
      return beam;
    }
    
    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate(beam.angle * Math.PI / 180);

      // Calculate pulsing opacity - increased base opacity
      const pulsingOpacity = beam.opacity * (0.9 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      // Enhanced gradient with multiple color stops - increased opacity values
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0.1)`); // Start with some opacity
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.6})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 1.2})`); // Enhanced midpoint
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 1.2})`); // Enhanced midpoint
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.6})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0.1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }
    
    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reduced blur on mobile for better performance but still visible
      ctx.filter = isMobile ? "blur(25px)" : "blur(35px)";
      
      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }
        drawBeam(ctx, beam);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity]);

  return (
    <div id={id}
      className={cn("relative overflow-hidden bg-white", className)}>
      {/* Show canvas on both mobile and desktop */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{
        filter: "blur(15px)"
      }} />

      {/* Add motion div with increased opacity */}
      <motion.div
        animate={{
          opacity: [0.85, 0.95, 0.85] // Increased from [0.8, 0.9, 0.8]
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY
        }}
        style={{
          backdropFilter: "blur(15px)"
        }}
        className="absolute inset-0 bg-[#e6e3ff]/25" /> {/* Increased from /15 */}

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default BeamsBackground;
