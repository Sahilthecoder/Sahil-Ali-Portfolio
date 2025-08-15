import React, { useEffect } from 'react';

/**
 * MobileStabilizer - Prevents mobile rendering flicker and layout shifts
 * This component applies mobile-specific optimizations to prevent screen rendering issues
 */
const MobileStabilizer: React.FC = () => {
  useEffect(() => {
    // Prevent iOS Safari viewport jumping
    const handleViewportChange = () => {
      // Set viewport height variable for consistent mobile viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial viewport setup
    handleViewportChange();

    // Handle viewport changes on mobile
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
      // Small delay to let orientation change complete
      setTimeout(handleViewportChange, 100);
    });

    // Prevent rubber band scrolling on iOS
    const preventOverscroll = (e: TouchEvent) => {
      const target = e.target as Element;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const height = window.innerHeight;
      
      // Prevent overscroll at top and bottom
      if ((scrollTop === 0 && e.deltaY < 0) || 
          (scrollTop + height >= scrollHeight && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    // Add touch event listeners for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      document.addEventListener('touchstart', preventOverscroll, { passive: false });
      document.addEventListener('touchmove', preventOverscroll, { passive: false });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.removeEventListener('touchstart', preventOverscroll);
        document.removeEventListener('touchmove', preventOverscroll);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileStabilizer;
