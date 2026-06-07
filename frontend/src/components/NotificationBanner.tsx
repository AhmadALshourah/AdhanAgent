"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Volume2, VolumeX, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useInstallPrompt } from "@/lib/hooks/useInstallPrompt";
import { useNotifications } from "@/lib/hooks/useNotifications";

interface Props {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function NotificationBanner({ soundEnabled, onToggleSound }: Props) {
  const t = useTranslations("notifications");
  const { permission, requestPermission } = useNotifications();
  const { canInstall, install } = useInstallPrompt();

  // Separate dismiss states so closing one banner doesn't hide the other
  const [dismissedNotif, setDismissedNotif] = useState(false);
  const [dismissedInstall, setDismissedInstall] = useState(false);

  const showNotifBanner = !dismissedNotif && permission === "default";
  const showInstallBanner = !dismissedInstall && canInstall;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {showNotifBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3"
          >
            <Bell size={18} className="shrink-0 text-primary" />
            <p className="flex-1 text-sm">{t("enablePrompt")}</p>
            <button
              onClick={requestPermission}
              className="shrink-0 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
            >
              {t("enable")}
            </button>
            <button
              onClick={() => setDismissedNotif(true)}
              aria-label="Dismiss"
              className="text-muted hover:text-foreground"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3"
          >
            <span className="text-lg">📲</span>
            <p className="flex-1 text-sm">{t("installPrompt")}</p>
            <button
              onClick={install}
              className="shrink-0 rounded-lg bg-accent px-3 py-1 text-xs font-semibold text-foreground"
            >
              {t("install")}
            </button>
            <button
              onClick={() => setDismissedInstall(true)}
              aria-label="Dismiss"
              className="text-muted hover:text-foreground"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound toggle — always visible */}
      <div className="flex justify-end">
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? t("muteSound") : t("enableSound")}
          title={soundEnabled ? t("muteSound") : t("enableSound")}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition hover:border-primary hover:text-primary"
        >
          {soundEnabled ? (
            <><Volume2 size={14} /> {t("soundOn")}</>
          ) : (
            <><VolumeX size={14} /> {t("soundOff")}</>
          )}
        </button>
      </div>
    </div>
  );
}
