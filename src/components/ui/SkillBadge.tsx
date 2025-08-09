import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const SkillBadge = ({
  name,
  icon,
  className = '',
  variant = 'default',
  size = 'md',
  children,
}: SkillBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const variantClasses = {
    default: 'bg-primary/10 text-primary hover:bg-primary/20',
    outline: 'border border-border bg-transparent hover:border-primary/50',
    ghost: 'bg-transparent hover:bg-muted/50',
  };

  return (
    <motion.span
      whileHover={{ y: -2 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children || name}
    </motion.span>
  );
};
