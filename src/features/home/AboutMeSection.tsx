import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/AnimatedSection';
import { FiCode, FiBriefcase, FiTrendingUp } from 'react-icons/fi';

const AboutMeSection = () => {
  return (
    <section id="about" className="min-h-[calc(100vh-80px)] flex items-center py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full mb-12 sm:mb-16">
          <SectionHeader
            title="About Me"
            subtitle="Passionate about transforming data into actionable insights"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* Professional Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiCode className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Data Analyst & Automation Specialist</h3>
                <p className="text-sm text-muted-foreground">2024–Present • Self-Employed</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              With a strong background in data analysis and automation, I specialize in creating efficient solutions that drive business growth. My journey from inventory management to data analytics has equipped me with unique insights into optimizing processes and extracting meaningful insights from complex data sets.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Key Strength */}
              <div className="flex flex-col items-center p-4 sm:p-5 md:p-6 border rounded-lg border-border hover:border-primary/20 transition-colors h-full">
                <FiBriefcase className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">Business Solutions</h4>
                <p className="text-center text-muted-foreground">
                  Crafting data-driven solutions that align with business goals
                </p>
              </div>

              {/* Key Strength */}
              <div className="flex flex-col items-center p-4 sm:p-5 md:p-6 border rounded-lg border-border hover:border-primary/20 transition-colors h-full">
                <FiCode className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">Technical Expertise</h4>
                <p className="text-center text-muted-foreground">
                  Proficient in Python, SQL, and AI automation tools
                </p>
              </div>

              {/* Key Strength */}
              <div className="flex flex-col items-center p-4 sm:p-5 md:p-6 border rounded-lg border-border hover:border-primary/20 transition-colors h-full">
                <FiTrendingUp className="h-8 w-8 text-primary mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-2">Process Optimization</h4>
                <p className="text-center text-muted-foreground">
                  Streamlining operations through automation and analysis
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
