import { useEffect, useState } from 'react';

type GTagConsentParams = {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
  personalization_storage?: 'granted' | 'denied';
};

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: GTagConsentParams) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie_consent');
    
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'granted') {
      // If consent was previously given, update Google Analytics
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'personalization_storage': 'granted'
      });
    } else {
      // If consent was denied, update accordingly
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'personalization_storage': 'denied'
      });
    }
  }, []);

  const updateConsent = (granted: boolean) => {
    const consentValue = granted ? 'granted' : 'denied';
    localStorage.setItem('cookie_consent', consentValue);
    
    // Update Google Analytics consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': consentValue,
        'analytics_storage': consentValue,
        'ad_user_data': consentValue,
        'ad_personalization': consentValue,
        'personalization_storage': consentValue
      });
      
      // Send an event to record the consent update
      window.gtag('event', 'consent_update', {
        'event_category': 'consent',
        'event_label': consentValue
      });
    }
    
    setShowBanner(false);
  };
  
  const handleAccept = () => updateConsent(true);
  const handleDecline = () => updateConsent(false);

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
