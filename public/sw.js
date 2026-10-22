/* Offline fallback only: do not cache member screens, forms or Next RSC responses. */
const CACHE = "esperanca-offline-v1";
const FALLBACK = "/offline.html";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll([FALLBACK, "/icons/icon-192.png"])),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key.startsWith("esperanca-offline-") && key !== CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  )
    return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(FALLBACK)));
  } else if (new URL(request.url).pathname === "/icons/icon-192.png") {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request)),
    );
  }
});
