import vm from "node:vm";
import assert from "node:assert/strict";
import test from "node:test";
import { createServiceWorker } from "../src/lib/pwa-worker.mjs";

function storage() {
  const stores = new Map();
  const url = (value) =>
    new URL(typeof value === "string" ? value : value.url, "https://app.test")
      .href;
  const api = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const data = stores.get(name);
      return {
        async put(request, response) {
          data.set(url(request), response.clone());
        },
        async match(request, options = {}) {
          const key = [...data.keys()].find((key) =>
            options.ignoreSearch
              ? new URL(key).pathname === new URL(url(request)).pathname
              : key === url(request),
          );
          return key ? data.get(key).clone() : undefined;
        },
        async keys() {
          return [...data.keys()].map((key) => new Request(key));
        },
        async delete(request) {
          return data.delete(url(request));
        },
        async addAll(paths) {
          for (const path of paths)
            data.set(
              url(path),
              new Response(path === "/offline.html" ? "offline" : "icon"),
            );
        },
      };
    },
    async keys() {
      return [...stores.keys()];
    },
    async delete(name) {
      return stores.delete(name);
    },
    async match(request, options = {}) {
      for (const name of options.cacheName
        ? [options.cacheName]
        : stores.keys()) {
        if (!stores.has(name)) continue;
        const response = await (await api.open(name)).match(request, options);
        if (response) return response;
      }
    },
  };
  return api;
}
function worker({
  fetch = async () => new Response("network"),
  version = "a",
  caches = storage(),
} = {}) {
  const handlers = {};
  const calls = { skip: 0, claim: 0, fetch: 0 };
  vm.runInNewContext(createServiceWorker(version), {
    self: {
      location: { origin: "https://app.test" },
      addEventListener: (name, handler) => {
        handlers[name] = handler;
      },
      skipWaiting: async () => {
        calls.skip++;
      },
      clients: {
        claim: async () => {
          calls.claim++;
        },
      },
    },
    caches,
    URL,
    Response,
    fetch: async (...args) => {
      calls.fetch++;
      return fetch(...args);
    },
  });
  async function dispatch(name, data = {}) {
    const tasks = [];
    let result;
    handlers[name]({
      ...data,
      waitUntil: (promise) => tasks.push(promise),
      respondWith: (promise) => {
        result = promise;
      },
    });
    const response = await result;
    await Promise.all(tasks);
    return response;
  }
  return { dispatch, caches, calls };
}
const request = (path, extra = {}) => ({
  url: `https://app.test${path}`,
  method: "GET",
  mode: "cors",
  headers: new Headers(),
  ...extra,
});

test("visited documents work offline; unknown and login pages get the fallback", async () => {
  let online = true;
  const app = worker({
    fetch: async () => {
      if (!online) throw new TypeError("offline");
      return new Response("fresh page");
    },
  });
  await app.dispatch("install");
  await app.dispatch("fetch", {
    request: request("/membro", { mode: "navigate" }),
  });
  online = false;
  assert.equal(
    await (
      await app.dispatch("fetch", {
        request: request("/membro", { mode: "navigate" }),
      })
    ).text(),
    "fresh page",
  );
  for (const path of ["/unvisited", "/entrar", "/kids"]) {
    assert.equal(
      await (
        await app.dispatch("fetch", {
          request: request(path, { mode: "navigate" }),
        })
      ).text(),
      "offline",
    );
  }
});

test("static assets use cache first without repeating requests", async () => {
  const app = worker();
  for (let i = 0; i < 2; i++)
    await app.dispatch("fetch", {
      request: request("/_next/static/chunks/app-abc.js"),
    });
  assert.equal(app.calls.fetch, 1);
});

test("API, RSC, personal pages and authenticated/mutation requests are never stored", async () => {
  const app = worker();
  for (const req of [
    request("/api/version"),
    request("/membro?_rsc=abc"),
    request("/membro", { headers: new Headers({ RSC: "1" }) }),
    request("/membro", {
      headers: new Headers({ Authorization: "Bearer test" }),
    }),
    request("/membro", { method: "POST" }),
    request("/membro", {
      url: "https://external.test/membro",
      mode: "navigate",
    }),
  ])
    assert.equal(await app.dispatch("fetch", { request: req }), undefined);
  for (const path of ["/entrar", "/kids", "/membro?token=secret"])
    await app.dispatch("fetch", {
      request: request(path, { mode: "navigate" }),
    });
  assert.equal((await app.caches.keys()).length, 0);
});

test("private/no-store responses and failed downloads do not enter cache", async () => {
  for (const response of [
    new Response("private", { headers: { "Cache-Control": "private" } }),
    new Response("no store", { headers: { "Cache-Control": "no-store" } }),
    new Response("missing", { status: 404 }),
  ]) {
    const app = worker({ fetch: async () => response.clone() });
    await app.dispatch("fetch", {
      request: request("/membro", { mode: "navigate" }),
    });
    assert.equal((await app.caches.keys()).length, 0);
  }
});

test("activation isolates new pages, keeps one previous asset cache and awaits approval", async () => {
  const caches = storage();
  for (const key of [
    "another-app",
    "esperanca-offline-v3",
    "esperanca-pwa-assets-old",
    "esperanca-pwa-assets-a",
    "esperanca-pwa-pages-a",
  ])
    await caches.open(key);
  const app = worker({ caches, version: "b" });
  await app.dispatch("install");
  assert.equal(app.calls.skip, 0);
  await app.dispatch("message", { data: { type: "NOT_APPROVED" } });
  assert.equal(app.calls.skip, 0);
  await app.dispatch("message", { data: { type: "SKIP_WAITING" } });
  assert.equal(app.calls.skip, 1);
  await app.dispatch("activate");
  assert.equal(app.calls.claim, 1);
  assert.deepEqual(await caches.keys(), [
    "another-app",
    "esperanca-pwa-assets-a",
    "esperanca-pwa-assets-b",
  ]);
});

test("asset limit keeps the offline fallback and icon pinned", async () => {
  const app = worker();
  await app.dispatch("install");
  for (let i = 0; i < 165; i++)
    await app.dispatch("fetch", { request: request(`/figma/${i}.png`) });
  const cache = await app.caches.open("esperanca-pwa-assets-a");
  assert.equal((await cache.keys()).length, 160);
  assert.equal(await (await cache.match("/offline.html")).text(), "offline");
  assert.equal(await (await cache.match("/icons/icon-192.png")).text(), "icon");
});

test("new versions do not reuse old unhashed images, but old hashed chunks remain usable", async () => {
  const caches = storage();
  const old = worker({ caches });
  await old.dispatch("fetch", { request: request("/figma/photo.png") });
  await old.dispatch("fetch", {
    request: request("/_next/static/chunks/old-hash.js"),
  });
  const next = worker({ caches, version: "b" });
  await next.dispatch("fetch", { request: request("/figma/photo.png") });
  await next.dispatch("fetch", {
    request: request("/_next/static/chunks/old-hash.js"),
  });
  assert.equal(next.calls.fetch, 1);
});
