import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface EnhancedPageTransitionProps {
  children: React.ReactNode;
}

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const loadingBarVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: 0.3,
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

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Simplified transitions for mobile
  const mobileVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    out: { 
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="page-transition-container">
      {/* Loading Bar - Only show on desktop */}
      {!isMobile && (
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary to-primary/60"
              variants={loadingBarVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ transformOrigin: 'left' }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        variants={isMobile ? mobileVariants : pageTransitionVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="min-h-screen w-full"
        style={{
          // Prevent layout shifts during transitions
          position: 'relative',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default EnhancedPageTransition;
