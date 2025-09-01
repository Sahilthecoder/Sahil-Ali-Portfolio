import { motion } from "framer-motion";
import React, { useRef, memo } from "react";
import { SectionHeader } from "@/components/ui/AnimatedSection";
import { cn } from "@/utils/cn";
import LazyImage from "@/components/LazyImage";
import { useExperienceAnimations } from "@/features/experience/hooks/useExperienceAnimations";
import {
  FiAward,
  FiTrendingUp,
  FiMapPin,
  FiCode,
} from "react-icons/fi";
import { experiences as workExperiences } from "@/data/experience";
import type { WorkExperience } from '@/types/experience.types';

interface ExperienceAchievement {
  title: string;
  impact?: string;
  metrics?: string;
}

export interface Experience extends Omit<WorkExperience, 'achievements'> {
  achievements?: ExperienceAchievement[];
  employmentType?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
  isCurrent?: boolean;
}

export const formatExperiences = (): Experience[] => {
  return workExperiences
    .map<Experience>((exp) => {
      const typedExp = exp as WorkExperience & { employmentType?: string };
      return {
        ...exp,
        achievements: (exp.achievements || []).map(achievement => ({
          title: achievement,
          impact: '',
          metrics: ''
        })),
        logo: exp.logo || "",
        companyUrl: exp.companyUrl || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || undefined,
        isCurrent: exp.isCurrent || false,
        location: exp.location || "",
        employmentType: typedExp.employmentType
      };
    })
    .sort((a, b) => {
      // Put current experiences first
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;
      
      // Then sort by end date (most recent first)
      const dateA = a.endDate ? new Date(a.endDate).getTime() : new Date().getTime();
      const dateB = b.endDate ? new Date(b.endDate).getTime() : new Date().getTime();
      
      return dateB - dateA;
    });
};

export const ExperienceList: React.FC = () => {
  const formattedExperiences = formatExperiences();
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div id="experience-section" className="w-full mb-12 sm:mb-16">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey and key achievements"
          className="text-center lg:text-left"
        />
      </div>
      <div className="space-y-6 sm:space-y-8">
        {formattedExperiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            isCurrent={experience.isCurrent}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  className = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const itemVariants = {
      hidden: { y: 10, opacity: 0 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.08, // slightly faster
          type: "spring",
          stiffness: 140,
          damping: 18,
        },
      }),
    };

    const { controls } = useExperienceAnimations(ref, {
      yOffset: 15,
      staggerDelay: 0.08,
      initialDelay: 0.15,
    });

    return (
      <motion.article
        ref={ref}
        role="article"
        initial="hidden"
        animate={controls}
        className={cn(
          "bg-card/80 backdrop-blur-md rounded-xl border border-border/50 shadow-sm",
          "transition-all duration-300 hover:shadow-lg hover:border-primary/30",
          "overflow-hidden relative group focus-within:ring-2 ring-primary/40 outline-none",
          "p-4 sm:p-6",
          className
        )}
        tabIndex={0}
      >

        {/* Header */}
        <motion.header
          variants={itemVariants}
          custom={0}
          className="space-y-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`relative group/logo -mt-1 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] ${
                ['Deewakar Finance Pvt. Ltd.', 'Ekam Indian Groceries'].includes(experience.company) ? 'h-[100px]' : ''
              }`}>
                <div className={`w-full ${
                  ['Deewakar Finance Pvt. Ltd.', 'Ekam Indian Groceries'].includes(experience.company) 
                    ? 'h-full aspect-[2/1.5]' 
                    : 'aspect-[5/2]'
                } flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700/80 transition-all duration-300 group-hover/logo:shadow-md group-hover/logo:border-primary/40 group-hover/logo:scale-[1.02] overflow-hidden`}>
                  {experience.logo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 z-10" />
                      <LazyImage
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={['Deewakar Finance Pvt. Ltd.', 'Ekam Indian Groceries'].includes(experience.company) ? 150 : 180}
                        height={['Deewakar Finance Pvt. Ltd.', 'Ekam Indian Groceries'].includes(experience.company) ? 112 : 72}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover/logo:scale-105"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/15 rounded-lg">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        {experience.company.split(' ').map(word => word[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-medium leading-tight text-foreground/90">
                    {experience.role}
                  </h3>
                  <h4 className="text-sm sm:text-base font-bold text-primary">
                    {experience.company}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                  {experience.location && (
                    <span className="flex items-center text-muted-foreground">
                      <FiMapPin className="mr-1 h-3.5 w-3.5" />
                      <span className="truncate max-w-[140px] sm:max-w-none">
                        {experience.location}
                      </span>
                    </span>
                  )}
                  {experience.employmentType && (
                    <span className="text-muted-foreground/80 hidden sm:inline">
                      {experience.employmentType}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              {experience.period}
              {experience.isCurrent && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                  Current
                </span>
              )}
            </div>
          </div>
        </motion.header>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          custom={1}
          className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground"
        >
          {experience.description.map((item, idx) => (
            <p key={idx} className="relative pl-4">
              <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-primary/80"></span>
              {item}
            </p>
          ))}
        </motion.div>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <motion.section
            variants={itemVariants}
            custom={2}
            className="mt-5 space-y-3"
          >
            <div className="flex items-center text-sm font-medium text-foreground">
              <FiAward className="mr-2 h-4 w-4 text-primary" />
              Key Achievements
            </div>
            {experience.achievements?.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-muted/30 rounded-lg p-3 border border-border/20"
              >
                <h4 className="font-medium text-foreground">
                  {achievement.title}
                </h4>
                {achievement.impact && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {achievement.impact}
                  </p>
                )}
                {achievement.metrics && (
                  <div className="mt-2 inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    <FiTrendingUp className="mr-1.5 h-3.5 w-3.5" />
                    {achievement.metrics}
                  </div>
                )}
              </div>
            ))}
          </motion.section>
        )}

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <motion.section
            variants={itemVariants}
            custom={3}
            className="mt-6 pt-5 border-t border-border/30"
          >
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <FiCode className="mr-2 h-4 w-4 text-primary" />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground/90 border border-border/30 hover:bg-muted/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}
      </motion.article>
    );
  };

const MemoizedExperienceCard = memo(ExperienceCard);
MemoizedExperienceCard.displayName = 'ExperienceCard';

export default MemoizedExperienceCard;
