import { motion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FiCode } from 'react-icons/fi';
import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

interface TechnologiesUsedProps {
  technologies: string[];
  className?: string;
  title?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
};

export const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({
  technologies,
  className = '',
  title = 'Technologies Used',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  if (!technologies || technologies.length === 0) return null;

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} className={`mt-6 ${className}`}>
      <motion.h4
        variants={itemVariants}
        custom={0}
        className="text-lg font-semibold text-foreground mb-3 flex items-center"
      >
        <FiCode className="mr-2 text-primary-500" />
        {title}
      </motion.h4>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            variants={itemVariants}
            custom={index + 1}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TechnologiesUsed;
