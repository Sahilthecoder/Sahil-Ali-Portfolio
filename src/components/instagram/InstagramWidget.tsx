import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

const InstagramWidget: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const widgetId = 'c881c4238c235d4099256fb56a8b81e5';

  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load the LightWidget script with error handling
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load LightWidget script');
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <iframe
        src={`https://lightwidget.com/widgets/${widgetId}.html?theme=${isDarkMode ? 'dark' : 'light'}`}
        scrolling="no"
        className="lightwidget-widget rounded-lg shadow-sm border border-border"
        style={{
          width: '100%',
          border: 0,
          overflow: 'hidden',
          minHeight: '400px',
          background: 'transparent',
        }}
        title="Instagram Feed"
        loading="lazy"
        onError={(e) => {
          console.error('Failed to load Instagram widget');
          // Optionally show a fallback UI
          const container = e.currentTarget.parentElement;
          if (container) {
            container.innerHTML = `
              <div class="bg-muted/50 rounded-lg p-8 text-center">
                <h3 class="text-lg font-medium mb-2">Instagram Feed Unavailable</h3>
                <p class="text-muted-foreground mb-4">Couldn't load Instagram feed. Please check your connection or visit my Instagram profile directly.</p>
                <a 
                  href="https://instagram.com/hey___sahilll" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  View on Instagram
                </a>
              </div>
            `;
          }
        }}
      />
    </div>
  );
};

export default InstagramWidget;
