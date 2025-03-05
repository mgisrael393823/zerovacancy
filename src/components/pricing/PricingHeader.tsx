
import { motion } from "framer-motion";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => {
  return (
    <motion.div 
      className="text-center mb-10 sm:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-brand-purple-dark font-jakarta">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-brand-text-primary max-w-2xl mx-auto font-inter">
        {subtitle}
      </p>
    </motion.div>
  );
};
