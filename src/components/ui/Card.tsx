import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-lg border backdrop-blur-md transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-white/10 dark:bg-gray-900/30 border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:shadow-primary/10',
        elevated:
          'bg-white/20 dark:bg-gray-900/40 border-white/30 dark:border-gray-600/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-100 transition-transform',
        outline: 'bg-white/5 dark:bg-gray-900/10 border-white/10 dark:border-gray-700/30 hover:border-primary/50',
        secondary: 'bg-secondary/10 dark:bg-secondary/5 border-secondary/20 hover:border-secondary/40',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      role={props.role ?? 'group'}
      tabIndex={props.tabIndex ?? 0}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight select-text',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
