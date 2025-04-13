self.addEventListener('install', event => {
  console.log('Service Worker instalado');

  event.waitUntil(
    caches.open('comunicador-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html', 
        '/app.js', 
        '/styles.css', 
        '/icons/icon-32x32.png', 
        '/icons/icon-72x72.png',
        '/manifest.json' // 👈 muy importante si usas PWA
      ]);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'comunicador-cache') {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('Interceptando petición a:', event.request.url);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Verifica que la respuesta sea válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        if (!event.request.url.includes('/api/')) {
          caches.open('comunicador-cache').then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      }).catch(error => {
        console.error('Error en fetch del SW:', error);
        throw error;
      });
    })
  );
});
