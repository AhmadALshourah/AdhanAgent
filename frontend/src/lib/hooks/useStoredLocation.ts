"use client";

import { useEffect, useState } from "react";

export interface StoredLocation {
  city: string;
  country: string;
}

const DEFAULT: StoredLocation = { city: "Makkah", country: "Saudi Arabia" };
const KEY = "adhan.location";

export function useStoredLocation() {
  const [location, setLocationState] = useState<StoredLocation>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLocationState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function setLocation(next: StoredLocation) {
    setLocationState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  return { location, setLocation };
}
