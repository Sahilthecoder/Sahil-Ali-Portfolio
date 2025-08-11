import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsError(true);
      return;
    }

    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    const handleError = () => {
      setIsError(true);
      setIsLoading(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  const imgClasses = cn(
    'transition-opacity duration-300',
    {
      'opacity-0': isLoading,
      'opacity-100': !isLoading,
    },
    className
  );

  const containerClasses = cn(
    'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
    containerClassName
  );

  // If image failed to load and we have a fallback, use it
  const finalSrc = isError ? (fallbackSrc || '') : imageSrc;

  return (
    <div className={containerClasses} style={{ width, height }}>
      <img
        {...props}
        src={finalSrc}
        alt={alt}
        className={imgClasses}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        style={{
          width: width ? '100%' : undefined,
          height: height ? '100%' : undefined,
          objectFit: 'cover',
        }}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
