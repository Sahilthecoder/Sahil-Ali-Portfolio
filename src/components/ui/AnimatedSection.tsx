import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = '',
  delay = 0.1,
}: AnimatedSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const SectionHeader = ({
  title,
  subtitle,
  className = '',
  id,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 id={id} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
