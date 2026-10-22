/** Serialize a self-contained worker with the exact version embedded in this build. */
export function createServiceWorker(version) {
  return `(${serviceWorker.toString()})(${JSON.stringify(version)});`;
}

function serviceWorker(version) {
  const prefix = "esperanca-pwa-";
  const assetsName = `${prefix}assets-${version}`;
  const pagesName = `${prefix}pages-${version}`;
  const fallback = "/offline.html";
  const pages = new Set([
    "/",
    "/abertura",
    "/inicio",
    "/membro",
    "/comunidade",
    "/servir",
    "/estudo",
    "/programacao",
    "/culto",
    "/ofertas",
  ]);
  const limits = { assets: 160, pages: 24 };

  async function store(name, request, response, limit) {
    // Cache is an enhancement: quota/storage failures must not break network loads.
    if (
      !response.ok ||
      response.redirected ||
      /private|no-store/i.test(response.headers.get("Cache-Control") || "")
    )
      return;
    try {
      const copy = response.clone();
      const cache = await caches.open(name);
      await cache.put(request, copy);
      const keys = await cache.keys();
      await Promise.all(
        keys
          .filter(
            (key) =>
              ![fallback, "/icons/icon-192.png"].includes(
                new URL(key.url).pathname,
              ),
          )
          .slice(0, Math.max(0, keys.length - limit))
          .map((key) => cache.delete(key)),
      );
    } catch {
      /* Storage may be unavailable or full. */
    }
  }

  async function match(request, options) {
    try {
      return await caches.match(request, options);
    } catch {
      return undefined;
    }
  }

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(assetsName)
        .then((cache) => cache.addAll([fallback, "/icons/icon-192.png"])),
    );
    // Wait for explicit user acceptance before replacing an active version.
  });
  self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING")
      event.waitUntil(self.skipWaiting());
  });
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();
        // Keep the previous hashed chunks for another tab still running the old UI.
        const previousAssets = keys
          .filter(
            (key) => key.startsWith(`${prefix}assets-`) && key !== assetsName,
          )
          .slice(-1);
        await Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("esperanca-offline-") ||
                (key.startsWith(prefix) &&
                  key !== assetsName &&
                  key !== pagesName &&
                  !previousAssets.includes(key)),
            )
            .map((key) => caches.delete(key)),
        );
        await self.clients.claim();
      })(),
    );
  });
  self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);
    if (
      request.method !== "GET" ||
      url.origin !== self.location.origin ||
      request.headers.has("Authorization")
    )
      return;
    // Never store APIs, login/check-in, mutations or App Router RSC/prefetch payloads.
    if (
      url.pathname.startsWith("/api/") ||
      request.headers.get("RSC") === "1" ||
      url.searchParams.has("_rsc") ||
      request.headers.has("Next-Router-Prefetch")
    )
      return;
    if (request.mode === "navigate") {
      event.respondWith(
        (async () => {
          try {
            const response = await fetch(request);
            if (pages.has(url.pathname) && !url.search) {
              event.waitUntil(
                store(pagesName, request, response, limits.pages),
              );
            }
            return response;
          } catch {
            const cached =
              pages.has(url.pathname) && !url.search
                ? await match(request, { cacheName: pagesName })
                : null;
            return (
              cached ||
              (await match(fallback, { cacheName: assetsName })) ||
              Response.error()
            );
          }
        })(),
      );
      return;
    }
    const imageSource = url.searchParams.get("url");
    const optimizedImage =
      url.pathname === "/_next/image" && imageSource?.startsWith("/figma/");
    const immutable = url.pathname.startsWith("/_next/static/");
    const staticAsset =
      immutable ||
      optimizedImage ||
      url.pathname.startsWith("/figma/") ||
      url.pathname.startsWith("/icons/") ||
      url.pathname === "/favicon.png";
    if (!staticAsset) return;
    event.respondWith(
      (async () => {
        const cached = await match(request, {
          cacheName: assetsName,
          ignoreSearch: url.pathname.startsWith("/icons/"),
        });
        if (cached) return cached;
        // Hashed Next files are immutable; the previous cache can serve old tabs.
        if (immutable) {
          const previous = await match(request);
          if (previous) return previous;
        }
        const response = await fetch(request);
        event.waitUntil(store(assetsName, request, response, limits.assets));
        return response;
      })(),
    );
  });
}
