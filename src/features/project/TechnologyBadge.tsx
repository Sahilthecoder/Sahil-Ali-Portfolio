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
    default: 'bg-background/80 dark:bg-card/90 backdrop-blur-sm text-foreground/90 dark:text-foreground hover:bg-background/90 dark:hover:bg-card/80 border border-border/30',
    outline: 'border border-border bg-background/50 dark:bg-card/60 backdrop-blur-sm text-foreground/90 hover:bg-background/70 dark:hover:bg-card/70',
    secondary: 'bg-primary/10 dark:bg-primary/20 backdrop-blur-sm text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {name}
    </span>
  );
};
