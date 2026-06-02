/* KINAG VENTURES service worker
 * Supports PWA install, the in-app "Update available" prompt, and push notifications.
 * Uses a conservative network-first strategy so shoppers always get fresh prices/stock,
 * falling back to a cached shell only when offline.
 */

const CACHE_VERSION = 'kinag-v1';
const OFFLINE_CACHE = `${CACHE_VERSION}-offline`;
const OFFLINE_URL = '/';

self.addEventListener('install', (event) => {
  // Pre-cache the home page as an offline fallback. Do NOT skipWaiting here —
  // the app shows an "Update available" prompt and triggers SKIP_WAITING itself.
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => cache.add(OFFLINE_URL)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== OFFLINE_CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Allow the UpdatePrompt component to activate a waiting worker on demand.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET; let the browser deal with everything else (POST, etc.).
  if (request.method !== 'GET') return;

  // Network-first for page navigations, with an offline fallback to the home shell.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((res) => res || Response.error())
      )
    );
  }
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = { body: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'KINAG VENTURES';
  const options = {
    body: payload.body || 'You have a new update.',
    icon: payload.icon || '/logo-kinag.png',
    badge: payload.badge || '/logo-kinag.png',
    tag: payload.tag || 'kinag-notification',
    data: { url: payload.url || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
