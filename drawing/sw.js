const CACHE_NAME = 'dot-to-dot-v1';
const urlsToCache = ['/', '/drawing/', '/drawing/index.html', '/drawing/manifest.json'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => {
                    if (name !== CACHE_NAME) return caches.delete(name);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request)
                .then(res => {
                    if (!res || res.status !== 200 || res.type !== 'basic') return res;
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return res;
                })
            )
            .catch(() => event.request.mode === 'navigate' ? caches.match('/drawing/index.html') : null)
    );
});
