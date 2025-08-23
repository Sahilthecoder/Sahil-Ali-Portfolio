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
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-6 sm:p-8 rounded-2xl mb-8 border border-border/50">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <FiCode className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Sahil Ali</h2>
                  <p className="text-lg text-primary font-medium mb-2">E-commerce & Data Analytics Specialist</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    7 Years of Professional Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed mb-6">
                Transforming raw data into strategic business insights, I specialize in optimizing e-commerce operations through data-driven decision making. With a strong foundation in Python, SQL, and business intelligence tools, I bridge the gap between technical analysis and business strategy to deliver measurable results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Core Expertise
                  </h4>
                  <ul className="space-y-1.5 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> E-commerce Analytics & Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Data Visualization & Reporting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Business Process Automation
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Technical Proficiencies
                  </h4>
                  <ul className="space-y-1.5 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Python, SQL, Pandas, NumPy
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Tableau, Power BI, Google Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> E-commerce Platforms & Marketplaces
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="group relative p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 transition-colors duration-300"></div>
                <FiBriefcase className="h-8 w-8 text-primary mb-4 relative z-10" />
                <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">E-commerce Solutions</h3>
                <p className="text-muted-foreground text-sm sm:text-base relative z-10">
                  End-to-end optimization of online retail operations, inventory management, and marketplace performance to drive revenue growth and operational efficiency.
                </p>
              </div>

              <div className="group relative p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 transition-colors duration-300"></div>
                <FiCode className="h-8 w-8 text-primary mb-4 relative z-10" />
                <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">Data & Analytics</h3>
                <p className="text-muted-foreground text-sm sm:text-base relative z-10">
                  Transforming complex datasets into actionable business intelligence using advanced analytics, predictive modeling, and custom dashboard development.
                </p>
              </div>

              <div className="group relative p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 transition-colors duration-300"></div>
                <FiTrendingUp className="h-8 w-8 text-primary mb-4 relative z-10" />
                <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">Marketplace Strategy</h3>
                <p className="text-muted-foreground text-sm sm:text-base relative z-10">
                  Data-driven marketplace strategies that optimize product positioning, pricing, and promotions to maximize visibility and conversion rates.
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
