import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ThemeCardProps {
  title?: string;
  description?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'elevated';
  hoverEffect?: 'grow' | 'float' | 'none';
  children?: ReactNode;
}

const hoverEffects: Record<string, Variants> = {
  grow: {
    hover: { 
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  },
  float: {
    hover: { 
      y: -8,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  },
  none: {}
};

export const ThemeCard = ({
  title,
  description,
  icon,
  className = '',
  variant = 'default',
  hoverEffect = 'grow',
  children,
}: ThemeCardProps) => {
  const variantClasses = {
    default: 'bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40',
    outline: 'backdrop-blur-md border border-white/10 dark:border-gray-700/50 bg-white/5 dark:bg-gray-900/10 hover:border-primary/50',
    elevated: 'backdrop-blur-lg bg-white/20 dark:bg-gray-900/40 shadow-xl border-white/30 dark:border-gray-600/50 hover:shadow-2xl hover:shadow-primary/20',
  };

  return (
    <motion.div
      initial={false}
      whileHover={hoverEffect !== 'none' ? 'hover' : undefined}
      variants={hoverEffects[hoverEffect]}
      className={`group relative overflow-hidden rounded-xl p-6 transition-all ${variantClasses[variant]} ${className}`}
    >
      {variant === 'default' && (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
            {icon}
          </div>
        )}
        {title && <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>}
        {description && <div className="text-muted-foreground">{description}</div>}
        {children}
      </div>
    </motion.div>
  );
};
