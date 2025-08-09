import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skill } from '@/types/experience.types';

interface SkillsMatrixProps {
  skills: Skill[];
  className?: string;
}

const categoryColors: Record<string, string> = {
  database: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  framework: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  language: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  tool: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category.toLowerCase()] || categoryColors.other;
};

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills, className }) => {
  // Set all skill levels to 95
  const normalizedSkills = skills.map(skill => ({
    ...skill,
    level: 95
  }));

  // Group skills by category
  const skillsByCategory = normalizedSkills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  // Sort categories by name
  const sortedCategories = Object.keys(skillsByCategory).sort();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={cn('w-full', className)}>
      {sortedCategories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="mb-4 text-xl font-semibold capitalize text-foreground/90">
            {category}
          </h3>
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skillsByCategory[category]
              .sort((a, b) => b.level - a.level)
              .map((skill) => (
                <motion.div
                  key={skill.id}
                  className="overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  variants={item}
                  whileHover={{ y: -2 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skill.icon && <span className="text-lg">{skill.icon}</span>}
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={`h-full ${getCategoryColor(category).split(' ')[0]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default SkillsMatrix;
