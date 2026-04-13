"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroServiceTickerProps = {
  items: string[];
};

export function HeroServiceTicker({ items }: HeroServiceTickerProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || items.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [items.length, reducedMotion]);

  if (items.length === 0) {
    return null;
  }

  if (reducedMotion) {
    return (
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
        {items[0]}
      </p>
    );
  }

  return (
    <div className="mt-4 h-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={items[index]}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {items[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
