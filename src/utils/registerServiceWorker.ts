// Service Worker Registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const swUrl = `${baseUrl}service-worker.js`;
      
      navigator.serviceWorker
        .register(swUrl, { scope: baseUrl })
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
}

// Unregister service worker (for development)
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
