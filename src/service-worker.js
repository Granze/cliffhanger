self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('cliffhanger').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        'main.css',
        'main.js'
      ])
        .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
