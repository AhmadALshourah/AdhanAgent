"use client";

import { useCallback, useState } from "react";

interface GeoState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lng: null,
    loading: false,
    error: null,
  });

  const detect = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState((s) => ({ ...s, error: "Geolocation unsupported" }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        }),
      (err) =>
        setState((s) => ({ ...s, loading: false, error: err.message })),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return { ...state, detect };
}
