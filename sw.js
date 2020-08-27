const CACHE = 'cache-only-v1';
// При установке воркера мы должны закешировать часть данных (статику)
self.addEventListener('install', (event) => {
    console.log('sw Установлен')
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                './mus1.mp3'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('sw Активирован');
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
// self.addEventListener('fetch', (event) => {
//     console.log('sw fetch', event.request);
//     event.respondWith(fromCache(event.request))
// });
self.addEventListener('fetch', (event) => {
    console.log('sw fetch', event.request);
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
// function fromCache(request) {
//     console.log('take file from caches');
//     return caches.open(CACHE)
//         .then((cache) => {
//             console.log(cache, 'cache')
//             cache.match(request)
//         })
//         .then((matching) => {
//             console.log(matching, 'matching')
//             matching || Promise.reject('no-match')
//         })
// }