import * as React from 'react';
import { motion } from 'framer-motion';

// Professional, fast-loading Unsplash images with quality & crop params
const DEFAULT_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70',
  'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=1920&q=70',
  'https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?auto=format&fit=crop&w=1920&q=70',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=70'
];

interface HeroProps {
  title: React.ReactNode | string;
  subtitle?: string | React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImages?: string[];
  className?: string;
  children?: React.ReactNode;
  titleVariant?: 'gradient' | 'solid';
  align?: 'left' | 'center' | 'right';
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  overlay?: 'light' | 'dark' | 'none';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  onCtaClick,
  backgroundImages = [],
  className = '',
  children,
  titleVariant = 'gradient',
  align = 'center',
  height = 'md',
  overlay = 'dark',
}) => {
  const [bgImage, setBgImage] = React.useState<string | undefined>();
  const [lowResImage, setLowResImage] = React.useState<string | undefined>();

  React.useEffect(() => {
    const images = backgroundImages.length > 0 ? backgroundImages : DEFAULT_BACKGROUNDS;
    const selectedImage = images[Math.floor(Math.random() * images.length)];

    // Load low-res first
    const lowRes = `${selectedImage}&w=20&q=10&blur=50`;
    setLowResImage(lowRes);

    // Then preload high-res
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => setBgImage(selectedImage);
  }, [backgroundImages]);

  const cn = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(' ');

  // Height classes
  const heightClasses = {
    'sm': 'min-h-[40vh]',
    'md': 'min-h-[50vh]',
    'lg': 'min-h-[60vh]',
    'xl': 'min-h-[75vh]',
    'full': 'min-h-screen',
  } as const;

  // Alignment classes
  const alignClasses = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right',
  } as const;

  // Overlay classes
  const overlayClasses = {
    'light': 'bg-gradient-to-b from-white/30 via-white/10 to-black/10',
    'dark': 'bg-gradient-to-b from-black/30 via-black/50 to-black/70',
    'none': '',
  } as const;
// Process title
const renderTitle = () => {
  if (typeof title === 'string') {
    return titleVariant === 'gradient' ? (
      <span
        className="
          bg-gradient-to-r from-blue-500 to-teal-400
          bg-clip-text text-transparent
          font-bold
          drop-shadow-md
          dark:drop-shadow-lg
        "
        style={{ WebkitTextFillColor: 'transparent' }}
      >
        {title}
      </span>
    ) : (
      <span
        className="
          text-white
          font-semibold
          drop-shadow-lg
          dark:text-blue-400
        "
      >
        {title}
      </span>
    );
  }
  return title;
};

  // Helper function to safely get class from object with fallback
  const getClass = <T extends Record<string, string>>(obj: T, key: keyof T, fallback: string): string => {
    return obj[key] || fallback;
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col justify-center overflow-hidden px-4 py-12 text-white',
        getClass(heightClasses, height, 'min-h-[50vh]'),
        getClass(alignClasses, align, 'items-center text-center'),
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {/* Gradient Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

        {/* Blurred low-res placeholder */}
        {lowResImage && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${lowResImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.1)',
            } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* High-res image with fade-in */}
        {bgImage && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7) contrast(1.05)',
            } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Overlay gradient */}
        <div className={`absolute inset-0 ${getClass(overlayClasses, overlay, '')}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className={cn(
          'max-w-4xl',
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto'
        )}>
          {title && (
            <motion.h1 
              className={cn(
                'font-extrabold mb-4',
                'text-4xl sm:text-5xl md:text-6xl',
                titleVariant === 'gradient' ? 'text-blue-800 dark:text-white' : 'text-blue-800 dark:text-white',
                'animate-gradient'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {renderTitle()}
            </motion.h1>
          )}
          {subtitle && (
            <motion.div 
              className={cn(
                'text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed',
                align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '',
                'max-w-3xl'
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
              {subtitle}
            </motion.div>
          )}

          <div className="space-y-6">
            {ctaText && onCtaClick && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-accent/30 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50"
                >
                  {ctaText}
                </button>
              </motion.div>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
