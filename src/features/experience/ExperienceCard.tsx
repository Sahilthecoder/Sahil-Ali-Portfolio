import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { cn } from '@/utils/cn';
import LazyImage from '@/components/LazyImage';
import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';
import { FiExternalLink, FiAward, FiTrendingUp, FiMapPin, FiCode } from 'react-icons/fi';
import { experiences as workExperiences } from '@/data/experience';

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string[];
  technologies: string[];
  achievements?: {
    title: string;
    impact?: string;
    metrics?: string;
  }[];
  logo?: string;
  location?: string;
  employmentType?: string;
  isCurrent?: boolean;
}

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
  isCurrent?: boolean;
}

// Format experiences data to match Experience type
export const formatExperiences = () => {
  return workExperiences.map<Experience>((exp) => ({
    id: exp.id,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    description: exp.description || [],
    technologies: exp.technologies || [],
    achievements: (exp.achievements || []).map(achievement => ({
      title: achievement
    })),
    logo: exp.logo || '',
    companyUrl: exp.companyUrl || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate || undefined,
    isCurrent: exp.isCurrent || false,
    location: exp.location,
  }));
};

export const ExperienceList: React.FC = () => {
  const formattedExperiences = formatExperiences();
  
  return (
    <div className="space-y-8">
      {formattedExperiences.map((experience) => (
        <ExperienceCard 
          key={experience.id} 
          experience={experience} 
          isCurrent={experience.isCurrent}
        />
      ))}
    </div>
  );
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  className = '',
  isCurrent = false 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    }),
  };

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 15,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn(
        'bg-card/80 backdrop-blur-sm text-card-foreground rounded-xl border border-border/50 shadow-sm',
        'transition-all duration-300 hover:shadow-lg hover:border-primary/20',
        'overflow-hidden relative group',
        className
      )}
    >
      {isCurrent && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Current Role
          </span>
        </div>
      )}

      <div className="p-4 sm:p-6">
        <motion.header variants={itemVariants} custom={0} className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start space-x-3 sm:space-x-4">
            {experience.logo ? (
              <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                <LazyImage
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  width={44}
                  height={44}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg object-cover border border-border/30"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-border/20 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-semibold text-primary">
                  {experience.company.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="space-y-0.5 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold leading-tight text-foreground">{experience.role}</h3>
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm">
                {experience.location && (
                  <span className="flex items-center text-muted-foreground">
                    <FiMapPin className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                    <span className="truncate max-w-[120px] sm:max-w-none">{experience.location}</span>
                  </span>
                )}
                {experience.employmentType && (
                  <span className="text-muted-foreground/80 hidden sm:inline">
                    {experience.employmentType}
                  </span>
                )}
                {experience.companyUrl && (
                  <a 
                    href={experience.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                  >
                    <FiExternalLink className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Company</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap mt-1 sm:mt-0">
            {experience.period}
          </div>
        </motion.header>

        <motion.div 
          variants={itemVariants} 
          custom={1} 
          className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground"
        >
          {experience.description.map((item, idx) => (
            <p key={idx} className="relative pl-4">
              <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-primary/80"></span>
              {item}
            </p>
          ))}
        </motion.div>

        {experience.achievements && experience.achievements.length > 0 && (
          <motion.div variants={itemVariants} custom={2} className="mt-6 space-y-4">
            <div className="flex items-center text-sm font-medium text-foreground">
              <FiAward className="mr-2 h-4 w-4 text-primary" />
              Key Achievements
            </div>
            <div className="space-y-3">
              {experience.achievements.map((achievement, idx) => (
                <div key={idx} className="bg-muted/30 rounded-lg p-3.5">
                  <h4 className="font-medium text-foreground">{achievement.title}</h4>
                  {achievement.impact && (
                    <p className="mt-1 text-sm text-muted-foreground">{achievement.impact}</p>
                  )}
                  {achievement.metrics && (
                    <div className="mt-2 inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      <FiTrendingUp className="mr-1.5 h-3.5 w-3.5" />
                      {achievement.metrics}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {experience.technologies && experience.technologies.length > 0 && (
          <motion.div variants={itemVariants} custom={3} className="mt-6 pt-5 border-t border-border/30">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <FiCode className="mr-2 h-4 w-4 text-primary" />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground/90 border border-border/30 hover:bg-muted/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
