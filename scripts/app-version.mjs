import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Stable across server restarts; includes uncommitted source/asset changes. */
export function appVersion(root = process.cwd()) {
  if (process.env.ESPERANCA_VERSION) return process.env.ESPERANCA_VERSION;
  if (process.env.VERCEL_DEPLOYMENT_ID) return process.env.VERCEL_DEPLOYMENT_ID;
  const hash = createHash("sha256");
  function add(path) {
    hash.update(path);
    hash.update(readFileSync(join(root, path)));
  }
  function walk(path) {
    for (const entry of readdirSync(join(root, path), {
      withFileTypes: true,
    }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith(".")) continue;
      const child = join(path, entry.name);
      if (entry.isDirectory()) walk(child);
      else if (entry.isFile()) add(child);
    }
  }
  for (const dir of ["src", "public", "scripts"]) walk(dir);
  for (const file of ["package.json", "package-lock.json", "next.config.ts"])
    add(file);
  return hash.digest("hex").slice(0, 16);
}
