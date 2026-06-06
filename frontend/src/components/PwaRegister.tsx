"use client";

import { useEffect } from "react";

/** Registers the service worker once on mount. */
export function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.warn("SW registration failed:", err));
    }
  }, []);

  return null;
}
