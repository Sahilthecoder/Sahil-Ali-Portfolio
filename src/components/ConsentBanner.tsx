import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

export const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'granted') {
      // If consent was previously given, update Google Analytics
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
    }
  }, []);

  const handleAccept = () => {
    // Set consent in localStorage
    localStorage.setItem('cookie_consent', 'granted');
    
    // Update Google Tag Manager consent
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
    
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Set consent in localStorage
    localStorage.setItem('cookie_consent', 'denied');
    
    // Update Google Tag Manager consent
    window.gtag('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });
    
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4">
          <p className="text-sm">
            We use cookies to analyze site traffic and improve your experience. 
            By clicking Accept All, you consent to our use of cookies.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
          >
            Accept All
          </button>
          <button 
            onClick={handleDecline}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
};
