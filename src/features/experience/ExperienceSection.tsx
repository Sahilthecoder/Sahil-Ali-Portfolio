import { motion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FiBriefcase, FiCode, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import LazyImage from '@/components/LazyImage';
import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';
import { SectionHeader } from '@/components/ui/AnimatedSection';
import type { Experience } from './ExperienceCard';

interface ExperienceSectionProps {
  experiences: Experience[];
  title: string;
  subtitle: string;
  showAchievements?: boolean;
  showTechnologies?: boolean;
  className?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  title,
  subtitle,
  showAchievements = true,
  showTechnologies = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial="hidden" animate={controls} className={`mt-8 sm:mt-10 ${className}`}>
          <SectionHeader
            title={title}
            subtitle={subtitle}
          />

          <motion.div variants={itemVariants} className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                custom={index + 1}
                className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden"
              >
                {/* Header with company info */}
                <div className="bg-accent/5 border-b border-border/30">
                  <div className="p-6 flex items-center gap-4">
                    {experience.logo && (
                      <LazyImage
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{experience.role}</h3>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <FiBriefcase className="text-sm" />
                        {experience.company}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <FiTrendingUp className="text-sm" />
                        {experience.period}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description and achievements */}
                <div className="p-6">
                  {/* Description */}
                  <div className="space-y-4 mb-6">
                    {experience.description.map((item, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        <span className="mr-2 text-foreground">•</span>
                        {item}
                      </p>
                    ))}
                  </div>

                  {/* Achievements */}
                  {showAchievements && experience.achievements && experience.achievements.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Key Achievements</h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <FiCheckCircle className="text-primary-500 w-5 h-5 mt-1" />
                            <p className="text-muted-foreground">{achievement.title}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {showTechnologies && experience.technologies && experience.technologies.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                          >
                            <FiCode className="w-4 h-4 mr-1" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
