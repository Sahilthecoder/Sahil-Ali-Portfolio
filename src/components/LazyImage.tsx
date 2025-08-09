import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  background?: boolean;
  width?: number;
  height?: number;
  placeholder?: string; // Optional placeholder image URL
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  background = false,
  width,
  height,
  placeholder
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const imageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    
    // Small delay to ensure the component is properly mounted
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          root: null,
          rootMargin: '100px', // Start loading when within 100px of viewport
          threshold: 0.01
        }
      );

      observer.observe(imageRef.current!);

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [src]); // Re-run effect if src changes

  const handleLoad = () => {
    setHasLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (background) {
    return (
      <div
        ref={imageRef}
        className={`relative ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
          {!hasLoaded && !error && (
            <motion.div
              key="placeholder"
              className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          key="image"
          className="absolute inset-0"
          style={{
            backgroundImage: hasLoaded ? `url(${src})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: hasLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hasLoaded ? 1 : 0 }}
        />

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            <FiLoader className="animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
      }}
    >
      <AnimatePresence>
        {!hasLoaded && !error && (
          <motion.div
            key="placeholder"
            className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiLoader className="animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {mounted && isVisible && (
        <motion.img
          key={`img-${src}`}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 object-cover ${className}`}
          style={{
            opacity: hasLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hasLoaded ? 1 : 0 }}
        />
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <FiLoader className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
