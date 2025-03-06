self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache-v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/public/assets/ic1.png',
        '/public/assets/lg3.png',        
        '/public/assets/pr1.jpg',      
        '/public/assets/pr2.jpg',    
        '/public/assets/pr3.jpg',    
        '/public/assets/pr4.jpg',    
        '/public/assets/pr5.jpg',    
        '/public/assets/pr6.jpg',    
        '/public/assets/pr7.jpg',    
        '/public/assets/pr8.jpg',    
        '/public/assets/pr9.jpg',    
        '/public/assets/pr10.jpg',                                                                              
        '/public/assets/pr11.jpg',            
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('pwa-cache-v1').then((cache) => {
      return cache.match(event.request).then((response) => {
        // Si el recurso está en cache, devolverlo
        if (response) {
          return response;
        }
        // Si no está en cache, hacer la solicitud de red
        return fetch(event.request).then((networkResponse) => {
          // Guardar la respuesta en cache para futuras solicitudes
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch((error) => {
          // Si hay error en la red, puedes manejarlo aquí (por ejemplo, mostrar un recurso offline)
          console.error('Fetch error: ', error);
        });
      });
    })
  );
});
