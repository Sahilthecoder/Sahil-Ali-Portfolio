// Service Worker Registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful');
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
