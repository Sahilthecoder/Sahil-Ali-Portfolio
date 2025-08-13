import { Variants } from 'framer-motion';

// Animation variants with reduced motion support
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

// Item variants for staggered animations
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 150,
      mass: 0.8,
    },
  },
};

// Fade in up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Scale variants for interactive elements
export const scaleVariants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  },
  hover: { 
    scale: 1.02,
    y: -2,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    transition: { 
      type: 'spring', 
      stiffness: 400,
      damping: 15,
      mass: 0.8
    } 
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20
    }
  }
};

// Helper function to handle reduced motion preferences
export const getAnimationVariants = (baseVariants: any) => {
  if (typeof window === 'undefined') return baseVariants;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, visible: { opacity: 1 } }
    : baseVariants;
};
