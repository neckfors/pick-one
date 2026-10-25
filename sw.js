// Pick One is now Randomizer at /randomizer/. Phones that installed Pick One
// still run its old service worker, which checks this file for updates. This
// version takes over, sends any open Pick One window to the new address and
// removes itself.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window' });
    await self.registration.unregister();
    for (const w of windows) w.navigate('/randomizer/' + new URL(w.url).hash).catch(() => {});
  })());
});
