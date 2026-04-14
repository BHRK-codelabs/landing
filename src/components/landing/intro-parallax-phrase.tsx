"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const scenes = [
  {
    id: "scene-01",
    title: "Tu negocio no necesita mas ruido.",
    accent: "Necesita direccion y ejecucion.",
    align: "items-start text-left",
    gradient:
      "radial-gradient(ellipse_at_18%_30%,rgba(0,212,255,0.18),transparent_54%),radial-gradient(ellipse_at_78%_72%,rgba(124,58,237,0.1),transparent_48%),linear-gradient(180deg,rgba(13,13,15,0.95),rgba(13,13,15,1))",
  },
  {
    id: "scene-02",
    title: "Convertimos necesidad operativa en solucion real.",
    accent: "Sin humo. Sin vueltas.",
    align: "items-center text-center",
    gradient:
      "radial-gradient(ellipse_at_50%_34%,rgba(217,225,32,0.14),transparent_52%),radial-gradient(ellipse_at_74%_68%,rgba(0,212,255,0.12),transparent_48%),linear-gradient(180deg,rgba(13,13,15,0.95),rgba(13,13,15,1))",
  },
  {
    id: "scene-03",
    title: "Ahora si: estas son nuestras capacidades activas.",
    accent: "Servicios listos para mover resultados.",
    align: "items-end text-right",
    gradient:
      "radial-gradient(ellipse_at_24%_70%,rgba(255,149,0,0.16),transparent_52%),radial-gradient(ellipse_at_82%_32%,rgba(0,212,255,0.14),transparent_48%),linear-gradient(180deg,rgba(13,13,15,0.95),rgba(13,13,15,1))",
  },
] as const;

export function IntroParallaxPhrase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const activeIdxProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scenes.length - 1],
  );
  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(activeIdxProgress, "change", (value) => {
    const next = Math.max(0, Math.min(scenes.length - 1, Math.round(value)));
    setActiveIdx(next);
  });

  const bgShift = useTransform(scrollYProgress, [0, 1], [-14, 24]);
  const haloX = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const haloY = useTransform(scrollYProgress, [0, 1], [24, -34]);

  return (
    <section
      ref={rootRef}
      aria-label="Transicion hacia servicios"
      className="relative h-[calc(100svh*3.2)]"
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-base)]">
        <motion.div
          aria-hidden
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.84 }}
          style={{
            background: scenes[activeIdx]?.gradient,
            y: reducedMotion ? undefined : bgShift,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent-cyan)]/30 blur-[1px]"
          style={reducedMotion ? undefined : { x: haloX, y: haloY }}
        />

        <div className="relative z-10 grid h-full grid-rows-[1fr_auto] px-7 pb-10 pt-12 md:px-12 md:pb-12">
          <div className="relative overflow-hidden">
            {scenes.map((scene, idx) => (
              <motion.div
                key={scene.id}
                animate={{
                  opacity: idx === activeIdx ? 1 : 0,
                  x: idx === activeIdx ? 0 : idx < activeIdx ? -36 : 36,
                  y: idx === activeIdx ? 0 : idx < activeIdx ? -18 : 18,
                  scale: idx === activeIdx ? 1 : 0.98,
                }}
                className={`absolute inset-0 flex flex-col justify-center ${scene.align}`}
                transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
              >
                <p className="mt-3 max-w-5xl text-display text-[clamp(1.65rem,3vw+0.8rem,3.9rem)] font-extrabold leading-[0.98] text-[var(--color-text-primary)]">
                  {scene.title}
                </p>
                <p className="mt-4 max-w-3xl font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)] md:text-xs">
                  {scene.accent}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-5xl items-center gap-2">
            {scenes.map((scene, idx) => (
              <motion.span
                key={`step-${scene.id}`}
                animate={{ opacity: idx === activeIdx ? 1 : 0.32 }}
                className="h-[2px] flex-1 rounded-full bg-[var(--color-accent-cyan)]"
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
