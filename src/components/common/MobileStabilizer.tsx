import React, { useEffect } from 'react';

// Check if device is iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

/**
 * MobileStabilizer - Prevents mobile rendering flicker and layout shifts
 * This component applies mobile-specific optimizations to prevent screen rendering issues
 */
const MobileStabilizer: React.FC = () => {
  useEffect(() => {
    if (!isMobile) return;

    // Prevent iOS Safari viewport jumping
    const handleViewportChange = () => {
      // Set viewport height variable for consistent mobile viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Fix for iOS viewport height bug
      const appHeight = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${appHeight}px`);
    };

    // Initial viewport setup with debounce
    const initialTimer = setTimeout(handleViewportChange, 100);

    // Handle viewport changes on mobile with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleViewportChange, 100);
    };

    // Add event listeners with passive true for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Handle orientation changes with a slight delay
    const handleOrientationChange = () => {
      setTimeout(handleViewportChange, 150);
    };
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    // Prevent rubber band scrolling on iOS
    const preventOverscroll = (e: TouchEvent) => {
      // Only prevent default for elements that don't scroll
      const target = e.target as HTMLElement;
      const isScrollable = target.scrollHeight > target.clientHeight;
      
      if (isScrollable) return;
      
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const height = window.innerHeight;
      
      // Only prevent default when at the top or bottom of the page
      if ((scrollTop <= 0 && e.touches[0].clientY > 0) || 
          (scrollTop + height >= scrollHeight && e.touches[0].clientY < 0)) {
        e.preventDefault();
      }
    };

    // Add touch event listeners for iOS with passive: false for preventDefault to work
    if (isIOS) {
      document.addEventListener('touchstart', preventOverscroll, { passive: false });
      document.addEventListener('touchmove', preventOverscroll, { passive: false });
    }

    // Add CSS for mobile optimizations
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: none;
        position: fixed;
        overflow: hidden;
        width: 100%;
        height: 100%;
        height: -webkit-fill-available;
        height: var(--app-height, 100vh);
      }
      
      #root {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      if (isIOS) {
        document.removeEventListener('touchstart', preventOverscroll);
        document.removeEventListener('touchmove', preventOverscroll);
      }
      
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileStabilizer;
