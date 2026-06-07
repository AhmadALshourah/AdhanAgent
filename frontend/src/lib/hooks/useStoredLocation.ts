"use client";

import { useState } from "react";

export interface StoredLocation {
  city: string;
  country: string;
}

const DEFAULT: StoredLocation = { city: "Makkah", country: "Saudi Arabia" };
const KEY = "adhan.location";

function readFromStorage(): StoredLocation {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredLocation) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function useStoredLocation() {
  // Lazy initialiser runs once on mount — reads localStorage immediately,
  // preventing a hydration flash where the default city briefly shows.
  const [location, setLocationState] = useState<StoredLocation>(readFromStorage);

  function setLocation(next: StoredLocation) {
    setLocationState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* quota exceeded — ignore */
    }
  }

  return { location, setLocation };
}
