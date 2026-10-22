/** Wait for the installed update, including an installation already in flight. */
export async function installedUpdate(
  registration: ServiceWorkerRegistration,
): Promise<ServiceWorker | null> {
  await registration.update();
  if (registration.waiting) return registration.waiting;
  const worker = registration.installing;
  if (!worker) return null;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("update-timeout"));
    }, 15000);
    function cleanup() {
      clearTimeout(timer);
      worker!.removeEventListener("statechange", change);
    }
    function change() {
      if (worker!.state === "installed") {
        cleanup();
        resolve(registration.waiting ?? worker);
      }
      if (worker!.state === "redundant") {
        cleanup();
        reject(new Error("update-failed"));
      }
    }
    worker.addEventListener("statechange", change);
    change();
  });
}
