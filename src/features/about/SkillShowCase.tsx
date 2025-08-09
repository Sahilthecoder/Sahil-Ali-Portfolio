import { motion } from 'framer-motion';
import { FiBarChart2, FiBox, FiCpu } from 'react-icons/fi';

import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ThemeCard } from '@/components/ui/ThemeCard';

type CategoryKey = 'inventory' | 'data' | 'ai';

interface SkillCategory {
  id: CategoryKey;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  accentColor?: string;
}

const SkillsShowcase = () => {
  const categories: SkillCategory[] = [
    {
      id: 'inventory',
      title: 'Inventory Specialist',
      description:
        'End-to-end inventory and warehouse management, ensuring optimal stock levels, reduced wastage, and efficient vendor coordination.',
      icon: FiBox,
      skills: [
        'Stock Level Monitoring',
        'FIFO/LIFO Strategies',
        'Vendor Management',
        'ERP Tools (Zoho, Marg)',
        'Excel Automation',
        'Barcode Scanning Systems',
        'Supply Chain Coordination',
      ],
      accentColor: 'bg-blue-500',
    },
    {
      id: 'data',
      title: 'Data Analyst',
      description:
        'Transforming raw data into dashboards, reports, and business intelligence using modern tools for informed decision-making.',
      icon: FiBarChart2,
      skills: [
        'Excel + Advanced Formulas',
        'Looker Studio / Google Sheets',
        'Power BI / Tableau',
        'SQL & Relational Databases',
        'Dashboarding & Reporting',
        'Statistical Trend Analysis',
        'KPI Tracking & Optimization',
      ],
      accentColor: 'bg-purple-500',
    },
    {
      id: 'ai',
      title: 'AI Generalist',
      description:
        'Applying AI and automation to solve real business problems, streamline workflows, and integrate smart tools with operations.',
      icon: FiCpu,
      skills: [
        'AI Workflow Automation',
        'ChatGPT + Prompt Engineering',
        'No-Code AI Tools (Zapier, Pabbly)',
        'OpenAI API Integration',
        'Custom AI Dashboards',
        'Data Mining & Forecasting',
        'Machine Learning (Basic Models)',
      ],
      accentColor: 'bg-emerald-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <AnimatedSection className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="My Expertise Areas"
          subtitle="Specialized skills and knowledge across multiple domains"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.id} variants={item} className="h-full">
                <ThemeCard className="h-full flex flex-col" variant="elevated" hoverEffect="grow">
                  <div className={`w-12 h-1.5 ${category.accentColor} rounded-full mb-4`} />
                  <div className="flex items-center mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">{category.description}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 5).map((skill) => (
                        <SkillBadge key={skill} name={skill} variant="outline" size="sm" className="text-xs">
                          {skill}
                        </SkillBadge>
                      ))}
                      {category.skills.length > 5 && (
                        <span className="text-xs text-muted-foreground self-center">
                          +{category.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </ThemeCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeCard className="bg-background">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                And many more skills...
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                I'm constantly learning and expanding my skill set. Here are some additional tools
                and technologies I work with:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Microsoft Office Suite',
                  'Google Workspace',
                  'Project Management',
                  'Team Leadership',
                  'Process Improvement',
                  'Data Entry',
                  'Customer Service',
                  'Training & Development',
                ].map((skill) => (
                  <SkillBadge key={skill} name={skill} variant="ghost" size="sm" className="text-xs">
                    {skill}
                  </SkillBadge>
                ))}
              </div>
            </div>
          </ThemeCard>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsShowcase;
