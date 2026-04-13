"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterBadgeProps = {
  items: string[];
};

function TypewriterLine({ value }: { value: string }) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    const timer = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= value.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 35);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <span className="inline-flex items-center">
      {value.slice(0, visibleChars)}
      <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[var(--color-accent-cyan)]" />
    </span>
  );
}

export function TypewriterBadge({ items }: TypewriterBadgeProps) {
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

  const active = items[index];

  if (reducedMotion) {
    return (
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
        {active}
      </p>
    );
  }

  return (
    <div className="mt-4 h-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <TypewriterLine value={active} />
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
