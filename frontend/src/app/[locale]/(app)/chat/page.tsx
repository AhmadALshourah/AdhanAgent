"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { MotionPage } from "@/components/ui/MotionPage";

const ChatWidget = dynamic(
  () => import("@/components/ChatWidget").then((m) => ({ default: m.ChatWidget })),
  {
    loading: () => (
      <div className="h-[70vh] animate-pulse rounded-2xl border border-border bg-card" />
    ),
    ssr: false,
  }
);

export default function ChatPage() {
  const t = useTranslations();

  return (
    <MotionPage>
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-bold">{t("chat.title")}</h1>
        </header>
        <ChatWidget />
      </div>
    </MotionPage>
  );
}
