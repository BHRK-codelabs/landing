"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const scenes = [
  {
    id: "scene-01",
    title: "Tu negocio no necesita más ruido.",
    accent: "Necesita dirección y ejecución.",
    align: "items-start text-left",
    gradient:
      "radial-gradient(ellipse at 30% 46%, rgba(56,240,255,0.55), transparent 54%), radial-gradient(ellipse at 64% 30%, rgba(27,39,255,0.5), transparent 52%), radial-gradient(ellipse at 74% 74%, rgba(255,0,144,0.4), transparent 50%), radial-gradient(ellipse at 98% 52%, rgba(255,149,0,0.34), transparent 44%), linear-gradient(180deg, rgba(8,10,18,0.86), rgba(8,10,18,0.94))",
  },
  {
    id: "scene-02",
    title: "Convertimos necesidad operativa en solución real.",
    accent: "Sin humo. Sin vueltas.",
    align: "items-center text-center",
    gradient:
      "radial-gradient(ellipse at 46% 58%, rgba(0,230,255,0.54), transparent 56%), radial-gradient(ellipse at 68% 40%, rgba(53,206,255,0.44), transparent 52%), radial-gradient(ellipse at 84% 34%, rgba(255,184,48,0.42), transparent 46%), radial-gradient(ellipse at 16% 22%, rgba(255,154,0,0.32), transparent 44%), linear-gradient(180deg, rgba(10,16,24,0.84), rgba(10,16,24,0.92))",
  },
  {
    id: "scene-03",
    title: "Ahora sí: estas son nuestras capacidades activas.",
    accent: "Servicios listos para mover resultados.",
    align: "items-end text-right",
    gradient:
      "radial-gradient(ellipse at 40% 42%, rgba(32,255,42,0.52), transparent 56%), radial-gradient(ellipse at 26% 62%, rgba(229,255,84,0.42), transparent 52%), radial-gradient(ellipse at 18% 80%, rgba(255,170,52,0.34), transparent 46%), radial-gradient(ellipse at 94% 82%, rgba(0,110,255,0.34), transparent 42%), linear-gradient(180deg, rgba(8,20,14,0.84), rgba(8,20,14,0.92))",
  },
] as const;

function stepTowardIndex(previous: number, target: number) {
  if (target === previous) {
    return previous;
  }
  return previous + (target > previous ? 1 : -1);
}

export function IntroParallaxPhrase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const syncedScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.28,
  });

  const activeIdxProgress = useTransform(
    syncedScroll,
    [0.06, 0.94],
    [0, scenes.length],
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const lastSceneTransitionAt = useRef(0);
  const SCENE_TRANSITION_MIN_MS = 780;
  useMotionValueEvent(activeIdxProgress, "change", (value) => {
    const next = Math.max(
      0,
      Math.min(scenes.length - 1, Math.floor(value + Number.EPSILON)),
    );
    const now = Date.now();
    setActiveIdx((previous) => {
      const stepped = stepTowardIndex(previous, next);
      if (stepped === previous) {
        return previous;
      }
      if (now - lastSceneTransitionAt.current < SCENE_TRANSITION_MIN_MS) {
        return previous;
      }
      lastSceneTransitionAt.current = now;
      return stepped;
    });
  });

  const bgShift = useTransform(syncedScroll, [0, 1], [-14, 24]);
  const blobAX = useTransform(syncedScroll, [0, 1], [-30, 36]);
  const blobAY = useTransform(syncedScroll, [0, 1], [14, -22]);
  const blobBX = useTransform(syncedScroll, [0, 1], [26, -34]);
  const blobBY = useTransform(syncedScroll, [0, 1], [-12, 20]);
  const stageOpacity = useTransform(syncedScroll, [0, 0.08, 0.9, 1], [0.15, 1, 1, 0.1]);
  const stageY = useTransform(syncedScroll, [0, 0.1, 1], [26, 0, -26]);

  return (
    <section
      ref={rootRef}
      aria-label="Transición hacia servicios"
      className="relative h-[calc(100svh*4.4)]"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <motion.div
        className="sticky top-0 h-[100svh] overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-base)] md:top-16 md:h-[calc(100svh-4rem)]"
        style={{ opacity: stageOpacity, y: stageY }}
      >
        <motion.div
          aria-hidden
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.92 }}
          style={{
            background: scenes[activeIdx]?.gradient,
            y: reducedMotion ? undefined : bgShift,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[22%] top-[34%] h-72 w-72 rounded-full bg-white/34 blur-[110px] mix-blend-screen"
          style={reducedMotion ? undefined : { x: blobAX, y: blobAY }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[14%] top-[56%] h-64 w-64 rounded-full bg-white/28 blur-[120px] mix-blend-screen"
          style={reducedMotion ? undefined : { x: blobBX, y: blobBY }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 24%, rgba(6,7,10,0.2) 76%, rgba(2,3,5,0.4) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22) 0 1px, transparent 1px 3px)",
            backgroundSize: "3px 3px",
          }}
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
                transition={{ duration: reducedMotion ? 0 : 0.85, ease: "easeOut" }}
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
                transition={{ duration: reducedMotion ? 0 : 0.55 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
