const CACHE_NAME = 'portfolio-cache-v2';
const BASE_URL = self.location.pathname.replace(/\/service-worker\.js$/, '');

const ASSETS_TO_CACHE = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/favicon.ico`,
  `${BASE_URL}/favicon/favicon-16x16.png`,
  `${BASE_URL}/favicon/favicon-32x32.png`,
  `${BASE_URL}/favicon/safari-pinned-tab.svg`,
  // Add other critical assets here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Add each asset one by one to handle failures gracefully
        const cachePromises = ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn(`Failed to cache ${url}:`, err);
            // Continue with other assets even if one fails
            return Promise.resolve();
          });
        });
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('Service Worker: Caching complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('Service Worker: Installation failed:', err);
        // Continue with activation even if caching fails
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('Service Worker: Removing old cache', name);
              return caches.delete(name).catch(err => {
                console.warn(`Failed to delete cache ${name}:`, err);
                return true; // Continue with other caches
              });
            })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
      .catch((err) => {
        console.error('Service Worker: Activation failed:', err);
        // Continue with the service worker activation
        return self.clients.claim();
      })
  );
});

const isCacheableRequest = (request) => {
  // Don't cache non-GET requests
  if (request.method !== 'GET') return false;
  
  const url = new URL(request.url);
  
  // Don't cache external resources or data URLs
  if (!url.origin.startsWith(self.location.origin)) return false;
  if (url.protocol === 'chrome-extension:') return false;
  if (url.pathname.endsWith('.map')) return false;
  
  // Cache common static assets
  const cacheablePaths = [
    '/assets/',
    '/images/',
    '/favicon/'
  ];
  
  return cacheablePaths.some(path => url.pathname.includes(path));
};

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and non-cacheable requests
  if (event.request.method !== 'GET' || !isCacheableRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache))
              .catch((err) => {
                console.warn('Failed to cache response for', event.request.url, err);
              });

            return response;
          })
          .catch((err) => {
            console.error('Fetch failed for', event.request.url, err);
            // Return a fallback response if available
            return new Response('Network error', {
              status: 408,
              statusText: 'Network error',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
