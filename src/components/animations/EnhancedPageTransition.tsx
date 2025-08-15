import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface EnhancedPageTransitionProps {
  children: React.ReactNode;
}

// Check if device is mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: isMobile ? 20 : 10, // Slightly more movement on mobile for better visual feedback
    scale: isMobile ? 0.98 : 1, // Subtle zoom effect for mobile
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: isMobile ? 0.25 : 0.3, // Faster on mobile
      ease: [0.22, 1, 0.36, 1], // Smoother easing
      staggerChildren: isMobile ? 0.03 : 0.05, // Faster stagger on mobile
      delayChildren: isMobile ? 0.05 : 0.1, // Faster delay on mobile
      when: 'beforeChildren',
    }
  },
  out: {
    opacity: 0,
    y: isMobile ? -20 : -10, // Slightly more movement on mobile
    scale: isMobile ? 0.98 : 1, // Subtle zoom effect for mobile
    transition: {
      duration: isMobile ? 0.2 : 0.25, // Faster exit on mobile
      ease: [0.22, 1, 0.36, 1], // Match easing with enter animation
      when: 'afterChildren',
    }
  }
};

const loadingBarVariants = {
  initial: { 
    scaleX: 0,
    opacity: 0.8
  },
  animate: { 
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: isMobile ? 0.6 : 0.8, // Faster on mobile
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 // Slight delay to prevent flash on fast loads
    }
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: isMobile ? 0.2 : 0.25, // Faster exit on mobile
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const EnhancedPageTransition: React.FC<EnhancedPageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Loading Bar - Only show on non-mobile for better performance */}
      {!isMobile && (
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-primary to-primary/60"
              variants={loadingBarVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ transformOrigin: 'left', willChange: 'transform' }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="min-h-screen w-full overflow-x-hidden"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)'
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default EnhancedPageTransition;
