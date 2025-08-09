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

  // Load the LightWidget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
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
        src={`//lightwidget.com/widgets/${widgetId}.html?theme=${isDarkMode ? 'dark' : 'light'}`}
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
      />
    </div>
  );
};

export default InstagramWidget;
