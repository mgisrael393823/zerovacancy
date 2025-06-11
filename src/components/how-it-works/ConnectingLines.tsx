
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@/icons';

export const ConnectingLines: React.FC = () => {
  return (
    <div className="absolute top-16 left-0 w-full z-0 hidden lg:block pointer-events-none">
      {/* First connector line - violet to blue */}
      <motion.div 
        className="absolute top-8 left-[23%] w-[18%] h-0.5 bg-gradient-to-r from-violet-500 to-blue-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.3,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-blue-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.1 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Second connector line - blue to amber */}
      <motion.div 
        className="absolute top-8 left-[48%] w-[18%] h-0.5 bg-gradient-to-r from-blue-500 to-amber-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.6,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-amber-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.4 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
      
      {/* Third connector line - amber to emerald */}
      <motion.div 
        className="absolute top-8 left-[73%] w-[18%] h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ 
          scaleX: 1,
          transition: { 
            duration: 0.8, 
            delay: 0.9,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="absolute -right-3 -top-[7px] text-emerald-500"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: 1.7 }
          }}
          viewport={{ once: true }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </div>
  );
};
