if (typeof importScripts === 'function') {
  /* global importScripts */
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    workbox.core.setCacheNameDetails({
      prefix: 'HEv3',
      suffix: 'v1',
      precache: 'install-time-cache',
      runtime: 'run-time-cache',
    });

    // This will be populated at build time
    // the precached url are the ones defined on 'globPatterns'
    // on the service-worker-build.js file
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html');

    // Cache own images
    workbox.routing.registerRoute(
      /\.(?:png|jpg|jpeg|svg|gif)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
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
            maxAgeSeconds: 120 * 24 * 60 * 60, // 120 Days
          }),
        ],
      })
    );

    // Cache arcgis js API
    // Not working as expected
    // Check https://stackoverflow.com/questions/57688543/workbox-cachefirst-strategy-fetching-after-serving-cache-content
    // workbox.routing.registerRoute(
    //   /https:\/\/js\.arcgis\.com\/4.12\/esri\/[/\w-]*.(?:js|css)$/,
    //   workbox.strategies.cacheFirst({
    //     cacheName: 'arcgis-js-API-4.12',
    //     plugins: [
    //       new workbox.cacheableResponse.Plugin({
    //         statuses: [0, 200],
    //       })
    //     ]
    //   })
    // )
  } else {
    console.info('Workbox could not be loaded. No Offline support');
  }
}
