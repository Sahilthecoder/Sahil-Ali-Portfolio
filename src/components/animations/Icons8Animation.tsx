import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Icons8AnimationProps = {
  /** Name of the Icons8 animation */
  name: string;
  /** Color of the icon (CSS color value) */
  color?: string;
  /** Width of the icon (CSS size value) */
  width?: number | string;
  /** Height of the icon (CSS size value) */
  height?: number | string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Alt text for accessibility */
  alt?: string;
};

/**
 * Displays an Icons8 animation by name.
 * This is a simplified implementation that shows a placeholder.
 * For production, you would need to host the Icons8 animations
 * or use their API with proper attribution.
 */
const Icons8Animation: React.FC<Icons8AnimationProps> = ({
  name,
  color = 'currentColor',
  width = 100,
  height = 100,
  className = '',
  style,
  alt = 'Animated icon',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [name]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center justify-center bg-muted/20 rounded-lg',
        'transition-all duration-300 hover:scale-105',
        className
      )}
      style={{
        width,
        height,
        color,
        ...style,
      }}
      role="img"
      aria-label={alt}
      {...props}
    >
      <div className="text-center p-4">
        <div className="text-4xl mb-2">✨</div>
        <div className="text-xs text-muted-foreground">{name}</div>
      </div>
    </div>
  );
};

export default Icons8Animation;
