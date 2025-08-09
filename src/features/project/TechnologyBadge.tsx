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
    default: 'bg-primary/10 text-primary hover:bg-primary/20',
    outline: 'border border-border text-foreground hover:bg-accent/50',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
