"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  // Lazy initializer: reads the actual DOM class on every mount (including
  // after a locale-switch remount). Never starts as the wrong value.
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    const value = next ? "dark" : "light";
    localStorage.theme = value;
    // Mirror to cookie so the server-side layout reads the correct theme
    // during RSC navigation (locale switch) and includes `dark` in className.
    document.cookie = `theme=${value};path=/;max-age=31536000;SameSite=Lax`;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-lg border border-border transition hover:bg-background-2"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
