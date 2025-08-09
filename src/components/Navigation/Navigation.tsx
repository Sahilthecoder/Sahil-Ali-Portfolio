import React, { useState, useCallback, FC, ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import MobileMenu from './MobileMenu';

interface NavigationProps {
  children?: ReactNode;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const toggleMobileMenu = useCallback((): void => {
    setMobileMenuOpen(prevState => !prevState);
  }, []);
  
  const handleCloseMenu = useCallback((): void => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // Pixels to scroll before showing/hiding
      const headerHeight = header.offsetHeight;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > headerHeight) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }

      // Update scrolled state for shadow/background changes
      setIsScrolled(currentScrollY > 5);
      lastScrollY.current = currentScrollY;
    };

    // Add debounce to improve performance
    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Animation variants for the header
  const headerVariants = {
    visible: { 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    hidden: { 
      y: '-100%',
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
  };

  // Only hide header when scrolling down, show when scrolling up
  const shouldShowHeader = scrollDirection === 'up' || !isScrolled;

  return (
    <>
      <motion.div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        initial="visible"
        animate={shouldShowHeader ? 'visible' : 'hidden'}
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' }
        }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <Header onMenuToggle={toggleMobileMenu} isScrolled={isScrolled} />
      </motion.div>
      
      <AnimatePresence>
        <MobileMenu isOpen={mobileMenuOpen} onClose={handleCloseMenu} />
      </AnimatePresence>
      
      {children && (
        <div className="pt-16">
          {children}
        </div>
      )}
    </>
  )
};

export default Navigation;
