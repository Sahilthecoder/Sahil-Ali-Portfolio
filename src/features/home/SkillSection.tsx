import { motion } from 'framer-motion';
import React from 'react';
import { SectionHeader } from '@/components/ui/AnimatedSection';
import { skills } from '@/data/skills';

// Define job role categories with descriptions
const jobRoles = [
  {
    id: 'ecommerce',
    title: 'E-commerce & Marketplace Specialist',
    icon: '🛍️',
    description: 'Expert in managing online marketplaces, product catalogs, and e-commerce operations',
    categories: ['ecommerce', 'operations']
  },
  {
    id: 'analytics',
    title: 'Data & Analytics Professional',
    icon: '📊',
    description: 'Skilled in data analysis, reporting, and business intelligence',
    categories: ['analytics', 'database']
  },
  {
    id: 'operations',
    title: 'Operations Manager',
    icon: '⚙️',
    description: 'Experienced in process optimization and operational excellence',
    categories: ['operations', 'inventory']
  },
  {
    id: 'leadership',
    title: 'Team Leadership',
    icon: '👥',
    description: 'Proven leadership and team management capabilities',
    categories: ['soft', 'management']
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const SkillsSection = () => {
  // Group skills by category
  const skillsByCategory = React.useMemo(() => {
    const groups: Record<string, string[]> = {};
    
    skills.forEach(skill => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill.name);
    });
    
    return groups;
  }, []);

  // Get skills for specific job role
  const getRoleSkills = (categories: string[]) => {
    const roleSkills = new Set<string>();
    
    categories.forEach(category => {
      if (skillsByCategory[category]) {
        skillsByCategory[category].forEach(skill => roleSkills.add(skill));
      }
    });
    
    return Array.from(roleSkills).sort();
  };

  return (
    <section id="skills" className="min-h-[calc(100vh-80px)] flex items-center py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full mb-12 sm:mb-16">
          <SectionHeader
            title="Professional Expertise"
            subtitle="Areas of Specialization"
          />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px 0px' }}
          variants={fadeIn}
        >
          <div className="space-y-16">
            {jobRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px 0px' }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="border-b border-border/30 pb-12 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start mb-6">
                <span className="text-3xl mr-4">{role.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
                  <p className="text-muted-foreground mt-1">{role.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {getRoleSkills(role.categories).map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-foreground/90 hover:bg-muted/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          </div>

          {/* All Skills Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px 0px' }}
            variants={fadeIn}
            className="mt-20"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">Comprehensive Skill Set</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(skillsByCategory).map(([category, skillsList]) => (
                <div key={category} className="bg-muted/20 rounded-lg p-4">
                  <h4 className="font-medium text-foreground/90 mb-3 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(skillsList as string[]).map(skill => (
                      <span 
                        key={skill}
                        className="text-sm px-2.5 py-1 bg-background rounded-full text-foreground/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;