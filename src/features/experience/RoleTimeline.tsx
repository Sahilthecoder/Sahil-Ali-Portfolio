// Removed unused Variants import
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { FiAward, FiCode, FiTrendingUp } from 'react-icons/fi';

import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';
import { cn } from '@/utils/cn';

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
  technologies?: string[];
  achievements?: {
    title: string;
    impact?: string;
    metrics?: string;
  }[];
  employmentType?: string;
}

interface RoleTimelineProps {
  items: TimelineItem[];
  className?: string;
  showCompanyLogos?: boolean;
}

export const RoleTimeline: React.FC<RoleTimelineProps> = ({ 
  items = [], 
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(items[0]?.id || null);

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 15,
    staggerDelay: 0.08,
    initialDelay: 0.2,
  });

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const animationVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    }),
  } as const;

  const contentVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: '1rem',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  } as const;

  if (items.length === 0) return null;

  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={controls} 
      className={cn('relative', className)}
    >
      {/* Animated timeline line */}
      <motion.div 
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
        initial={{ height: 0 }}
        animate={{ 
          height: '100%',
          transition: { 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3 
          } 
        }}
      />

      <div className="space-y-6 sm:space-y-8">
        {items.map((item, index) => {
          const isExpanded = expandedItem === item.id;
          const isLast = index === items.length - 1;
          
          return (
            <motion.div
              key={item.id}
              variants={animationVariants}
              custom={index}
              className={cn(
                'relative pl-10 sm:pl-12 group',
                !isLast && 'pb-6 sm:pb-8',
                item.isCurrent && 'z-10'
              )}
            >
              {/* Timeline dot */}
              <motion.div 
                className={cn(
                  'absolute left-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center',
                  'transition-all duration-300 cursor-pointer',
                  isExpanded 
                    ? 'bg-primary/10 scale-110' 
                    : 'bg-muted/50 scale-90 group-hover:scale-100 group-hover:bg-muted/70'
                )}
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleExpand(item.id)}
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                <div className={cn(
                  'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300',
                  isExpanded 
                    ? 'bg-primary w-3 h-3 sm:w-3.5 sm:h-3.5' 
                    : 'bg-muted-foreground/50 group-hover:bg-primary/80'
                )} />
              </motion.div>

              <motion.div 
                className={cn(
                  'bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm',
                  'transition-all duration-300 overflow-hidden',
                  isExpanded 
                    ? 'ring-1 ring-primary/20 shadow-md' 
                    : 'hover:shadow-md hover:border-border/70'
                )}
                whileHover={{ 
                  y: -2,
                  transition: { type: 'spring', stiffness: 300, damping: 15 }
                }}
              >
                <button
                  className="w-full text-left p-4 sm:p-6 focus:outline-none"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`timeline-content-${item.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                          {item.role}
                        </h3>
                        {item.isCurrent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-primary/10 text-primary">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm">
                        <span className="text-muted-foreground">{item.company}</span>
                        {item.location && (
                          <span className="hidden sm:flex items-center text-muted-foreground/80">
                            <FiMapPin className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="truncate max-w-[100px]">{item.location}</span>
                          </span>
                        )}
                        {item.employmentType && (
                          <span className="text-muted-foreground/60 text-xs sm:text-sm">
                            {item.employmentType}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground whitespace-nowrap mt-0.5 sm:mt-0">
                      <FiCalendar className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`timeline-content-${item.id}`}
                      className="px-6 pb-6 pt-0 border-t border-border/30"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="space-y-4">
                        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                          {item.description.map((desc, idx) => (
                            <p key={idx} className="relative pl-4">
                              <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                              {desc}
                            </p>
                          ))}
                        </div>

                        {item.achievements && item.achievements.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center text-sm font-medium text-foreground">
                              <FiAward className="mr-2 h-4 w-4 text-primary" />
                              Key Achievements
                            </div>
                            <div className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                <div key={idx} className="bg-muted/30 rounded-lg p-3.5">
                                  <h4 className="font-medium text-foreground">{achievement.title}</h4>
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
                            </div>
                          </div>
                        )}

                        {item.technologies && item.technologies.length > 0 && (
                          <div className="pt-4 border-t border-border/30">
                            <div className="flex items-center text-sm font-medium text-foreground mb-3">
                              <FiCode className="mr-2 h-4 w-4 text-primary" />
                              Technologies Used
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center rounded-md bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground/90 border border-border/30 hover:bg-muted/70 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RoleTimeline;
