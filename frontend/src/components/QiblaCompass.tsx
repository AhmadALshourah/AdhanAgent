"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatDegrees } from "@/lib/locale-utils";

export function QiblaCompass({ direction }: { direction: number }) {
  const t = useTranslations("qibla");
  const locale = useLocale();

  // Cardinals come from translations so Arabic uses ش/ج/شر/غ
  const C = (k: "N" | "S" | "E" | "W") => t(`cardinals.${k}`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5"
    >
      <div className="relative grid h-72 w-72 place-items-center rounded-full border border-border bg-card shadow-soft">
        {/* Decorative inner ring */}
        <div className="absolute inset-3 rounded-full border border-dashed border-primary/30" />

        {/* Cardinal marks — translated */}
        <span className="absolute top-3 text-xs font-bold text-muted">{C("N")}</span>
        <span className="absolute bottom-3 text-xs font-bold text-muted">{C("S")}</span>
        <span className="absolute start-3 text-xs font-bold text-muted">{C("W")}</span>
        <span className="absolute end-3 text-xs font-bold text-muted">{C("E")}</span>

        {/* Qibla needle — always rotates in visual (LTR) space */}
        <motion.div
          className="absolute"
          initial={{ rotate: 0 }}
          animate={{ rotate: direction }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <Navigation
            size={130}
            className="text-primary drop-shadow"
            fill="currentColor"
          />
        </motion.div>

        {/* Center dot */}
        <span className="absolute h-3 w-3 rounded-full bg-accent ring-4 ring-card" />
      </div>

      <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary">
        <Navigation size={16} />
        <span className="font-semibold">
          {t("direction")}: {formatDegrees(direction, locale)}
        </span>
      </div>
      <p className="max-w-xs text-center text-sm text-muted">
        {t("instruction")}
      </p>
    </motion.div>
  );
}
