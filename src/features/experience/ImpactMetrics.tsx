import { motion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FiAward } from 'react-icons/fi';
import { SectionHeader } from '@/components/ui/AnimatedSection';

import { useExperienceAnimations } from '@/features/experience/hooks/useExperienceAnimations';

export interface MetricItem {
  id: string;
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface ImpactMetricsProps {
  metrics: MetricItem[];
  title?: string;
  description?: string;
  className?: string;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({
  metrics,
  title = 'Impact Metrics',
  description = 'Key achievements and professional growth',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { controls } = useExperienceAnimations(ref, {
    yOffset: 10,
    staggerDelay: 0.1,
    initialDelay: 0.2,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
  };

  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} className={`mt-16 ${className}`}>
      <SectionHeader
        title={title}
        subtitle={description}
      />

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            variants={itemVariants}
            custom={index + 1}
            className="bg-card text-card-foreground rounded border border-border p-6 shadow-sm"
          >
            <div className="flex items-center justify-center mb-4">
              {metric.icon || <FiAward className="h-6 w-6" />}
            </div>
            <h3 className="text-3xl font-bold mb-2">{metric.value}</h3>
            <p className="text-lg mb-2">{metric.label}</p>
            {metric.description && <p className="text-muted-foreground">{metric.description}</p>}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImpactMetrics;
