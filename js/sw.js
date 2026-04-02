const CACHE_NAME = 'webstart-v1';
const OFFLINE_URL = 'offline.html';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/manifest.json',
    '/offline.html'
];

const CACHE_STRATEGIES = {
    CACHE_FIRST: [
        /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
        /fonts\.googleapis\.com/,
        /fonts\.gstatic\.com/,
        /unpkg\.com/
    ],
    NETWORK_FIRST: [
        /\.(?:js|json)$/,
        /api\./,
        /firebase/
    ]
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Cacheando arquivos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[ServiceWorker] Removendo cache antigo:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .catch(() => caches.match(OFFLINE_URL))
        );
        return;
    }

    const isCacheFirst = CACHE_STRATEGIES.CACHE_FIRST.some((pattern) => pattern.test(url.href));
    const isNetworkFirst = CACHE_STRATEGIES.NETWORK_FIRST.some((pattern) => pattern.test(url.href));

    if (isCacheFirst) {
        event.respondWith(
            caches.match(request)
                .then((cached) => {
                    return cached || fetch(request).then((response) => {
                        if (response.ok) {
                            const clone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                        }
                        return response;
                    });
                })
        );
    } else if (isNetworkFirst) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
    } else {
        event.respondWith(
            caches.match(request)
                .then((response) => response || fetch(request))
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});