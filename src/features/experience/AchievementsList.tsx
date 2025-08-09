import { motion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FiAward } from 'react-icons/fi';

import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

interface AchievementsListProps {
  achievements: string[];
  className?: string;
}

export const AchievementsList: React.FC<AchievementsListProps> = ({
  achievements,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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

  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={`mt-6 ${className}`}
    >
      <motion.h4
        variants={itemVariants}
        custom={0}
        className="text-lg font-semibold text-foreground mb-3 flex items-center"
      >
        <FiAward className="mr-2 text-primary-500" />
        Key Achievements
      </motion.h4>

      <motion.div variants={itemVariants} className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            variants={itemVariants}
            custom={index + 1}
            className="flex items-start"
          >
            <FiAward className="mr-3 h-5 w-5 text-primary-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">
                {achievement}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AchievementsList;
