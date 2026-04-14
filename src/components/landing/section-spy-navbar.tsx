"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type SpyItem = {
  id: string;
  label: string;
};

type SectionSpyNavbarProps = {
  items: SpyItem[];
};

export function SectionSpyNavbar({ items }: SectionSpyNavbarProps) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    let frame = 0;

    const updateActive = () => {
      const viewportHeight = window.innerHeight;
      const marker = viewportHeight * 0.24;
      let bestId = items[0]?.id ?? "";
      let bestScore = -Infinity;

      for (const item of items) {
        const node = document.getElementById(item.id);
        if (!node) {
          continue;
        }

        const rect = node.getBoundingClientRect();
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const clampedVisiblePx = Math.max(0, visiblePx);
        const visibleRatio = clampedVisiblePx / Math.max(1, rect.height);
        const distance = Math.abs(rect.top - marker);
        const score = visibleRatio * 2.2 - distance / viewportHeight;

        if (score > bestScore) {
          bestScore = score;
          bestId = item.id;
        }
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    const onScrollOrResize = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  return (
    <>
      <div className="hidden md:flex md:items-center md:gap-1">
        <div className="relative rounded-2xl bg-white/[0.06] px-1.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-[78%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.28),rgba(124,58,237,0.2),rgba(255,149,0,0.2))] blur-xl"
            animate={reducedMotion ? undefined : { opacity: [0.28, 0.5, 0.28] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 3.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
            }
          />
          <div className="relative flex items-center gap-0.5">
            {items.map((item) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  className={`relative rounded-xl px-3 py-2 text-xs font-medium tracking-[0.08em] transition ${
                    active
                      ? "text-[var(--color-accent-cyan)]"
                      : "text-white/72 hover:text-white"
                  }`}
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      className="absolute -bottom-0.5 left-1/2 h-px w-[70%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.9),rgba(124,58,237,0.45))]"
                      layoutId="section-spy-desktop-active-line"
                      transition={
                        reducedMotion
                          ? { duration: 0.01 }
                          : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                      }
                    />
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[56] px-3 md:hidden">
        <div className="pointer-events-auto mx-auto w-full max-w-[min(96vw,42rem)] overflow-x-auto rounded-2xl bg-white/[0.07] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_12px_28px_rgba(6,14,30,0.32)] backdrop-blur-2xl">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-2 left-1/2 h-5 w-[82%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.24),rgba(124,58,237,0.18),rgba(255,149,0,0.18))] blur-xl"
            animate={reducedMotion ? undefined : { opacity: [0.24, 0.42, 0.24] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 3.6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
            }
          />
          <div className="flex min-w-max items-center gap-1">
            {items.map((item) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition ${
                    active ? "text-white" : "text-white/72 hover:text-white"
                  }`}
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      className="absolute -bottom-0.5 left-1/2 h-px w-[74%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.9),rgba(124,58,237,0.45))]"
                      layoutId="section-spy-mobile-active-line"
                      transition={
                        reducedMotion
                          ? { duration: 0.01 }
                          : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }
                    />
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
