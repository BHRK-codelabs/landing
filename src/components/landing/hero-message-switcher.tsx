"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroMessageSwitcherProps = {
  messages: string[];
};

export function HeroMessageSwitcher({ messages }: HeroMessageSwitcherProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || messages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [messages.length, reducedMotion]);

  if (messages.length === 0) {
    return null;
  }

  if (reducedMotion) {
    return (
      <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[var(--color-text-secondary)]">
        {messages[0]}
      </p>
    );
  }

  return (
    <div className="mt-6 min-h-[7rem] max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[index]}
          animate={{ opacity: 1, y: 0 }}
          className="text-base leading-[1.6] text-[var(--color-text-secondary)]"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
