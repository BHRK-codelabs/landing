"use client";

import type { MotionValue } from "framer-motion";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Crosshair, RefreshCw, ScanLine } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { BgLayer, stepTowardIndex } from "./shared";
import type { NarrativeSection } from "./types";

function MethodView({
  section,
  active,
  direction,
  progress,
}: {
  section: NarrativeSection;
  active: number;
  direction: 1 | -1;
  progress: MotionValue<number>;
}) {
  const reducedMotion = useReducedMotion();
  const progressPct = useMemo(
    () => ((active + 1) / section.beats.length) * 100,
    [active, section.beats.length],
  );
  const railY = useTransform(progress, [0, 1], [80, -96]);

  return (
    <div className="grid h-full min-h-0 gap-8 md:grid-cols-[1fr_1fr]">
      <div className="relative flex h-full flex-col justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
          {section.eyebrow}
        </p>
        <h2 className="hero-glow mt-4 max-w-xl text-display text-[clamp(2rem,3vw+0.9rem,4rem)] font-bold leading-[1.04]">
          {section.title}
        </h2>
        <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">
          {section.lead}
        </p>
        <div className="mt-8 h-1.5 max-w-md overflow-hidden rounded-full bg-white/12">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent-cyan),var(--color-accent-lime),var(--color-accent-amber))] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          {`0${active + 1}`} / {`0${section.beats.length}`} etapa activa
        </p>
      </div>

      <div className="relative flex min-h-0 h-full items-center overflow-hidden">
        <motion.div
          className="pointer-events-none absolute left-2 top-0 h-full w-px bg-white/15 md:left-8"
          style={reducedMotion ? undefined : { y: railY }}
        />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={section.beats[active]?.title}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full pl-8 md:pl-14"
            exit={{ opacity: 0, y: direction > 0 ? -90 : 90 }}
            initial={{ opacity: 0, y: direction > 0 ? 90 : -90 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
              Etapa {`0${active + 1}`}
            </p>
            <p className="mt-3 text-[clamp(2rem,3vw+0.6rem,3.2rem)] font-semibold leading-[0.95]">
              {section.beats[active]?.title}
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text-secondary)]">
              {section.beats[active]?.description}
            </p>
            <div className="mt-8 flex max-w-sm items-center gap-2.5">
              {section.beats.map((beat, idx) => (
                <motion.span
                  key={beat.title}
                  animate={
                    idx === active
                      ? { opacity: [0.5, 1, 0.5], scaleX: [1, 1.25, 1] }
                      : { opacity: [0.28, 0.48, 0.28] }
                  }
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor:
                      idx % 3 === 0
                        ? "var(--color-accent-cyan)"
                        : idx % 3 === 1
                          ? "var(--color-accent-lime)"
                          : "var(--color-accent-amber)",
                    width: idx === active ? 44 : 18,
                  }}
                  transition={{
                    duration: idx === active ? 1.5 : 2.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MethodPanel({
  section,
  index,
}: {
  section: NarrativeSection;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const syncedScroll = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 24,
    mass: 0.32,
  });
  const mapped = useTransform(
    syncedScroll,
    [0.04, 0.96],
    [0, section.beats.length],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionOpacity = useTransform(
    syncedScroll,
    [0, 0.08, 0.84, 1],
    [0.15, 1, 1, 0.06],
  );
  const sectionY = useTransform(syncedScroll, [0, 0.08, 1], [34, 0, -56]);

  useMotionValueEvent(mapped, "change", (v) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(v + Number.EPSILON)),
    );
    setActive((prev) => {
      const stepped = stepTowardIndex(prev, next);
      if (prev === stepped) {
        return prev;
      }
      setDirection(stepped > prev ? 1 : -1);
      return stepped;
    });
  });

  return (
    <section
      ref={rootRef}
      className="relative h-[calc(100svh*7.3)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-0 h-[100svh] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(23,23,31,0.94))] md:top-16 md:h-[calc(100svh-4rem)]"
        style={{ opacity: sectionOpacity, y: sectionY }}
      >
        <BgLayer index={index} morphIndex={active} />
        <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-12 md:py-14">
          <MethodView
            active={active}
            direction={direction}
            progress={scrollYProgress}
            section={section}
          />
        </div>
      </motion.article>
    </section>
  );
}


export { MethodPanel };
