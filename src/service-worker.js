/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

// Routing gaya App Shell untuk memenuhi permintaan navigasi dengan index.html
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Caching gambar dengan strategi StaleWhileRevalidate
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Caching data pencarian terakhir agar dapat diakses offline
registerRoute(
  ({ url }) => url.pathname === '/api/last-search', // Ganti dengan endpoint pencarian yang sesuai
  new NetworkFirst({
    cacheName: 'search-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 1 }), // Hanya simpan cache data pencarian terakhir
    ],
  })
);

// Skip waiting saat service worker baru terdeteksi
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
