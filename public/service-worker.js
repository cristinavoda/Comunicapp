self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  // Realizar la caché de los recursos durante la instalación
  event.waitUntil(
    caches.open('comunicador-cache').then((cache) => {
      return cache.addAll([
        '/', // Página de inicio
        '/index.html', // HTML
        '/app.js', // JS
        '/styles.css', // CSS
        '/icons/icon-192x192.png', // Iconos
        '/icons/icon-512x512.png',
      ]);
    })
  );
  // Para que el service worker pueda controlar la página inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  // Asegúrate de que el service worker se active inmediatamente, sin esperar a que se cierre la pestaña
});

self.addEventListener('fetch', event => {
  console.log('Interceptando petición a:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Si la solicitud está en caché, devuélvela; si no, haz la solicitud normalmente
      return cachedResponse || fetch(event.request).then((response) => {
        // Opcionalmente, puedes agregar la respuesta al caché
        if (event.request.url.indexOf('/api/') === -1) { // Evitar caché de APIs si no lo deseas
          caches.open('comunicador-cache').then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    })
  );
});
