'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiChevronDown, FiChevronUp, FiCode, FiMapPin } from 'react-icons/fi';

import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ThemeCard } from '@/components/ui/ThemeCard';
import { useState } from 'react';

type Milestone = {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  location?: string;
  tags?: string[];
};

const PersonalStory = () => {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(0);

  const milestones: Milestone[] = [
    {
      id: 1,
      year: '2017',
      title: 'Field Executive & Accounts Assistant',
      description:
        'Visited clients for EMI collections, processed transactions in Tally & Excel, verified KYC documents, and supported financial ledger reconciliation.',
      icon: FiBriefcase,
      location: 'Deewakar Finance Pvt. Ltd.',
      tags: ['Tally', 'MS Excel', 'Loan Recovery', 'Compliance'],
    },
    {
      id: 2,
      year: '2021',
      title: 'Warehouse Supervisor Certification',
      description:
        'Earned certification in Warehouse Operations & Logistics Management under DDUGKY and learned process optimization and stock control.',
      icon: FiAward,
      location: 'Aayna Agrifarm Pvt. Ltd.',
      tags: ['Stock Logs', 'Inventory Audit', 'FIFO'],
    },
    {
      id: 3,
      year: '2022',
      title: 'Warehouse Supervisor',
      description:
        'Oversaw warehouse operations, led staff coordination, and maintained accurate stock documentation for training materials.',
      icon: FiBriefcase,
      location: 'Arzt Health & Private Limited',
      tags: ['Inventory Control', 'Process Optimization', 'Team Leadership'],
    },
    {
      id: 4,
      year: '2022–2023',
      title: 'GRN Officer',
      description:
        'Managed GRNs, MRP changes, SKU control, and ensured FIFO and register accuracy for 500+ items in a busy supermarket environment.',
      icon: FiBriefcase,
      location: 'Bansal Supermarket, Surat',
      tags: ['Goods Receipt', 'SKU Management', 'FIFO', 'Excel'],
    },
    {
      id: 5,
      year: '2023–Present',
      title: 'Inventory Specialist',
      description:
        'Handled invoices, cash flow tracking, ERP entries, and supplier reconciliations across dual stores while automating reporting.',
      icon: FiBriefcase,
      location: 'Ekam Indian Groceries, Australia',
      tags: ['ERP Software', 'Financial Reconciliation', 'Inventory Management'],
    },
    {
      id: 6,
      year: '2024–Present',
      title: 'Data Analyst & Automation Specialist',
      description:
        'Built a portfolio site, automated tasks using AI tools, created dashboards with Tableau & Notion, and streamlined workflows using Python and SQL.',
      icon: FiCode,
      location: 'Self-Employed',
      tags: ['AI Tools', 'Python', 'SQL', 'Automation'],
    },
  ];

  const toggleMilestone = (id: number) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  return (
    <AnimatedSection className="py-16 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="My Professional Journey"
          subtitle="Key milestones and experiences that shaped my career"
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isExpanded = expandedMilestone === milestone.id;
                const isLast = index === milestones.length - 1;

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-8 ring-background">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>

                    <ThemeCard
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'ring-2 ring-primary/20' : 'hover:ring-1 hover:ring-border'
                      }`}
                      variant={isExpanded ? 'elevated' : 'outline'}
                    >
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className="w-full text-left focus:outline-none"
                        aria-expanded={isExpanded}
                        aria-controls={`milestone-${milestone.id}-content`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="ml-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {milestone.title}
                                </h3>
                                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                  <span className="font-medium">{milestone.year}</span>
                                  {milestone.location && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <div className="flex items-center">
                                        <FiMapPin className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                                        <span>{milestone.location}</span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {isExpanded ? (
                              <FiChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <FiChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
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
                            className="mt-4 pt-4 border-t border-border"
                          >
                            <div className="prose prose-sm prose-muted dark:prose-invert max-w-none">
                              <p className="text-muted-foreground">{milestone.description}</p>
                            </div>

                            {milestone.tags && milestone.tags.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                  Key Skills:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.tags.map((tag) => (
                                    <SkillBadge
                                      key={tag}
                                      name={tag}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </SkillBadge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ThemeCard>

                    {!isLast && (
                      <div className="absolute left-4 top-full h-8 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
                    )}
                  </motion.div>
                );
              })}
            </div>
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
