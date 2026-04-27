self.addEventListener('install', (e) => {
  // Force immediate activation of the new service worker
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Clear ALL existing caches to fix the blank page issue
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('[ServiceWorker] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open pages
  );
});

self.addEventListener('fetch', (e) => {
  // Network-first or Network-only to prevent fetching stale index.html 
  // that points to missing/old JS hashes
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
