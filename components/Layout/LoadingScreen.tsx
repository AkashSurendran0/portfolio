"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 5 and 15
        return Math.min(100, prev + Math.floor(Math.random() * 15) + 5);
      });
    }, 150); // 150ms * (roughly 10-15 steps) ~= 1.5 - 2s

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-[#CCFF00] font-mono pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-widest uppercase relative"
            >
              Initializing
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                _
              </motion.span>
            </motion.div>
            
            <div className="flex items-center gap-4 w-64 mt-8 text-sm md:text-base text-white/70">
              <span>System</span>
              <div className="flex-1 h-[2px] bg-white/20 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#CCFF00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="w-12 text-right">{progress}%</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 left-10 md:bottom-12 md:left-12 text-xs md:text-sm text-white/40 tracking-widest max-w-[200px]"
          >
            BOOTING VINTAGE MODERN ENVIRONMENT // CORE SYSTEMS ONLINE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
