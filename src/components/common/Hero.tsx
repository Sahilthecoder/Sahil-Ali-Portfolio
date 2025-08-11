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
  title: React.ReactNode;
  subtitle?: string | React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImages?: string[];
  className?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  onCtaClick,
  backgroundImages = [],
  className = '',
  children,
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

  return (
    <div
      className={cn(
        'relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center text-white sm:min-h-[60vh]',
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {title && (
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">{title}</h1>
        )}
        {subtitle && (
          <p className="text-lg sm:text-xl text-gray-200 mb-6 drop-shadow">{subtitle}</p>
        )}

        {ctaText && onCtaClick && (
          <button
            type="button"
            onClick={onCtaClick}
            className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-accent/30 transition-all"
          >
            {ctaText}
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Hero;
