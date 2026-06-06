"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function useTimingsByCity(city: string, country: string, enabled: boolean) {
  return useQuery({
    queryKey: ["timings", "city", city, country],
    queryFn: () => api.timingsByCity(city, country),
    enabled: enabled && !!city && !!country,
  });
}

export function useTimingsByCoords(
  lat: number | null,
  lng: number | null
) {
  return useQuery({
    queryKey: ["timings", "coords", lat, lng],
    queryFn: () => api.timingsByCoords(lat!, lng!),
    enabled: lat !== null && lng !== null,
  });
}

export function useCalendar(
  city: string,
  country: string,
  month: number,
  year: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["calendar", city, country, month, year],
    queryFn: () => api.calendar(city, country, month, year),
    enabled: enabled && !!city && !!country,
  });
}

export function useQibla(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ["qibla", lat, lng],
    queryFn: () => api.qibla(lat!, lng!),
    enabled: lat !== null && lng !== null,
  });
}
