
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSectionGradient, getBackgroundPattern } from "@/utils/performance-optimizations";
import { useIsMobile } from "@/hooks/use-mobile";

export const BackgroundEffects = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Base gradient background optimized for desktop */}
      {!isMobile && (
        <>
          {/* Base gradient background */}
          <div className={cn("absolute inset-0", getSectionGradient(4))}></div>
          
          {/* Pattern overlay */}
          <div className={cn(
            "absolute inset-0",
            getBackgroundPattern('diagonal', 0.05)
          )}></div>
          
          {/* Single optimized blob with lighter blur for better performance */}
          <div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-100/30 rounded-full opacity-30"
            style={{
              filter: 'blur(80px)',
              transform: 'translateZ(0)'
            }}
          ></div>
        </>
      )}
      
      {/* Mobile-specific background effects remain unchanged */}
      {isMobile && (
        <>
          {/* Top-right purple blob */}
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-100/80 to-violet-100/70 rounded-full blur-3xl" 
          />
          
          {/* Middle-left blue blob */}
          <motion.div 
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="absolute top-1/2 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-100/70 to-indigo-100/60 rounded-full blur-3xl" 
          />
          
          {/* Bottom-right emerald blob */}
          <motion.div 
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            className="absolute -bottom-24 right-1/4 w-64 h-64 bg-gradient-to-tl from-emerald-100/60 to-teal-100/50 rounded-full blur-3xl" 
          />
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-slate-100/[0.05] bg-[size:20px_20px]"></div>
        </>
      )}
    </div>
  );
};
