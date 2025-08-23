import { motion, Variants } from 'framer-motion';
import React from 'react';
import { SectionHeader } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';
import { skills } from '@/data/skills';

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const skillItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Skill pill animation is currently not in use

const SkillsSection = () => {
  const skillsByCategory = React.useMemo(() => {
    const groups: Record<string, Array<{name: string, level: number}>> = {};
    
    // Sort skills by level (highest first) and then by name
    [...skills]
      .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name))
      .forEach(skill => {
        if (!groups[skill.category]) {
          groups[skill.category] = [];
        }
        groups[skill.category].push({
          name: skill.name,
          level: skill.level
        });
      });
    
    // Category configuration
    const categoryConfig: Record<string, { name: string; icon: string; color: string }> = {
      'frontend': { 
        name: 'Frontend Development', 
        icon: '💻',
        color: 'from-blue-500/10 to-blue-500/5'
      },
      'backend': { 
        name: 'Backend Development', 
        icon: '⚙️',
        color: 'from-purple-500/10 to-purple-500/5'
      },
      'devops': { 
        name: 'DevOps & Cloud', 
        icon: '☁️',
        color: 'from-emerald-500/10 to-emerald-500/5'
      },
      'database': { 
        name: 'Database', 
        icon: '🗄️',
        color: 'from-amber-500/10 to-amber-500/5'
      },
      'other': { 
        name: 'Operations & Management', 
        icon: '📊',
        color: 'from-rose-500/10 to-rose-500/5'
      },
      'analytics': {
        name: 'Analytics',
        icon: '📈',
        color: 'from-indigo-500/10 to-indigo-500/5'
      }
    };

    return Object.entries(groups).map(([category, skills]) => ({
      ...categoryConfig[category] || {
        name: category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        icon: '✨',
        color: 'from-gray-500/10 to-gray-500/5'
      },
      value: category,
      skills
    }));
  }, []);

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-emerald-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 60) return 'bg-indigo-500';
    if (level >= 40) return 'bg-amber-500';
    return 'bg-gray-300';
  };

  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10" style={{
        backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px 0px' }}
          variants={fadeIn}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <SectionHeader
            title="Skills & Expertise"
            subtitle="Technologies I Excel In"
            className="max-w-3xl mx-auto"
          />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            A collection of technologies and tools I&apos;ve worked with, organized by category and proficiency level.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px 0px' }}
        >
          {skillsByCategory.map((category) => (
            <motion.div
              key={category.value}
              variants={skillItem}
              className={cn(
                "group relative bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6",
                "hover:border-primary/50 transition-all duration-300 overflow-hidden",
                "hover:shadow-lg hover:-translate-y-1"
              )}
            >
              {/* Gradient background */}
              <div className={cn(
                "absolute inset-0 -z-10 opacity-0 group-hover:opacity-100",
                "bg-gradient-to-br",
                category.color,
                "transition-opacity duration-500"
              )} />
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={`${category.value}-${skill.name}`} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground/90">{skill.name}</span>
                      <span className="text-muted-foreground text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${getLevelColor(skill.level)}`}
                        initial={{ width: 0 }}
                        whileInView={{ 
                          width: `${skill.level}%`,
                          transition: { 
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.2
                          }
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.p 
            className="text-muted-foreground text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Continuously learning and expanding my skill set to stay current with industry trends.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;