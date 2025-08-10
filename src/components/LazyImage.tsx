import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  background?: boolean;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
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
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up Intersection Observer
  useEffect(() => {
    if (!imageRef.current) return;

    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.01
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once the image is in view
          if (observerRef.current && imageRef.current) {
            observerRef.current.unobserve(imageRef.current);
          }
        }
      });
    };

    // Create new observer
    observerRef.current = new IntersectionObserver(handleIntersect, options);
    
    // Start observing
    observerRef.current.observe(imageRef.current);

    // Cleanup
    return () => {
      if (observerRef.current && imageRef.current) {
        observerRef.current.unobserve(imageRef.current);
      }
    };
  }, []);

  // Handle image loading when it becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => setHasLoaded(true);
    img.onerror = () => setError(true);
  }, [isVisible, src]);

  // Background image variant
  if (background) {
    return (
      <div 
        ref={imageRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width || '100%',
          height: height || '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: isVisible && !error 
            ? `url(${src})` 
            : placeholder 
              ? `url(${placeholder})` 
              : 'none',
          backgroundColor: '#f3f4f6',
        }}
      >
        {!hasLoaded && isVisible && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <FiLoader className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Regular image variant
  return (
    <div 
      ref={imageRef}
      className={`relative ${className}`}
      style={{
        width: width || '100%',
        height: height || 'auto',
        minHeight: height ? '1px' : undefined,
      }}
    >
      {isVisible ? (
        <>
          {!error ? (
            <motion.img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                hasLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setHasLoaded(true)}
              onError={() => setError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: hasLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              width={typeof width === 'number' ? width : undefined}
              height={typeof height === 'number' ? height : undefined}
            />
          ) : placeholder ? (
            <img 
              src={placeholder} 
              alt="Placeholder" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Image not available</span>
            </div>
          )}
          
          {!hasLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <FiLoader className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <FiLoader className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
