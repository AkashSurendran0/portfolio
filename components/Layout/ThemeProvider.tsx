"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: (e: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [rippleTarget, setRippleTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent) => {
    setRippleTarget({
      x: e.clientX,
      y: e.clientY,
    });
    
    // Slight delay to align color switch with ripple expansion
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 150);
    
    setTimeout(() => {
      setRippleTarget(null);
    }, 1000);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <AnimatePresence>
        {rippleTarget && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 150, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: rippleTarget.y - 10,
              left: rippleTarget.x - 10,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: theme === "dark" ? "#ededed" : "#000000",
              pointerEvents: "none",
              zIndex: 9999,
              transformOrigin: "center center",
            }}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
