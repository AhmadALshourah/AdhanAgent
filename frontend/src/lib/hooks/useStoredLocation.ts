"use client";

import { useEffect, useState } from "react";

export interface StoredLocation {
  city: string;
  country: string;
}

const DEFAULT: StoredLocation = { city: "Makkah", country: "Saudi Arabia" };
const KEY = "adhan.location";

export function useStoredLocation() {
  // Always start with DEFAULT so SSR and first client render match (no hydration mismatch).
  // After mount, read localStorage and update if a stored value exists.
  const [location, setLocationState] = useState<StoredLocation>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredLocation;
        setLocationState(stored);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function setLocation(next: StoredLocation) {
    setLocationState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // quota exceeded — ignore
    }
  }

  return { location, setLocation };
}
