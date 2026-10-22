"use client";
import { useEffect } from "react";

export function Pwa() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    )
      return;
    // A new worker takes over on the next launch, without interrupting forms.
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .catch(() => {
        // The app remains usable when offline support is unavailable.
      });
  }, []);
  return null;
}
