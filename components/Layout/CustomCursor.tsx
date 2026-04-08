"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide cursor if it hasn't moved yet
  if (mousePosition.x === 0 && mousePosition.y === 0) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full border border-[#CCFF00]/50 bg-[#CCFF00]/20 mix-blend-difference backdrop-blur-sm"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering
          ? "rgba(204, 255, 0, 0.8)"
          : "rgba(204, 255, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        stiffness: 150,
        damping: 15,
      }}
    />
  );
}
