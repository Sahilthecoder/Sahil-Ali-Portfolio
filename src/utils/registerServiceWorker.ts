// Service Worker Registration
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const swUrl = `${baseUrl}service-worker.js`;
  
  // Register service worker
  const registerSW = () => {
    navigator.serviceWorker
      .register(swUrl, { 
        scope: baseUrl,
        updateViaCache: 'none' // Always check for updates
      })
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check for updates immediately
        registration.update().catch(err => {
          console.warn('Error during service worker update check:', err);
        });
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          
          newWorker.addEventListener('statechange', () => {
            // When the new service worker is installed, prompt user to update
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
              // Optional: Show update notification to user
              if (window.confirm('A new version is available. Update now?')) {
                // Send message to skip waiting and reload
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          });
        });
        
        // Handle controller change (new service worker takes over)
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (refreshing) return;
          window.location.reload();
          refreshing = true;
        });
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed: ', error);
      });
  };
  
  // Wait for window load or register immediately if already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    registerSW();
  } else {
    window.addEventListener('load', registerSW);
  }
}

// Unregister service worker (for development)
export function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return Promise.resolve();
  }
  
  return navigator.serviceWorker.ready.then((registration) => {
    console.log('Unregistering service worker...');
    return registration.unregister();
  }).catch((error) => {
    console.error('Error unregistering service worker:', error);
  });
}

// Clear all caches
export async function clearServiceWorkerCache() {
  if (!('caches' in window)) {
    return Promise.resolve();
  }
  
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  } catch (error) {
    console.error('Error clearing caches:', error);
  }
}
