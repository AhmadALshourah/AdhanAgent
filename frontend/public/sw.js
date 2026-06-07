/* AdhanAgent Service Worker — v2 */
const CACHE = 'adhan-v2';

// Cache next.js static chunks (cache-first)
const STATIC_PREFIXES = ['/_next/static/', '/icons/', '/manifest.webmanifest'];
// Cache API responses (network-first, fallback to cache)
const API_PREFIX = '/api/v1/';

// Pre-cache the offline fallback page on install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.add('/offline.html'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Non-GET or cross-origin → skip
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // API: network-first, update cache on success
  if (url.pathname.startsWith(API_PREFIX)) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets: cache-first
  if (STATIC_PREFIXES.some((p) => url.pathname.startsWith(p))) {
    e.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            if (res.ok) caches.open(CACHE).then((c) => c.put(request, res.clone()));
            return res;
          })
      )
    );
    return;
  }

  // Navigation (HTML pages): network-first, serve cached if available,
  // otherwise serve the offline fallback page.
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then(
          (cached) => cached || caches.match('/offline.html')
        )
      )
    );
  }
});
