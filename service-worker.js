const CACHE_NAME = 'toolbox-suite-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './assets/logo-192.png',
  './assets/logo-512.png'
];

// Install SW + Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
});

// Activate SW + Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Serve cached content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});

