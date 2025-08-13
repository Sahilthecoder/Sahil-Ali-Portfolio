import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animated section divider component with reduced motion support
 */
export const SectionDivider = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: shouldReduceMotion ? '100%' : 96 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      }}
      className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto my-12 md:my-16"
      role="separator"
      aria-label="Section divider"
    />
  );
};

export default SectionDivider;
