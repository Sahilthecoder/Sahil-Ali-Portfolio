import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import {
  FiArrowRight,
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiExternalLink
} from 'react-icons/fi';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'white'
  | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonIcon =
  | 'arrow-right'
  | 'download'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'external'
  | 'view'
  | null;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const iconMap = {
  'arrow-right': FiArrowRight,
  download: FiDownload,
  mail: FiMail,
  github: FiGithub,
  linkedin: FiLinkedin,
  external: FiExternalLink,
  view: FiExternalLink
};

const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none touch-manipulation active:scale-95';

// Using your new palette & gradients from globals.css
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-primary text-primary-foreground hover:brightness-110 focus-visible:ring-primary/50 shadow-lg hover:shadow-xl active:brightness-95 transition-all duration-300',
  secondary:
    'bg-gradient-secondary text-secondary-foreground hover:brightness-110 focus-visible:ring-secondary/50 shadow-lg hover:shadow-xl active:brightness-95 transition-all duration-300',
  outline:
    'border-2 border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary/30 active:bg-primary/20 transition-all duration-300',
  ghost:
    'text-foreground hover:bg-muted/50 focus-visible:ring-muted/40 active:bg-muted/70 transition-all duration-300',
  link: 'text-primary hover:underline p-0 h-auto transition-colors duration-300 active:opacity-80',
  white:
    'bg-white text-foreground hover:bg-gray-100 focus-visible:ring-primary/40 shadow-md hover:shadow-lg active:bg-gray-200 transition-all duration-300',
  dark:
    'bg-foreground text-background hover:brightness-90 focus-visible:ring-primary/40 shadow-md hover:shadow-lg active:brightness-80 transition-all duration-300'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs sm:text-sm px-3 py-1.5',
  md: 'text-sm sm:text-base px-4 py-2',
  lg: 'text-base sm:text-lg px-6 py-3'
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
  md: 'w-4 h-4 sm:w-5 sm:h-5',
  lg: 'w-5 h-5 sm:w-6 sm:h-6'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon = null,
      iconPosition = 'right',
      fullWidth = false,
      isLoading = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = icon ? iconMap[icon] : null;
    const iconClass = `${iconSizeStyles[size]} ${
      children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''
    }`;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          fullWidth ? 'w-full' : ''
        } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          <>
            {icon && iconPosition === 'left' && IconComponent && (
              <IconComponent className={iconClass} />
            )}
            {children}
            {icon && iconPosition === 'right' && IconComponent && (
              <IconComponent className={iconClass} />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonVariant, ButtonSize, ButtonIcon };
