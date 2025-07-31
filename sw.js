const CACHE_NAME = 'trip-score-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});



// sw.js (simplified snippet for caching map tiles)
const CACHE_NAME = 'tripscore-cache-v1';
const MAP_TILE_REGEX = /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/;

self.addEventListener('fetch', event => {
  if (MAP_TILE_REGEX.test(event.request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(response =>
          response || fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        )
      )
    );
  }
});
