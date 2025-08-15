import React, { useEffect } from 'react';

// Add mobile-specific styles to prevent layout shifts
export const mobileStyles = `
  @media (max-width: 768px) {
    html, body {
      position: fixed;
      overflow: hidden;
      width: 100%;
      height: 100%;
      overscroll-behavior-y: contain;
    }
    
    #root {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    
    .page-transition-container {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }
  }
`;

/**
 * MobileStabilizer - Prevents mobile rendering flicker and layout shifts
 * This component applies mobile-specific optimizations to prevent screen rendering issues
 */
const MobileStabilizer: React.FC = () => {
  useEffect(() => {
    // Add mobile styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = mobileStyles;
    document.head.appendChild(styleElement);

    // Prevent iOS Safari viewport jumping
    const handleViewportChange = () => {
      // Set viewport height variable for consistent mobile viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Ensure the app fills the viewport
      const appElement = document.getElementById('root');
      if (appElement) {
        appElement.style.height = '100%';
        appElement.style.width = '100%';
      }
    };

    // Initial viewport setup
    handleViewportChange();

    // Handle viewport changes on mobile
    const handleResize = () => {
      handleViewportChange();
      // Force reflow to prevent layout shifts
      if (document.documentElement) {
        document.documentElement.style.overflow = 'hidden';
        // Small delay to ensure the layout is stable
        setTimeout(() => {
          if (document.documentElement) {
            document.documentElement.style.overflow = '';
          }
        }, 50);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    const handleOrientationChange = () => {
      // Small delay to let orientation change complete
      setTimeout(handleResize, 150);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.head.removeChild(styleElement);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileStabilizer;
