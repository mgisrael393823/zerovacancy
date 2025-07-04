
import { motion } from "framer-motion";
import { Star } from "@/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface FeatureHeaderProps {
  title: string;
  description: string;
}

export const FeatureHeader = ({
  title,
  description
}: FeatureHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="text-center mb-12 sm:mb-14 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "inline-block mb-3",
          isMobile && "relative before:content-[''] before:block before:w-10 before:h-1 before:bg-indigo-400 before:mb-3 before:rounded-full before:mx-auto"
        )}
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          <Star className="h-4 w-4 text-indigo-400 fill-indigo-100" />
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">Featured Services</span>
          <Star className="h-4 w-4 text-indigo-400 fill-indigo-100" />
        </div>
        <div className={cn(
          "h-1.5 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto", 
          isMobile ? "mb-4" : "mb-6",
          "animate-pulse-subtle"
        )} />
      </motion.div>
      
      <motion.h2 
        id="features-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 headingLarge", 
          isMobile ? "mb-3" : "mb-4 sm:mb-5",
          "font-jakarta tracking-tight"
        )}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed bodyText",
          isMobile && "px-4"
        )}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default FeatureHeader;
