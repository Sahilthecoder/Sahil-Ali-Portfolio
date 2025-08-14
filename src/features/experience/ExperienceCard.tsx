import { motion } from "framer-motion";
import React, { useRef, memo } from "react";
import { cn } from "@/utils/cn";
import LazyImage from "@/components/LazyImage";
import { useExperienceAnimations } from "@/features/experience/hooks/useExperienceAnimations";
import {
  FiExternalLink,
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
  return workExperiences.map<Experience>((exp) => {
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
  });
};

export const ExperienceList: React.FC = () => {
  const formattedExperiences = formatExperiences();
  return (
    <div className="space-y-6 sm:space-y-8">
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
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center bg-white/50 rounded-md p-1.5 shadow-sm">
                {experience.logo ? (
                  <LazyImage
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <span className="text-sm sm:text-base font-semibold text-primary">
                      {experience.company.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base sm:text-lg font-semibold leading-tight text-foreground">
                  {experience.role}
                </h3>
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
                  {experience.companyUrl && (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 inline-flex items-center"
                    >
                      <FiExternalLink className="mr-1 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Company</span>
                    </a>
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
