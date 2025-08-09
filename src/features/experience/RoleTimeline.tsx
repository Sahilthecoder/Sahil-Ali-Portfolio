import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';

import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  isCurrent?: boolean;
}

interface RoleTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const RoleTimeline: React.FC<RoleTimelineProps> = ({ items, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  const animationVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  if (!items || items.length === 0) return null;

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} className={`space-y-8 relative ${className}`}>
      {/* Timeline vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>

      {items.map((timelineItem, index) => (
        <motion.div
          key={timelineItem.id}
          variants={animationVariants}
          custom={index}
          className="relative pl-12"
        >
          <div className="absolute left-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
          </div>

          {timelineItem.isCurrent && (
            <span className="absolute -top-2 right-0 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              Current Role
            </span>
          )}

          <div className="bg-card text-card-foreground rounded border border-border p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{timelineItem.role}</h3>
                <p className="text-muted-foreground">{timelineItem.company}</p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                <span>{timelineItem.period}</span>
              </div>
            </div>
            <p className="mt-3 text-muted-foreground">{timelineItem.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RoleTimeline;
