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
      ]);
    })
  );
  
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  
});

self.addEventListener('fetch', event => {
  console.log('Interceptando petición a:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      
      return cachedResponse || fetch(event.request).then((response) => {
        
        if (event.request.url.indexOf('/api/') === -1) { 
          caches.open('comunicador-cache').then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    })
  );
});
