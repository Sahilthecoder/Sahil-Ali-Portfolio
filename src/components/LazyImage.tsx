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
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
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
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Simple fallback to a solid color
  const fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiA2YzcyOGQiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';

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

  // Handle image load error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (!img.src.startsWith('data:')) {
      img.src = fallbackSrc;
      setError(true);
    }
  };

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

  // Use the fallback source if there was an error
  const imageSource = error ? fallbackSrc : src;

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
          backgroundImage: `url(${isVisible && !error ? src : fallbackSrc})`,
          backgroundColor: isVisible && !error ? 'transparent' : '#f3f4f6',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
      className={`relative inline-block ${className}`}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        lineHeight: 0, // Removes extra space below the image
      }}
    >
      {isVisible ? (
        <>
          <motion.img
            src={imageSource}
            alt={alt}
            loading="lazy"
            className={`block w-full h-full object-cover transition-opacity duration-300 ${
              hasLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: width || '100%',
              height: height || '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              cursor: onClick ? 'pointer' : 'default'
            }}
            onLoad={() => setHasLoaded(true)}
            onError={handleError}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: hasLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
          />
          {!hasLoaded && <Loader />}
        </>
      ) : (
        <div className="w-full h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
