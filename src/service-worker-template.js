if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.setConfig({
      debug: true
    });

    /* injection point for manifest files. */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    // Cache own images
    workbox.routing.registerRoute(
      /\.(?:png|jpg|jpeg|svg|gif)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
    
    // Cache own fonts
    workbox.routing.registerRoute(
      /\.(?:otf)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-fonts',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 120 * 24 * 60 * 60, // 120 Days
          }),
        ],
      })
    );

    // Cache TILES for Firefly and Vibrant base maps from esri servers
    workbox.routing.registerRoute(
      /https:\/\/tiles\.arcgis\.com\/tiles\/nGt4QxSblgDfeJn9\/arcgis\/rest\/services\/(Vibrant|Half_Earth_Firefly)\/MapServer\/tile\/\d\/\d\/\d/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-esri-tiles',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
          }),
        ],
      })
    )

    // Cache TILEMAPS for Firefly and Vibrant base maps from esri servers
    workbox.routing.registerRoute(
      /https:\/\/tiles\.arcgis\.com\/tiles\/nGt4QxSblgDfeJn9\/arcgis\/rest\/services\/(Vibrant|Half_Earth_Firefly)\/MapServer\/tilemap\/\d\/\d\/\d\/32\/32\?f=json/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-esri-tiles',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
          }),
        ],
      })
    )

    // Cache METADATA for Firefly and Vibrant base maps from esri servers
    workbox.routing.registerRoute(
      /https:\/\/tiles\.arcgis\.com\/tiles\/nGt4QxSblgDfeJn9\/arcgis\/rest\/services\/(Vibrant|Half_Earth_Firefly)\/MapServer\?f=json/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-esri-tiles',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
          }),
        ],
      })
    )

    // TODO arcgis api assets (check version?)
    workbox.routing.registerRoute(
      /https:\/\/js\.arcgis\.com\/4.12\/esri\/[/\w-]*.(?:js|css)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'HEv3-arcgis-js-API-4.12',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
          }),
        ],
      })
    )

    workbox.routing.registerRoute(
      /https:\/\/www\.arcgis\.com\/sharing\/rest\/content\/items\/[/\w]*\?f=json/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'HEv3-arcgis-items-description'
      })
    )
    // TODO 3d elevation tiles
    // TODO remove hemlet preload
    // TODO world imagery tiles (to be fetched only when zoom higher that 8)

    // TODO handle errors when no getting some layers data

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}