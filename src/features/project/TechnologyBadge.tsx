import React from 'react';
import { cn } from '@/utils/cn';

interface TechnologyBadgeProps {
  name: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
  name,
  className,
  variant = 'default',
  size = 'md',
}) => {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full transition-colors whitespace-nowrap';

  const variantStyles = {
    default: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700/90 border border-gray-200/60 dark:border-gray-600/40 shadow-sm hover:shadow-md transition-all duration-200',
    outline: 'bg-white/70 dark:bg-gray-800/80 backdrop-blur-lg text-gray-800 dark:text-gray-100 hover:bg-white/90 dark:hover:bg-gray-700/80 border-2 border-gray-200/50 dark:border-gray-600/40 shadow-sm hover:shadow-md transition-all duration-200',
    secondary: 'bg-primary-100/90 dark:bg-primary-900/80 backdrop-blur-lg text-primary-800 dark:text-primary-100 hover:bg-primary-200/90 dark:hover:bg-primary-800/90 border border-primary-200/70 dark:border-primary-700/50 shadow-sm hover:shadow-md transition-all duration-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm font-medium',
    lg: 'px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base font-medium',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {name}
    </span>
  );
};
