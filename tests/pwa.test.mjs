import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');
function worker(fetch) {
  const handlers = {};
  const offline = new Response('offline');
  vm.runInNewContext(source, {
    self: { location: { origin: 'https://app.test' }, addEventListener: (name, handler) => { handlers[name] = handler; } },
    caches: { match: async () => offline }, URL, fetch,
  });
  return { handlers, offline };
}
test('failed document navigation returns the cached offline page', async () => {
  const { handlers, offline } = worker(async () => { throw new TypeError('offline'); });
  let result;
  handlers.fetch({ request: { method: 'GET', url: 'https://app.test/entrar', mode: 'navigate' }, respondWith: promise => { result = promise; } });
  assert.equal(await result, offline);
});
test('online navigation preserves the server response', async () => {
  const online = new Response('fresh');
  const { handlers } = worker(async () => online);
  let result;
  handlers.fetch({ request: { method: 'GET', url: 'https://app.test/inicio', mode: 'navigate' }, respondWith: promise => { result = promise; } });
  assert.equal(await result, online);
});
test('forms, external requests and Next RSC requests are not intercepted', () => {
  const { handlers } = worker(() => { throw new Error('must not fetch'); });
  for (const request of [
    { method: 'POST', url: 'https://app.test/entrar', mode: 'navigate' },
    { method: 'GET', url: 'https://external.test/', mode: 'navigate' },
    { method: 'GET', url: 'https://app.test/membro?_rsc=test', mode: 'cors' },
  ]) handlers.fetch({ request, respondWith: () => assert.fail('request intercepted') });
});
