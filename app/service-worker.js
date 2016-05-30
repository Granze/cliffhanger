'use strict';

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open('cliffhanger').then(function (cache) {
    return cache.addAll(['/', '/index.html', 'main.css', 'main.js']).then(function () {
      return self.skipWaiting();
    });
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (response) {
    return response || fetch(e.request);
  }));
});