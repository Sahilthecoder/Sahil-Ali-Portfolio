'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

interface TechnologiesUsedProps {
  technologies: string[];
  className?: string;
  title?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.07 }
  }),
};

export const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({
  technologies,
  className = '',
  title = 'Technologies Used',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 15,
    staggerDelay: 0.07,
    initialDelay: 0.15,
  });

  if (!technologies || technologies.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={`mt-6 ${className}`}
    >
      {/* Section Title */}
      <motion.h4
        variants={itemVariants}
        custom={0}
        className="text-lg sm:text-xl font-semibold text-foreground mb-3 flex items-center"
      >
        <FiCode className="mr-2 text-primary-500 flex-shrink-0" />
        {title}
      </motion.h4>

      {/* Badge List */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-2"
      >
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            variants={itemVariants}
            custom={index + 1}
            className="inline-flex items-center rounded-full bg-muted/70 px-3 py-1.5 text-sm font-medium text-foreground border border-border hover:bg-muted/90 transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TechnologiesUsed;
