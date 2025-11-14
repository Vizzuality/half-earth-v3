/**
 * Kill-switch Service Worker (custom-service-worker.js)
 *
 * Purpose
 * - This SW exists only to help clients that previously installed our Workbox service worker
 *   to automatically unregister and clear caches after we removed PWA caching from the app.
 * - It performs no caching and lets the network handle all requests.
 *
 * Scope
 * - Served at: /custom-service-worker.js
 * - Complements a legacy kill-switch at /service-worker.js for CRA-era registrations.
 * - Safe to deploy alongside the app; does nothing beyond unregister + cache cleanup.
 *
 * Removal policy
 * - Keep for a limited window to catch long-tail users (recommended 6–12 weeks).
 * - Target removal date: UPDATE_BEFORE_MERGE (2025-11-01).
 * - After removal, ensure normal HTTP cache headers are set (e.g., no-store for index.html).
 *
 * Notes for contributors
 * - Do NOT add caching strategies here. This file is intentionally minimal.
 * - If you reintroduce a real SW in the future, remove this file and replace with a proper
 *   update-notification flow to avoid stale clients.
 *
 * References
 * - MDN: Service Workers https://developer.mozilla.org/docs/Web/API/Service_Worker_API
 */
/* Kill-switch service worker: unregister and clear caches */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        // Unregister this service worker
        await self.registration.unregister();
      } catch (e) {
        // ignore
      }
      try {
        // Clear all caches
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (e) {
        // ignore
      }
      // Claim clients so next reload is controlled by the page directly
      try {
        await self.clients.claim();
      } catch (e) {
        // ignore
      }
    })()
  );
});

self.addEventListener('fetch', () => {
  // no-op: let network handle everything
});
