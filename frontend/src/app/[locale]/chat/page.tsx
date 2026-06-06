"use client";

import { useTranslations } from "next-intl";
import { ChatWidget } from "@/components/ChatWidget";
import { MotionPage } from "@/components/ui/MotionPage";

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
