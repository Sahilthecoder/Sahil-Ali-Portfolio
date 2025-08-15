import React, { Suspense, lazy } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
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
const ProjectDetails = lazy(() => import('./pages/Projects/ProjectDetails'));
import TermsOfService from './pages/terms-of-service';
import PrivacyPolicy from './pages/privacy-policy';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/Navigation/Footer';
import { ConsentBanner } from './components/ConsentBanner';
import CustomCursor from './components/common/CustomCursor';

// Simple Routes component without animations
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<LazyLoadingWrapper><ProjectDetails /></LazyLoadingWrapper>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Simple loading wrapper for lazy components
const LazyLoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      {children}
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" enableSystem={true}>
      <ErrorBoundary>
        <HashRouter>
          <div className="app-container flex flex-col min-h-screen">
            <ThemeProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900">
                <GoogleAnalytics />
                <ConsentBanner />
                <CustomCursor />
                <Navigation>
                  <ScrollToTop />
                  <main className="flex-grow">
                    <ErrorBoundary>
                      <AppRoutes />
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