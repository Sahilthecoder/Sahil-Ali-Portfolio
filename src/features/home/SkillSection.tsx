import { motion, Variants } from 'framer-motion';
import React from 'react';
import { FiBarChart2, FiBox, FiCode, FiCpu, FiChevronRight } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { SectionHeader } from '@/components/ui/AnimatedSection';

type CategoryKey = 'inventory' | 'data' | 'ai' | 'tech';

interface SkillCategory {
  id: CategoryKey;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const container: Variants = {
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

const item: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    scale: 0.98
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      mass: 0.5
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const SkillsSection = () => {
  // Group skills by role/category
  const categories: SkillCategory[] = [
    {
      id: 'inventory',
      title: 'Inventory Specialist',
      description: 'Optimizing supply chain and warehouse operations',
      icon: FiBox,
      skills: [
        'Inventory Management',
        'Warehouse Operations',
        'Process Automation',
        'FIFO Implementation',
        'ERP Software',
        'Supply Chain Optimization',
      ],
    },
    {
      id: 'data',
      title: 'Data Analyst',
      description: 'Transforming data into actionable insights',
      icon: FiBarChart2,
      skills: [
        'Data Analysis',
        'SQL',
        'Data Visualization',
        'Excel/Sheets',
        'Statistical Analysis',
        'Reporting',
      ],
    },
    {
      id: 'ai',
      title: 'AI Generalist',
      description: 'Leveraging AI for business solutions',
      icon: FiCpu,
      skills: [
        'Machine Learning',
        'Predictive Analytics',
        'AI Integration',
        'Process Automation',
        'Data Mining',
        'AI Tools & Frameworks',
      ],
    },
    {
      id: 'tech',
      title: 'Technical Skills',
      description: 'Development and technical expertise',
      icon: FiCode,
      skills: [
        'Python',
        'JavaScript/TypeScript',
        'React/Next.js',
        'Node.js',
        'Database Management',
        'Cloud Services',
      ],
    },
  ];

  // Animation variants are defined at the top of the file

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-16 lg:mb-20">
          <SectionHeader
            title="My Expertise"
            subtitle="A comprehensive overview of my technical and professional capabilities"
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          variants={container}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div 
                key={category.id}
                variants={item}
                whileHover="hover"
                className="h-full group relative"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300 group-hover:duration-300" />
                
                <Card className="h-full border border-border/30 bg-card/90 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10 relative overflow-hidden hover:bg-card/95 group">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/70 to-background/20 pointer-events-none" />
                  
                  <CardHeader className="flex-row items-start space-x-4 pb-5 relative z-10">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm border border-primary/20 group-hover:shadow-primary/20 group-hover:shadow-sm transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground/90">
                        {category.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="inline-flex items-center text-xs font-medium px-3.5 py-1.5 rounded-full bg-muted/30 text-muted-foreground group-hover:bg-primary/10 group-hover:text-foreground group-hover:border-primary/30 transition-all duration-200 border border-border/30 group-hover:shadow-sm group/skill hover:bg-primary/20 hover:border-primary/40"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                          transition={{ 
                            delay: 0.05 * (index % 3),
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        >
                          {skill}
                          <FiChevronRight className="ml-1.5 w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;