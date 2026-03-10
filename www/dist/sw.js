const CACHE_NAME = 'wird-reminder-v1.3.4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './core/assets/icons/icon48.png',
    './core/assets/icons/icon128.png',
    './core/js/api.js',
    './core/js/parser.js',
    './core/js/renderer.js',
    './core/js/logic/reminders.js',
    './core/js/adapter/storage.js',
    './core/js/adapter/env.js',
    './core/js/adapter/notifications.js'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching all assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', event => {
    // Quran API requests should be dynamic but cached for offline use
    if (event.request.url.includes('api.quran.com')) {
        event.respondWith(
            caches.open('quran-api-cache').then(cache => {
                return fetch(event.request)
                    .then(response => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => caches.match(event.request));
            })
        );
        return;
    }

    // Default strategy: Cache First, then Network with offline fallback
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })
    );
});
