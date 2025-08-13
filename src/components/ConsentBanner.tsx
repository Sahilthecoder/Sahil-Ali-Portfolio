import { useEffect, useState } from 'react';

// Define the consent types for better type safety
type ConsentType = 'granted' | 'denied' | null;

// Check if user is in a region that requires consent (GDPR)
const requiresConsent = (): boolean => {
  // This is a simple implementation. Consider using a more robust solution
  // like a geolocation service for production use.
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO'
  ];
  
  // Check if user's country is in the EU
  // Note: This is a client-side check. For production, use a server-side solution
  // or a dedicated geolocation service
  const userCountry = ''; // You can implement geolocation here
  
  // Default to showing banner if we can't determine location
  return !userCountry || euCountries.includes(userCountry);
};

export const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  // Removed unused isLoading state as it's not being used in the component

  // Initialize consent on component mount
  useEffect(() => {
    const initializeConsent = () => {
      const consent = localStorage.getItem('cookie_consent') as ConsentType;
      
      if (consent === null && requiresConsent()) {
        // Show banner if no consent and in a region that requires it
        setShowBanner(true);
      } else if (consent === 'granted') {
        // If consent was previously given, update Google Analytics
        updateConsent('granted');
      } else {
        // Default to denied if no consent
        updateConsent('denied');
      }
      
      // Removed setIsLoading as it's no longer needed
    };

    // Small delay to ensure gtag is loaded
    const timer = setTimeout(initializeConsent, 500);
    return () => clearTimeout(timer);
  }, []);

  // Update consent in both localStorage and gtag
  const updateConsent = (status: 'granted' | 'denied') => {
    // Save to localStorage
    localStorage.setItem('cookie_consent', status);
    
    // Update Google Analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: status,
        analytics_storage: status,
        functionality_storage: status,
        security_storage: status === 'granted' ? 'granted' : 'denied'
      });
    }
    
    // Log for debugging
    console.log(`Consent updated to: ${status}`);
  };

  const handleAccept = () => {
    updateConsent('granted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    updateConsent('denied');
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
