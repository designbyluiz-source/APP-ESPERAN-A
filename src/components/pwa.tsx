"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { installedUpdate } from "@/lib/pwa-update";

export function Pwa() {
  const [available, setAvailable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const accepted = useRef(false);
  const reloading = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    let disposed = false;
    let pending = false;
    const controller = new AbortController();
    const cleanups: (() => void)[] = [];
    function reload() {
      if (!accepted.current || reloading.current) return;
      reloading.current = true;
      window.location.reload();
    }
    function watch(reg: ServiceWorkerRegistration) {
      registration.current = reg;
      if (reg.waiting && navigator.serviceWorker.controller) setAvailable(true);
      function installing() {
        const worker = reg.installing;
        if (!worker) return;
        const change = () => {
          if (
            !disposed &&
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          )
            setAvailable(true);
        };
        worker.addEventListener("statechange", change);
        cleanups.push(() => worker.removeEventListener("statechange", change));
        change();
      }
      reg.addEventListener("updatefound", installing);
      cleanups.push(() => reg.removeEventListener("updatefound", installing));
      installing();
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", reload);
      cleanups.push(() =>
        navigator.serviceWorker.removeEventListener("controllerchange", reload),
      );
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((reg) => {
          if (!disposed) watch(reg);
        })
        .catch(() => {});
    }
    async function check() {
      if (
        document.visibilityState !== "visible" ||
        pending ||
        !navigator.onLine
      )
        return;
      pending = true;
      const request = new AbortController();
      const abort = () => request.abort();
      controller.signal.addEventListener("abort", abort, { once: true });
      const timeout = window.setTimeout(abort, 10000);
      try {
        const response = await fetch("/api/version", {
          cache: "no-store",
          signal: request.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        if (
          !disposed &&
          typeof data.version === "string" &&
          data.version &&
          data.version !== process.env.NEXT_PUBLIC_ESPERANCA_VERSION
        ) {
          setAvailable(true);
          void registration.current?.update().catch(() => {});
        }
      } catch {
        /* A failed request is not a new version. */
      } finally {
        clearTimeout(timeout);
        controller.signal.removeEventListener("abort", abort);
        pending = false;
      }
    }
    void check();
    const timer = window.setInterval(check, 60000);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("online", check);
    return () => {
      disposed = true;
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("online", check);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  async function update() {
    setUpdating(true);
    setError("");
    try {
      const response = await fetch("/api/version", {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("offline");
      const reg = registration.current;
      const worker = reg ? await installedUpdate(reg) : null;
      accepted.current = true;
      if (worker) {
        // Do not leave the button stuck if activation fails or the worker disappears.
        await new Promise<void>((resolve, reject) => {
          const timeout = window.setTimeout(() => {
            navigator.serviceWorker.removeEventListener(
              "controllerchange",
              changed,
            );
            reject(new Error("activation-timeout"));
          }, 15000);
          function changed() {
            clearTimeout(timeout);
            resolve();
          }
          navigator.serviceWorker.addEventListener(
            "controllerchange",
            changed,
            { once: true },
          );
          worker.postMessage({ type: "SKIP_WAITING" });
        });
        // The main controllerchange listener reloads exactly once.
      } else if (!reloading.current) {
        reloading.current = true;
        window.location.reload();
      }
    } catch {
      accepted.current = false;
      setUpdating(false);
      setError(
        "Não foi possível atualizar. Confira sua conexão e tente novamente.",
      );
    }
  }
  if (!available) return null;
  return (
    <aside
      className="app-update"
      role="status"
      aria-live="polite"
      aria-label="Atualização do aplicativo"
    >
      <div>
        <strong>Nova versão disponível</strong>
        {error && <p>{error}</p>}
      </div>
      <button type="button" onClick={update} disabled={updating}>
        <RefreshCw size={16} aria-hidden="true" />
        {updating ? "Atualizando…" : "Atualizar"}
      </button>
    </aside>
  );
}
