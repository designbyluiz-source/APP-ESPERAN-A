import assert from "node:assert/strict";
import test from "node:test";
import { installedUpdate } from "../src/lib/pwa-update.ts";
import { appVersion } from "../scripts/app-version.mjs";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("waiting update is returned after revalidation", async () => {
  const waiting = {};
  let checks = 0;
  assert.equal(
    await installedUpdate({
      waiting,
      update: async () => {
        checks++;
      },
    }),
    waiting,
  );
  assert.equal(checks, 1);
});

test("an in-progress install completes before activating", async () => {
  const worker = new EventTarget();
  worker.state = "installing";
  const registration = {
    waiting: null,
    installing: worker,
    update: async () => {},
  };
  const result = installedUpdate(registration);
  setTimeout(() => {
    worker.state = "installed";
    registration.waiting = worker;
    worker.dispatchEvent(new Event("statechange"));
  }, 5);
  assert.equal(await result, worker);
});

test("a redundant worker fails instead of accepting a broken update", async () => {
  const worker = new EventTarget();
  worker.state = "redundant";
  await assert.rejects(
    installedUpdate({
      waiting: null,
      installing: worker,
      update: async () => {},
    }),
    /update-failed/,
  );
});

test("without a waiting/installing worker the caller can use a normal reload", async () => {
  assert.equal(
    await installedUpdate({
      update: async () => {},
      waiting: null,
      installing: null,
    }),
    null,
  );
});

test("version is stable for identical source and changes with assets/code", async () => {
  const root = await mkdtemp(join(tmpdir(), "esperanca-version-"));
  const previous = [
    process.env.ESPERANCA_VERSION,
    process.env.VERCEL_DEPLOYMENT_ID,
  ];
  delete process.env.ESPERANCA_VERSION;
  delete process.env.VERCEL_DEPLOYMENT_ID;
  try {
    for (const path of ["src", "public", "scripts"])
      await mkdir(join(root, path));
    for (const path of [
      "package.json",
      "package-lock.json",
      "next.config.ts",
      "src/page.tsx",
      "public/icon.png",
    ])
      await writeFile(join(root, path), "original");
    const first = appVersion(root);
    assert.equal(appVersion(root), first);
    await writeFile(join(root, "public/icon.png"), "new icon");
    const second = appVersion(root);
    assert.notEqual(first, second);
    await writeFile(join(root, "src/page.tsx"), "new page");
    assert.notEqual(appVersion(root), second);
  } finally {
    for (const [key, value] of [
      ["ESPERANCA_VERSION", previous[0]],
      ["VERCEL_DEPLOYMENT_ID", previous[1]],
    ]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    await rm(root, { recursive: true, force: true });
  }
});
