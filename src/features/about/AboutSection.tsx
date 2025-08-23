import { motion } from 'framer-motion';
import { FiBriefcase, FiShoppingBag, FiCpu, FiBox } from 'react-icons/fi';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ThemeCard } from '@/components/ui/ThemeCard';

const stats = [
  { id: 1, name: 'Years in E-commerce & Digital', value: '7+', icon: FiBriefcase },
  { id: 2, name: 'E-commerce Platforms', value: '3+', icon: FiShoppingBag },
  { id: 3, name: 'AI Tools Mastered', value: '20+', icon: FiCpu },
  { id: 4, name: 'Inventory Managed', value: '10,000+ SKUs', icon: FiBox },
];

const skills = [
  'E-commerce Strategy',
  'Digital Marketing',
  'Inventory Management',
  'AI Implementation',
  'Data Analysis (Excel, SQL, Python)',
  'Process Automation',
  'Google Analytics',
  'Vendor Coordination',
  'Business Intelligence',
  'Market Research',
  'Customer Experience',
  'Supply Chain Optimization'
];

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <AnimatedSection className="py-10 sm:py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="about-content" className="mb-8 sm:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
E-commerce & Digital Marketing Specialist | Inventory Management Expert | AI Implementation Specialist | Data Analyst
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
I am a multi-skilled professional with expertise in E-commerce operations, Digital Marketing, and Inventory Management, complemented by strong analytical skills as a Data Analyst and advanced knowledge as an AI Generalist. Over the years, I have successfully managed inventory systems, optimized supply chain processes, and developed strategies to improve online sales and digital visibility.
              </p>
              <p>
                With 7+ years of hands-on experience, I&apos;ve helped businesses scale their e-commerce operations, implement data-driven marketing strategies, and optimize inventory management. My expertise in AI tools and automation has enabled companies to reduce operational costs by up to 30% while improving efficiency and accuracy.
              </p>
              <p>
                I specialize in Excel-based reporting, dashboard creation, and data-driven decision making, with foundational knowledge in SQL and Python to support analytical work. My diverse background allows me to integrate technology, operations, and strategy—helping businesses grow with smarter processes and stronger customer engagement.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 8).map((skill) => (
                  <SkillBadge key={skill} name={skill} variant="outline" size="sm">
                    {skill}
                  </SkillBadge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <ThemeCard key={stat.id} variant="outline" hoverEffect="grow" className="h-full">
                  <div className="flex items-start">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </ThemeCard>
              );
            })}
          </motion.div>
        </div>

        {/* Additional Experience */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ThemeCard className="bg-muted/30">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">What I Do</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>E-commerce Strategy & Store Management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Digital Marketing & Sales Growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>AI Implementation & Automation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">My Approach</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Data Analysis & Excel Dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Inventory Management & Control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Process Automation & AI Tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">My Values</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Integrity & Transparency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Innovation & Creativity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Continuous Improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </ThemeCard>
        </motion.div>
      </div>
    </AnimatedSection>
  </div>
  );
};

export default AboutSection;
