import React, { Suspense, lazy, useCallback, memo } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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

// Lazy load components with preload hints
const ProjectDetails = lazy(() => import(/* webpackPrefetch: true */ './pages/Projects/ProjectDetails'));
const TermsOfService = lazy(() => import(/* webpackPrefetch: true */ './pages/terms-of-service'));
const PrivacyPolicy = lazy(() => import(/* webpackPrefetch: true */ './pages/privacy-policy'));

import { ErrorBoundary } from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/Navigation/Footer';
import CustomCursor from './components/common/CustomCursor';

// Loading component with better UX
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
});

// Error boundary fallback component
const ErrorFallback = memo(function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
});

// Skip to main content link
const SkipToContent = memo(function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white dark:bg-gray-900 px-4 py-2 rounded-md shadow-lg text-blue-600 dark:text-blue-400 font-medium"
    >
      Skip to content
    </a>
  );
});

// Structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sahil Ali",
  "url": "https://sahil-ali.vercel.app",
  "sameAs": [
    "https://github.com/sahilthecoder",
    "https://www.linkedin.com/in/sahil-ali-714867242"
  ],
  "jobTitle": "Full Stack Developer"
};

// Memoized Routes component with error boundaries and proper loading states
const AppRoutes = memo(function AppRoutes() {
  const renderWithSuspense = useCallback((Component: React.ComponentType) => (
    <ErrorBoundary fallback={<ErrorFallback error={new Error()} resetErrorBoundary={() => window.location.reload()} />}>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  ), []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route 
        path="/projects/:id" 
        element={renderWithSuspense(ProjectDetails)} 
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route 
        path="/terms-of-service" 
        element={renderWithSuspense(TermsOfService)} 
      />
      <Route 
        path="/privacy-policy" 
        element={renderWithSuspense(PrivacyPolicy)} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});
AppRoutes.displayName = 'AppRoutes';


const App: React.FC = () => {
  // Add structured data to document head
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" enableSystem={true}>
      <ErrorBoundary fallback={<ErrorFallback error={new Error()} resetErrorBoundary={() => window.location.reload()} />}>
        <HelmetProvider>
          <HashRouter>
            <div className="app-container flex flex-col min-h-screen">
              <ThemeProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900">
                  <GoogleAnalytics />
                  <CustomCursor />
                  <SkipToContent />
                  <Navigation>
                    <ScrollToTop />
                    <main id="main-content" className="flex-grow" tabIndex={-1}>
                      <AppRoutes />
                    </main>
                    <Footer className="mt-auto" />
                  </Navigation>
                </div>
              </ThemeProvider>
            </div>
          </HashRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;