"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function stepTowardIndex(previous: number, target: number) {
  if (target === previous) {
    return previous;
  }
  return previous + (target > previous ? 1 : -1);
}

export function BgLayer({
  index,
  morphIndex = 0,
}: {
  index: number;
  morphIndex?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yA = useTransform(scrollYProgress, [0, 1], [22, -40]);
  const yB = useTransform(scrollYProgress, [0, 1], [48, -72]);
  const yC = useTransform(scrollYProgress, [0, 1], [96, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.36, 0.2]);

  const morphA = [
    "M40 170 C 260 290, 430 100, 630 220 C 840 340, 930 170, 1160 280",
    "M40 188 C 260 300, 430 124, 630 236 C 840 348, 930 188, 1160 296",
    "M40 156 C 260 276, 430 92, 630 212 C 840 330, 930 162, 1160 272",
    "M40 180 C 260 304, 430 116, 630 228 C 840 344, 930 176, 1160 286",
    "M40 166 C 260 286, 430 98, 630 218 C 840 334, 930 168, 1160 278",
  ] as const;
  const morphB = [
    "M40 520 C 230 420, 420 620, 640 520 C 850 420, 980 620, 1160 520",
    "M40 500 C 230 404, 420 604, 640 508 C 850 412, 980 612, 1160 510",
    "M40 538 C 230 436, 420 640, 640 532 C 850 426, 980 636, 1160 532",
    "M40 512 C 230 412, 420 612, 640 514 C 850 414, 980 614, 1160 514",
    "M40 526 C 230 426, 420 626, 640 524 C 850 424, 980 628, 1160 524",
  ] as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" ref={ref}>
      <motion.div
        className="absolute -left-20 top-8 h-72 w-72 rounded-full border border-white/10"
        style={reducedMotion ? undefined : { y: yA }}
      />
      <motion.div
        className="absolute -right-24 bottom-[-6rem] h-[26rem] w-[26rem] rounded-full border border-white/10"
        style={reducedMotion ? undefined : { y: yB }}
      />
      <motion.div
        className="absolute left-[18%] top-[12%] h-60 w-60 rounded-full border border-[var(--color-accent-lime)]/30 blur-[1px]"
        style={reducedMotion ? undefined : { rotate, y: yC }}
      />
      <motion.div
        className="absolute right-[16%] top-[20%] h-44 w-44 rounded-full bg-[var(--color-accent-cyan)]/20 blur-3xl"
        style={reducedMotion ? undefined : { opacity: glowOpacity, y: yA }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[36%] h-44 w-44 rounded-full bg-[var(--color-accent-amber)]/20 blur-3xl"
        style={reducedMotion ? undefined : { opacity: glowOpacity, y: yB }}
      />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-55" focusable="false" preserveAspectRatio="none" viewBox="0 0 1200 700">
        <motion.path
          animate={{ d: morphA[morphIndex % morphA.length] }}
          d={morphA[0]}
          fill="none"
          stroke={index % 2 === 0 ? "rgba(0,212,255,0.24)" : "rgba(124,58,237,0.24)"}
          strokeWidth="1.35"
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
        <motion.path
          animate={{ d: morphB[morphIndex % morphB.length] }}
          d={morphB[0]}
          fill="none"
          stroke={index % 2 === 0 ? "rgba(217,225,32,0.22)" : "rgba(0,212,255,0.22)"}
          strokeWidth="1.35"
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
        <path
          d="M40 340 C 220 250, 420 430, 620 320 C 800 230, 980 410, 1160 300"
          fill="none"
          stroke="rgba(255,149,0,0.2)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
