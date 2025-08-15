
import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, HashRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ThemeProvider } from './components/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import { Projects } from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import { lazy } from 'react'; 
const ProjectDetails = lazy(() => import('./pages/Projects/ProjectDetails'));
import TermsOfService from './pages/terms-of-service';
import PrivacyPolicy from './pages/privacy-policy';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/Navigation/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import EnhancedPageTransition from './components/animations/EnhancedPageTransition';
import SmoothScrollSystem from './components/common/SmoothScrollSystem';
import CustomCursor from './components/common/CustomCursor';
import MobileStabilizer from './components/common/MobileStabilizer';
import { PageSkeleton } from './components/common/LoadingSkeletons';

// Wrapper component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 50); // Reduced delay for faster initial render
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (isFirstRender) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EnhancedPageTransition><Home /></EnhancedPageTransition>} />
        <Route path="/about" element={<EnhancedPageTransition><About /></EnhancedPageTransition>} />
        <Route path="/experience" element={<EnhancedPageTransition><Experience /></EnhancedPageTransition>} />
        <Route path="/projects" element={<EnhancedPageTransition><Projects /></EnhancedPageTransition>} />
        <Route path="/projects/:id" element={<EnhancedPageTransition><LazyLoadingWrapper><ProjectDetails /></LazyLoadingWrapper></EnhancedPageTransition>} />
        <Route path="/contact" element={<EnhancedPageTransition><Contact /></EnhancedPageTransition>} />
        <Route path="/blog" element={<EnhancedPageTransition><Blog /></EnhancedPageTransition>} />
        <Route path="/terms-of-service" element={<EnhancedPageTransition><TermsOfService /></EnhancedPageTransition>} />
        <Route path="/privacy-policy" element={<EnhancedPageTransition><PrivacyPolicy /></EnhancedPageTransition>} />
        <Route path="*" element={<EnhancedPageTransition><NotFound /></EnhancedPageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// Enhanced loading wrapper for lazy components
const LazyLoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageSkeleton />
      </motion.div>
    }>
      {children}
    </Suspense>
  );
};

const App: React.FC = () => {
  // Enable smooth scrolling for all anchor links in the app
  useSmoothScroll();

  // Using HashRouter for GitHub Pages compatibility
  // No need for basename with HashRouter
  console.log('Using HashRouter for GitHub Pages');

  // Add mobile-specific styles
  useEffect(() => {
    // Prevent double-tap zoom on mobile
    const preventDoubleTapZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDoubleTapZoom, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDoubleTapZoom);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" enableSystem={true}>
      <ErrorBoundary>
        <HashRouter>
          <div className="app-container flex flex-col min-h-screen">
            <ThemeProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
                <GoogleAnalytics />
                <ConsentBanner />
                <CustomCursor />
                <MobileStabilizer />
                <SmoothScrollSystem />
                <Navigation>
                  <ScrollToTop />
                  <main className="flex-grow relative">
                    <ErrorBoundary>
                      <AnimatedRoutes />
                    </ErrorBoundary>
                  </main>
                  <Footer className="mt-auto" />
                </Navigation>
              </div>
            </ThemeProvider>
          </div>
        </HashRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
