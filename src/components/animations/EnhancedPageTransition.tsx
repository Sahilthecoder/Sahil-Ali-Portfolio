import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface EnhancedPageTransitionProps {
  children: React.ReactNode;
}

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
    filter: 'blur(4px)'
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  out: {
    opacity: 0,
    scale: 1.02,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
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

  return (
    <>
      {/* Loading Bar */}
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

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default EnhancedPageTransition;
