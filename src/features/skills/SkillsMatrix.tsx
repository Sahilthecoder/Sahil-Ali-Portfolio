import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skill } from '@/types/experience.types';
import * as Icons from '@heroicons/react/24/outline';
import { SectionHeader } from '@/components/ui/AnimatedSection';

const skillCategories = [
  {
    title: 'Operations & Inventory',
    icon: 'CubeIcon',
    description: 'Expertise in inventory control, process optimization, and warehouse operations',
    skills: [
      'Inventory Management',
      'Process Automation',
      'ERP Software',
      'FIFO Implementation',
      'Warehouse Management'
    ]
  },
  {
    title: 'Data & Analysis',
    icon: 'ChartBarIcon',
    description: 'Proficient in data analysis, reporting, and financial insights',
    skills: [
      'Data Analysis',
      'Financial Reporting',
      'Microsoft Excel',
      'Google Sheets',
      'SQL',
      'Data Visualization'
    ]
  },
  {
    title: 'Professional Skills',
    icon: 'UserGroupIcon',
    description: 'Key interpersonal and management capabilities',
    skills: [
      'Client Relationship Management',
      'Team Leadership',
      'Process Improvement',
      'Regulatory Compliance',
      'Documentation'
    ]
  }
];

interface SkillsMatrixProps {
  skills: Skill[];
  title: string;
  subtitle: string;
  className?: string;
}

const getSkillIcon = (skillName: string, skills: Skill[]) => {
  const skill = skills.find(s => s.name === skillName);
  if (!skill) return Icons.QuestionMarkCircleIcon;
  return Icons[skill.icon as keyof typeof Icons] || Icons.QuestionMarkCircleIcon;
};

const SkillCard: React.FC<{ 
  title: string; 
  icon: string; 
  description: string; 
  skills: string[];
  allSkills: Skill[];
  className?: string;
}> = ({ title, icon, description, skills, allSkills, className }) => {
  const Icon = Icons[icon as keyof typeof Icons] || Icons.QuestionMarkCircleIcon;
  
  return (
    <motion.div 
      className={cn(
        'relative overflow-hidden rounded-xl border bg-card p-6',
        'transition-all duration-300 hover:shadow-lg',
        'flex flex-col h-full',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="mt-auto space-y-3">
        <h4 className="text-sm font-medium text-foreground/80 mb-2">Key Skills:</h4>
        <ul className="space-y-2">
          {skills.map((skillName) => {
            const SkillIcon = getSkillIcon(skillName, allSkills);
            const skill = allSkills.find(s => s.name === skillName);
            
            return (
              <li 
                key={skillName}
                className={cn(
                  'flex items-center gap-3 py-1.5 px-3 -mx-3 rounded-md',
                  'hover:bg-muted/50 transition-colors',
                  'group'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full',
                  'bg-primary/10 text-primary',
                  'group-hover:bg-primary/20 transition-colors'
                )}>
                  <SkillIcon 
                    className={cn(
                      'h-3.5 w-3.5',
                      skill?.iconClass || 'text-primary',
                      'group-hover:scale-110 transition-transform'
                    )} 
                  />
                </div>
                <span className="text-sm">{skillName}</span>
              </li>
            );
          })}
        </ul>
      </div>
      
      <motion.div 
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      />
    </motion.div>
  );
};

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ 
  skills, 
  title,
  subtitle,
  className 
}) => {
  return (
    <div className={cn('w-full', className)}>
      <SectionHeader 
        title={title} 
        subtitle={subtitle} 
      />
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:flex-row -mt-6">
        {skillCategories.map((category) => (
          <div key={category.title} className="w-full">
            <SkillCard
              title={category.title}
              icon={category.icon}
              description={category.description}
              skills={category.skills}
              allSkills={skills}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMatrix;
