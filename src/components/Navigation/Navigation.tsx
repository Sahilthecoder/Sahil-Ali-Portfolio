import React, { useState, useCallback, FC, ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from './Footer';

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
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }
    },
    hidden: { 
      y: '-100%',
      opacity: 0,
      transition: { 
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }
    },
  };

  // Only hide header when scrolling down, show when scrolling up
  // Add a small delay before hiding to prevent flickering on small scrolls
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShowHeader(scrollDirection === 'up' || !isScrolled);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [scrollDirection, isScrolled]);

  return (
    <>
      <motion.div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        initial="visible"
        animate={shouldShowHeader ? 'visible' : 'hidden'}
        variants={headerVariants}
      >
        <Header 
          onMenuToggle={toggleMobileMenu} 
          isScrolled={isScrolled} 
        />
      </motion.div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={handleCloseMenu} 
          />
        )}
      </AnimatePresence>
      
      {/* Main content wrapper with responsive padding for fixed header */}
      <div className="pt-16 sm:pt-20">
        {children}
      </div>
      
      <Footer />
      
      {/* Global styles are now handled in index.css */}
    </>
  )
};

export default Navigation;
