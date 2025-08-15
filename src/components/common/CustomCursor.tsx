import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add hover effects for different elements
    const addHoverListeners = () => {
      // Links and buttons
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('hover'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Text elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('text'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Images and media
      const mediaElements = document.querySelectorAll('img, video');
      mediaElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('media'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Add listeners after a short delay to ensure DOM is ready
    const timer = setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  // Re-add listeners when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('hover'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('text'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      const mediaElements = document.querySelectorAll('img, video');
      mediaElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('media'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [window.location.pathname]);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      mixBlendMode: 'normal' as const
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      border: '2px solid rgba(59, 130, 246, 0.6)',
      mixBlendMode: 'multiply' as const
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      border: '2px solid rgba(99, 102, 241, 0.4)',
      mixBlendMode: 'normal' as const
    },
    media: {
      scale: 2,
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      border: '2px solid rgba(168, 85, 247, 0.4)',
      mixBlendMode: 'multiply' as const
    }
  };

  // Only show on desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
          variants={variants}
          animate={cursorVariant}
          initial="default"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
            mass: 0.5
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
