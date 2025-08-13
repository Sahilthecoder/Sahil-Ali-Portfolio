import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../utils/analytics';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track pageview when the route changes
    pageview(window.location.pathname + window.location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
