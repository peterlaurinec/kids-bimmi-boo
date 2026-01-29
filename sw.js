/**
 * Service Worker for Bimmi Match PWA
 *
 * BEGINNER TIP: A service worker is like a helper that runs
 * in the background. It lets the app work even without internet!
 *
 * LEARN MORE: Service workers can cache files so the app
 * loads instantly and works offline.
 */

// Cache version - change this when you update the app
const CACHE_NAME = 'bimmi-match-v1';

// Files to cache for offline use
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

/**
 * INSTALL EVENT
 * Runs when the service worker is first installed
 * We cache all our important files here
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
    );
});

/**
 * ACTIVATE EVENT
 * Runs when the service worker takes control
 * We clean up old caches here
 */
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old caches that don't match current version
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

/**
 * FETCH EVENT
 * Intercepts all network requests
 * Uses "Cache First" strategy: try cache, then network
 *
 * LEARN MORE: Different strategies work better for different apps:
 * - Cache First: Fast, works offline (what we use)
 * - Network First: Always fresh, needs internet
 * - Stale While Revalidate: Shows cache, updates in background
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response (can only be used once)
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, show offline message
                        // (only for navigation requests)
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

/**
 * MESSAGE EVENT
 * Handles messages from the main app
 * Useful for triggering updates or cache clearing
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('Service Worker: Cache cleared');
        });
    }
});
