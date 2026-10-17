const CACHE = 'deutschtrainer-pwa-20261017-v7-logo-renamed';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './de-trainer-192-v2.png', './de-trainer-512-v2.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('deutschtrainer-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return; e.respondWith(fetch(e.request).then(response => { if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return response; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))); });
