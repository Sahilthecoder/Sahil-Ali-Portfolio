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
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const skillItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const SkillsSection = () => {
  // Group skills by category
  const skillsByCategory = React.useMemo(() => {
    const groups: Record<string, Array<{name: string, level: number}>> = {};
    
    // Sort skills by name within each category
    [...skills].sort((a, b) => a.name.localeCompare(b.name)).forEach(skill => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push({
        name: skill.name,
        level: skill.level
      });
    });
    
    // Convert to array and sort by category name
    return Object.entries(groups)
      .map(([category, skills]) => ({
        name: category === 'other' ? 'Operations & Management' : 
               category === 'frontend' ? 'Frontend Development' :
               category === 'backend' ? 'Backend Development' :
               category === 'devops' ? 'DevOps & Cloud' :
               category.split(' ').map(word => 
                 word.charAt(0).toUpperCase() + word.slice(1)
               ).join(' '),
        value: category,
        skills,
        icon: category === 'frontend' ? '💻' :
              category === 'backend' ? '⚙️' :
              category === 'devops' ? '☁️' : '📊'
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <section id="skills" className="py-12 sm:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left">
          <SectionHeader
            title="Professional Skills"
            subtitle="A comprehensive overview of my core competencies and areas of expertise"
            className="max-w-3xl"
          />
        </div>

        {/* Skills by Category */}
        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {skillsByCategory.map((category) => (
            <motion.div 
              key={category.value}
              className="bg-card border border-border/50 rounded-xl p-6 shadow-sm"
              variants={skillItem}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={`${category.value}-${skill.name}`}
                    className={cn(
                      "inline-block px-3 py-1.5 text-sm rounded-md",
                      "bg-muted/50 text-foreground/90 border border-border/30",
                      "hover:bg-primary/5 hover:border-primary/50",
                      "transition-colors duration-200"
                    )}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;