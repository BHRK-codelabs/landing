"use client";

import {
  AnimatePresence,
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

const INTRO_CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export function IntroParallaxPhrase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const syncedScroll = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 24,
    mass: 0.66,
  });

  const activeIdxProgress = useTransform(
    syncedScroll,
    [0.14, 0.88],
    [0, scenes.length],
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  useMotionValueEvent(activeIdxProgress, "change", (value) => {
    const next = Math.max(
      0,
      Math.min(scenes.length - 1, Math.floor(value + Number.EPSILON)),
    );
    setActiveIdx((prev) => {
      if (prev === next) {
        return prev;
      }
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  const bgShift = useTransform(syncedScroll, [0, 1], [-14, 24]);
  const blobAX = useTransform(syncedScroll, [0, 1], [-30, 36]);
  const blobAY = useTransform(syncedScroll, [0, 1], [14, -22]);
  const blobBX = useTransform(syncedScroll, [0, 1], [26, -34]);
  const blobBY = useTransform(syncedScroll, [0, 1], [-12, 20]);
  const stageOpacity = useTransform(
    syncedScroll,
    [0, 0.06, 0.9, 1],
    [0.08, 1, 1, 0.06],
  );
  const stageY = useTransform(syncedScroll, [0, 0.08, 1], [34, 0, -46]);

  return (
    <section
      ref={rootRef}
      aria-label="Transición hacia servicios"
      className="relative h-[calc(100svh*6.4)]"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <motion.div
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-[var(--color-bg-base)]"
        style={{ opacity: stageOpacity, y: stageY }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`bg-${scenes[activeIdx]?.id}`}
            aria-hidden
            animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
            className="pointer-events-none absolute inset-0"
            exit={{
              opacity: 0,
              rotate: direction > 0 ? -0.2 : 0.2,
              scale: 0.994,
              y: direction > 0 ? -16 : 16,
            }}
            initial={{
              opacity: 0,
              rotate: direction > 0 ? 0.2 : -0.2,
              scale: 1.006,
              y: direction > 0 ? 18 : -18,
            }}
            style={{
              background: scenes[activeIdx]?.gradient,
              y: reducedMotion ? undefined : bgShift,
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 1.1, ease: INTRO_CINEMATIC_EASE }
            }
          />
        </AnimatePresence>
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
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={scenes[activeIdx]?.id}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                className={`absolute inset-0 flex flex-col justify-center ${scenes[activeIdx]?.align}`}
                exit={{
                  filter: "blur(5px)",
                  opacity: 0,
                  scale: 0.994,
                  x: direction > 0 ? -18 : 18,
                  y: direction > 0 ? -6 : 6,
                }}
                initial={{
                  filter: "blur(8px)",
                  opacity: 0,
                  scale: 1.006,
                  x: direction > 0 ? 20 : -20,
                  y: direction > 0 ? 6 : -6,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 1.05, ease: INTRO_CINEMATIC_EASE }
                }
              >
                <p className="typo-title-section mt-3 max-w-5xl text-[var(--color-text-primary)]">
                  {scenes[activeIdx]?.title}
                </p>
                <p className="mt-4 max-w-3xl font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                  {scenes[activeIdx]?.accent}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mx-auto flex w-full max-w-5xl items-center gap-2">
            {scenes.map((scene, idx) => (
              <motion.span
                key={`step-${scene.id}`}
                animate={{
                  opacity: idx === activeIdx ? 1 : 0.28,
                  scaleX: idx === activeIdx ? 1.06 : 1,
                }}
                className="h-[2px] flex-1 origin-center rounded-full bg-[var(--color-accent-cyan)]"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.8, ease: INTRO_CINEMATIC_EASE }
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
