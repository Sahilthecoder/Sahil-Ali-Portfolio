// Google Analytics Measurement ID
export const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Type for consent parameters
type ConsentParams = {
  ad_storage?: 'granted' | 'denied';
  analytics_storage?: 'granted' | 'denied';
  functionality_storage?: 'granted' | 'denied';
  security_storage?: 'granted' | 'denied';
  region?: string[];
  wait_for_update?: number;
};

// Type for gtag function
type GtagFunction = {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', action: string, params?: Record<string, unknown>): void;
  (command: 'set', targetId: string, config: Record<string, unknown>): void;
  (command: 'consent', action: 'default' | 'update', params: ConsentParams): void;
};

// Type assertion for window.gtag
declare global {
  interface Window {
    gtag: GtagFunction;
    dataLayer: unknown[];
  }
}

/**
 * Log a pageview with the current URL
 * @param url - The URL of the current page
 */
export const pageview = (url: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

interface EventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Log an event to Google Analytics
 * @param params - Event parameters including action, category, label, and value
 */
export const event = (params: EventParams): void => {
  if (typeof window.gtag === 'function') {
    const { action, category, label, value, ...rest } = params;
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...rest
    });
  }
};

/**
 * Set custom dimensions or metrics
 * @param params - Key-value pairs of custom dimensions/metrics
 */
export const set = (params: Record<string, unknown>): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('set', GA_TRACKING_ID, params);
  }
};

/**
 * Update consent settings
 * @param params - Consent parameters
 */
export const updateConsent = (params: ConsentParams): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', params);
  }
};

/**
 * Initialize Google Analytics with default consent settings
 */
export const initAnalytics = (): void => {
  if (typeof window.gtag === 'function') {
    // Set default consent mode
    updateConsent({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      security_storage: 'granted'
    });
  }
};
