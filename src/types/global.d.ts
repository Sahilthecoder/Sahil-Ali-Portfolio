// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export {}; // This file needs to be a module
