import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiCode, FiUsers } from 'react-icons/fi';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ThemeCard } from '@/components/ui/ThemeCard';

const stats = [
  { id: 1, name: 'Years of Experience', value: '4+', icon: FiBriefcase },
  { id: 2, name: 'Projects Completed', value: '15+', icon: FiCode },
  { id: 3, name: 'Clients Served', value: '10+', icon: FiUsers },
  { id: 4, name: 'Certifications', value: '5+', icon: FiAward },
];

const skills = [
  'Data Analysis',
  'Power BI',
  'SQL',
  'Python',
  'Inventory Optimization',
  'AI Research',
  'Machine Learning',
  'Data Visualization',
  'Excel',
  'Looker Studio',
  'Tableau',
  'Process Automation',
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
              A passionate professional with expertise in data analysis, inventory management, and AI research
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
                Hey there! I&apos;m a multi-disciplinary professional with expertise in Data Analysis,
                Inventory Management, and Artificial Intelligence research.
              </p>
              <p>
                With over 4+ years of experience, I&apos;ve optimized inventory systems, delivered
                insights through data, and explored cutting-edge AI applications to streamline
                operations across industries.
              </p>
              <p>
                I&apos;m a lifelong learner who thrives on solving real-world problems. Outside of work,
                I enjoy tech blogging, nerdy podcasts, and the occasional game of chess.
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
                    <span>Data Analysis & Visualization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Inventory Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Process Automation</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">My Approach</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Data-Driven Decision Making</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Continuous Learning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Collaborative Problem Solving</span>
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
