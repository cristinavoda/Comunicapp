self.addEventListener('install', event => {
  console.log('✅ Service Worker instalado');

  event.waitUntil(
    caches.open('comunicador-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/styles.css',
        '/manifest.json',
        '/icons/icon-32x32.png',
        '/icons/icon-72x72.png'
      ]);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('⚡ Service Worker activado');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'comunicador-cache') {
            console.log('🧹 Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // No interceptar extensiones o scripts externos
  if (event.request.url.startsWith('chrome-extension')) return;

  console.log('🌐 Interceptando:', event.request.url);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then(response => {
          if (
            !response || 
            response.status !== 200 || 
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseClone = response.clone();

          caches.open('comunicador-cache').then(cache => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(error => {
          console.error('❌ Error en fetch:', error);
          return new Response('Offline', { status: 503 });
        });
    })
  );
});
