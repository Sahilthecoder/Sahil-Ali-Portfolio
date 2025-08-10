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

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
    <FiLoader className="w-6 h-6 text-gray-400 animate-spin" />
  </div>
);

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

  // Generate random Unsplash fallback image
  const randomFallback = `https://source.unsplash.com/random/800x600?sig=${Math.floor(
    Math.random() * 1000
  )}`;

  // Intersection Observer setup
  useEffect(() => {
    if (!imageRef.current) return;

    const options = { root: null, rootMargin: '200px', threshold: 0.01 };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.unobserve(entry.target as Element);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    observerRef.current.observe(imageRef.current);

    return () => {
      if (observerRef.current && imageRef.current) {
        observerRef.current.unobserve(imageRef.current);
      }
    };
  }, []);

  // Preload image when visible
  useEffect(() => {
    let isMounted = true;
    if (!isVisible) return;

    const img = new Image();
    img.src = src;
    img.onload = () => isMounted && setHasLoaded(true);
    img.onerror = () => isMounted && setError(true);

    return () => {
      isMounted = false;
    };
  }, [isVisible, src]);

  // Background image variant
  if (background) {
    return (
      <div
        ref={imageRef}
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width || '100%',
          height: height || '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage:
            isVisible && !error
              ? `url(${src})`
              : `url(${placeholder || randomFallback})`,
          backgroundColor: '#f3f4f6'
        }}
      >
        {!hasLoaded && isVisible && !error && <Loader />}
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
        minHeight: height ? '1px' : undefined
      }}
    >
      {isVisible ? (
        <>
          <motion.img
            src={!error ? src : placeholder || randomFallback}
            alt={alt}
            loading="lazy"
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
          {!hasLoaded && <Loader />}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LazyImage;
