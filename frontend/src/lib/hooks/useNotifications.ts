"use client";

import { useCallback, useEffect, useState } from "react";

export type NotifPermission = "granted" | "denied" | "default" | "unsupported";

export function useNotifications() {
  const [permission, setPermission] = useState<NotifPermission>("default");

  useEffect(() => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
    } else {
      setPermission(Notification.permission as NotifPermission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result as NotifPermission);
  }, []);

  const notify = useCallback(
    (title: string, body?: string) => {
      if (permission !== "granted") return;
      new Notification(title, {
        body,
        icon: "/icons/icon.svg",
        badge: "/icons/icon.svg",
        tag: "adhan-prayer",
      });
    },
    [permission]
  );

  return { permission, requestPermission, notify };
}
