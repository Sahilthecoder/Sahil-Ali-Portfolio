import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { cn } from '@/utils/cn';
import LazyImage from '@/components/LazyImage';
import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
  logo?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn(
        'bg-card text-card-foreground rounded border border-border shadow-sm',
        'transition-colors duration-200 hover:shadow-md',
        'overflow-hidden',
        className
      )}
    >
      <div className="p-6">
        <motion.header variants={itemVariants} custom={0} className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {experience.logo && (
              <div className="flex-shrink-0">
                <LazyImage
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold leading-tight">{experience.role}</h3>
              <p className="text-muted-foreground">{experience.company}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{experience.period}</div>
        </motion.header>

        <motion.div variants={itemVariants} custom={1} className="mt-4 space-y-2 text-sm text-muted-foreground">
          {experience.description.map((item, idx) => (
            <p key={idx} className="flex items-start">
              <span className="mr-2 leading-none text-foreground">•</span> {item}
            </p>
          ))}
        </motion.div>

        {experience.technologies && experience.technologies.length > 0 && (
          <motion.div variants={itemVariants} custom={2} className="mt-4 flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
