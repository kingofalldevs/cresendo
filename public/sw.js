// Simple Service Worker for Crescendo PWA
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate');
});

self.addEventListener('fetch', (e) => {
  // Pass-through strategy
  e.respondWith(fetch(e.request));
});
