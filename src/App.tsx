
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, HashRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ThemeProvider } from './components/ThemeProvider';
import { PasswordProtectionProvider } from '@/contexts/PasswordProtectionContext';
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

// Wrapper component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isFirstRender) {
    return (
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// Page transition component with smooth swiper effect
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ x: '30px', opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      exit={{ 
        x: '-30px',
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  // Enable smooth scrolling for all anchor links in the app
  useSmoothScroll();

  // Using HashRouter for GitHub Pages compatibility
  // No need for basename with HashRouter
  console.log('Using HashRouter for GitHub Pages');

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" enableSystem={true}>
      <ErrorBoundary>
        <PasswordProtectionProvider>
          <HashRouter>
            <div className="app-container flex flex-col min-h-screen">
              <ThemeProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                  <GoogleAnalytics />
                  <Navigation>
                    <ScrollToTop />
                    <main className="flex-grow">
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
        </PasswordProtectionProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
