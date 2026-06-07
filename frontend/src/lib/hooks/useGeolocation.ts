"use client";

import { useCallback, useState } from "react";

// Error keys that map directly to translation keys under "location.*"
export type GeoErrorKey = "denied" | "unavailable" | "timeout";

interface GeoState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: GeoErrorKey | null;
}

function toErrorKey(code: number): GeoErrorKey {
  if (code === GeolocationPositionError.PERMISSION_DENIED) return "denied";
  if (code === GeolocationPositionError.POSITION_UNAVAILABLE) return "unavailable";
  return "timeout";
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
      setState((s) => ({ ...s, error: "unavailable" }));
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
        setState((s) => ({
          ...s,
          loading: false,
          error: toErrorKey(err.code),
        })),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return { ...state, detect };
}
