// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: {
      (command: 'config', targetId: string, config?: Record<string, unknown>): void;
      (command: 'event', action: string, params?: Record<string, unknown>): void;
      (command: 'set', targetId: string, config: Record<string, unknown>): void;
      (command: 'consent', action: 'default' | 'update', params: {
        ad_storage?: 'granted' | 'denied';
        analytics_storage?: 'granted' | 'denied';
        functionality_storage?: 'granted' | 'denied';
        security_storage?: 'granted' | 'denied';
      }): void;
    };
    dataLayer: unknown[];
  }
}

export {}; // This file needs to be a module
