"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-6 top-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-[#CCFF00]/30 bg-black/50 backdrop-blur-md transition-all hover:scale-110 hover:border-[#CCFF00]"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#CCFF00]" />
      ) : (
        <Moon className="h-5 w-5 text-[#6D28D9]" />
      )}
    </button>
  );
}
