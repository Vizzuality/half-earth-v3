/**
 * Legacy Kill-switch Service Worker (service-worker.js)
 *
 * Purpose
 * - Unregister and clear caches for clients that registered the default CRA service-worker path.
 * - Complements /custom-service-worker.js to ensure all historical paths are covered.
 *
 * Scope
 * - Served at: /service-worker.js
 * - Contains no caching logic; allows network to handle all requests.
 *
 * Removal policy
 * - Keep for a limited window (6–12 weeks) to catch long-tail users.
 * - Target removal date: UPDATE_BEFORE_MERGE (YYYY-MM-DD).
 *
 * Notes for contributors
 * - This is a temporary clean-up SW. Do not add caching here.
 */
/* Legacy kill-switch service worker: unregister and clear caches */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try { await self.registration.unregister(); } catch (e) {}
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (e) {}
      try { await self.clients.claim(); } catch (e) {}
    })()
  );
});

self.addEventListener('fetch', () => {});
