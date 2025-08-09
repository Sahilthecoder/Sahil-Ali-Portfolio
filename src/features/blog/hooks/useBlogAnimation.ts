import { Variants } from 'framer-motion';

export const useBlogAnimation = () => {
  // Fade in with slight upward movement
  const fadeInUp: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Stagger children with delay
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Scale up on hover
  const hoverScale = {
    scale: 1.02,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 10 
    },
  };

  return {
    fadeInUp,
    staggerContainer,
    hoverScale,
  };
};

export default useBlogAnimation;
