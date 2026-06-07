"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { api } from "@/lib/api";

const MAX_LENGTH = 500;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("welcome") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.chat(text);
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      // Show a proper error message instead of the welcome message
      setMessages((m) => [
        ...m,
        { role: "assistant", content: t("error") },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() =>
        endRef.current?.scrollIntoView({ behavior: "smooth" })
      );
    }
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background-2 text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-muted">{t("thinking")}</div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          maxLength={MAX_LENGTH}
          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary p-2 text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          aria-label={t("send")}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
