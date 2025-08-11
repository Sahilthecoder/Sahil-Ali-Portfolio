'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiBriefcase, FiChevronDown, FiCode, FiMapPin, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { TbChartLine, TbTargetArrow } from 'react-icons/tb';

import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ThemeCard } from '@/components/ui/ThemeCard';
import { cn } from '@/lib/utils';

type MilestoneType = 'work' | 'education' | 'achievement' | 'project';

interface Milestone {
  id: number;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  location: string;
  type: MilestoneType;
  tags: string[];
  achievements?: string[];
  metrics?: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const PersonalStory = () => {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(0);

  const milestones: Milestone[] = [
    {
      id: 1,
      year: '2017',
      title: 'Field Executive & Accounts Assistant',
      subtitle: 'Financial Operations & Client Management',
      description: 'Managed end-to-end financial operations including client visits for EMI collections, KYC verification, and financial ledger reconciliation. Streamlined transaction processing using Tally and Excel, reducing processing time by 30%.',
      icon: FiBriefcase,
      location: 'Deewakar Finance Pvt. Ltd., India',
      type: 'work',
      tags: ['Tally', 'MS Excel', 'Financial Reporting', 'Compliance', 'Client Relations'],
      achievements: [
        'Reduced outstanding receivables by 25% through efficient collection strategies',
        'Implemented a digital documentation system that decreased processing time by 35%'
      ],
      metrics: [
        { label: 'Transactions Processed', value: '500+', icon: FiBarChart2 },
        { label: 'Client Satisfaction', value: '95%', icon: TbTargetArrow }
      ]
    },
    {
      id: 2,
      year: '2021',
      title: 'Warehouse Operations Certification',
      subtitle: 'DDUGKY Certified Professional',
      description: 'Completed intensive training in warehouse operations, logistics management, and inventory control. Gained hands-on experience in process optimization, stock management, and team coordination in a fast-paced environment.',
      icon: FiAward,
      location: 'Aayna Agrifarm Pvt. Ltd., India',
      type: 'education',
      tags: ['Inventory Management', 'Logistics', 'Process Optimization', 'FIFO', 'Stock Auditing'],
      achievements: [
        'Developed a streamlined inventory tracking system that reduced discrepancies by 40%',
        'Led a team of 5 staff members in daily warehouse operations'
      ]
    },
    {
      id: 3,
      year: '2022',
      title: 'Warehouse Supervisor',
      subtitle: 'Operations & Team Leadership',
      description: 'Directed warehouse operations, supervised a team of 8 staff members, and maintained 99.8% inventory accuracy. Implemented process improvements that increased operational efficiency by 25%.',
      icon: FiBriefcase,
      location: 'Arzt Health & Private Limited, India',
      type: 'work',
      tags: ['Team Leadership', 'Process Improvement', 'Inventory Control', 'Supply Chain', 'Quality Assurance'],
      metrics: [
        { label: 'Team Size', value: '8 Members', icon: FiTrendingUp },
        { label: 'Efficiency Gain', value: '25%', icon: TbChartLine }
      ]
    },
    {
      id: 4,
      year: '2022–2023',
      title: 'GRN & Inventory Officer',
      subtitle: 'Retail Operations Specialist',
      description: 'Managed Goods Receipt Notes (GRN) and maintained accurate inventory records for 500+ SKUs. Implemented FIFO system that reduced waste by 18% and improved stock turnover ratio.',
      icon: FiBriefcase,
      location: 'Bansal Supermarket, Surat, India',
      type: 'work',
      tags: ['Inventory Management', 'Retail Operations', 'SKU Management', 'FIFO', 'Vendor Relations'],
      achievements: [
        'Reduced inventory discrepancies by 30% through improved tracking',
        'Streamlined vendor communication, reducing order processing time by 40%'
      ]
    },
    {
      id: 5,
      year: '2023–Present',
      title: 'Inventory & Financial Specialist',
      subtitle: 'Operations & Process Automation',
      description: 'Spearhead inventory management and financial operations across multiple locations. Developed automated reporting systems that reduced manual work by 60% and improved data accuracy.',
      icon: FiBriefcase,
      location: 'Ekam Indian Groceries, Australia',
      type: 'work',
      tags: ['ERP Systems', 'Financial Analysis', 'Process Automation', 'Data Management', 'Reporting'],
      metrics: [
        { label: 'Process Automation', value: '60%', icon: TbChartLine },
        { label: 'Reporting Time Saved', value: '15h/Week', icon: FiTrendingUp }
      ]
    },
    {
      id: 6,
      year: '2024–Present',
      title: 'Data Analyst & Automation Specialist',
      subtitle: 'Freelance Professional',
      description: 'Leveraging data analytics and automation to solve complex business challenges. Specializing in Python, SQL, and modern data visualization tools to transform raw data into actionable insights and automated workflows.',
      icon: FiCode,
      location: 'Self-Employed',
      type: 'project',
      tags: ['Python', 'SQL', 'Data Visualization', 'Process Automation', 'AI Integration'],
      achievements: [
        'Developed custom data pipelines that process 10,000+ records daily',
        'Created interactive dashboards that improved decision-making speed by 50%'
      ],
      metrics: [
        { label: 'Data Volume', value: '10K+ Records/Day', icon: FiBarChart2 },
        { label: 'Efficiency Gain', value: '50%', icon: TbChartLine }
      ]
    }
  ];

  const toggleMilestone = (id: number) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const getTypeColor = (type: MilestoneType) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'education': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'achievement': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'project': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <AnimatedSection className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Professional Journey"
          subtitle="From finance to data: A story of continuous growth and transformation"
          className=""
        />

        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isExpanded = expandedMilestone === milestone.id;
              return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-8 ring-background">
                      <div className={cn(
                        "h-3 w-3 rounded-full transition-all duration-300",
                        isExpanded ? "scale-125 bg-primary" : "bg-primary/80"
                      )} />
                    </div>

                    <ThemeCard
                      className={cn(
                        "overflow-hidden transition-all duration-300 hover:shadow-md",
                        isExpanded 
                          ? "ring-2 ring-primary/20 shadow-lg" 
                          : "hover:ring-1 hover:ring-border"
                      )}
                      variant={isExpanded ? 'elevated' : 'outline'}
                    >
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className="w-full text-left focus:outline-none group"
                        aria-expanded={isExpanded}
                        aria-controls={`milestone-${milestone.id}-content`}
                      >
                        <div className="flex items-start justify-between p-5 sm:p-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl transition-all duration-300",
                                isExpanded 
                                  ? "bg-primary/10 text-primary scale-110" 
                                  : "bg-muted/50 text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
                              )}>
                                <Icon className="h-6 w-6" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                  <div>
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {milestone.title}
                                    </h3>
                                    {milestone.subtitle && (
                                      <p className="text-sm text-muted-foreground mt-0.5">
                                        {milestone.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(milestone.type)}`}>
                                      {milestone.type.charAt(0).toUpperCase() + milestone.type.slice(1)}
                                    </span>
                                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                                      {milestone.year}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-1.5 flex items-center text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <FiMapPin className="mr-1.5 h-4 w-4 flex-shrink-0 opacity-70" />
                                    <span>{milestone.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-4 flex-shrink-0 flex items-center">
                            <div className={cn(
                              "p-1 rounded-full transition-all duration-300",
                              isExpanded 
                                ? "bg-primary/10 text-primary rotate-180" 
                                : "text-muted-foreground group-hover:bg-muted/50"
                            )}>
                              <FiChevronDown className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`milestone-${milestone.id}-content`}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { opacity: 1, height: 'auto' },
                              collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="px-6 pb-6 -mt-2"
                          >
                            <div className="prose prose-sm prose-muted dark:prose-invert max-w-none">
                              <p className="text-muted-foreground mb-4">{milestone.description}</p>
                              
                              {milestone.achievements && milestone.achievements.length > 0 && (
                                <div className="mt-6 space-y-3">
                                  <h4 className="text-sm font-medium text-foreground flex items-center">
                                    <TbTargetArrow className="mr-2 h-4 w-4 text-primary" />
                                    Key Achievements
                                  </h4>
                                  <ul className="space-y-2 pl-6">
                                    {milestone.achievements.map((achievement, idx) => (
                                      <li key={idx} className="relative text-sm text-muted-foreground">
                                        <span className="absolute -left-4 top-2 h-1.5 w-1.5 rounded-full bg-primary/50" />
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {milestone.metrics && milestone.metrics.length > 0 && (
                                <div className="mt-6">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {milestone.metrics.map((metric, idx) => {
                                      const MetricIcon = metric.icon;
                                      return (
                                        <div key={idx} className="bg-muted/30 rounded-lg p-4">
                                          <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                              <MetricIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                              <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                                              <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {milestone.tags && milestone.tags.length > 0 && (
                              <div className="mt-6 pt-6 border-t border-border">
                                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                                  <FiCode className="mr-2 h-4 w-4 text-primary" />
                                  Key Skills & Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.tags.map((tag, idx) => (
                                    <SkillBadge
                                      key={`${milestone.id}-${idx}`}
                                      name={tag}
                                      className={cn(
                                        "text-xs py-1 px-2.5 transition-all duration-200",
                                        isExpanded 
                                          ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" 
                                          : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                                      )}
                                      variant="outline"
                                      size="sm"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ThemeCard>
                  </motion.div>
                );
            })}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-6">
              Want to know more about my professional background?
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            >
              Download My Resume
            </a>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PersonalStory;
