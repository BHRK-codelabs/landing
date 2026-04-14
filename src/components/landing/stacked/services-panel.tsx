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
import {
  Blocks,
  Bot,
  Cable,
  ChartColumnBig,
  GitBranch,
  MessageSquareText,
  Orbit,
  UserRoundCog,
} from "lucide-react";
import { useRef, useState } from "react";

import { BgLayer, stepTowardIndex } from "./shared";
import type { NarrativeSection } from "./types";

function ServicesView({
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

  const visualMeta = [
    {
      icon: Orbit,
      color: "#00D4FF",
      path: "M0 170 C 230 260, 430 110, 640 190 C 850 280, 980 150, 1200 230",
      label: "Decisión y dirección",
    },
    {
      icon: Blocks,
      color: "#D9E120",
      path: "M0 290 C 240 370, 420 230, 640 300 C 840 370, 980 260, 1200 330",
      label: "Arquitectura y sistema",
    },
    {
      icon: GitBranch,
      color: "#FF9500",
      path: "M0 410 C 230 330, 430 460, 640 390 C 850 330, 980 450, 1200 390",
      label: "Conexión operativa",
    },
    {
      icon: MessageSquareText,
      color: "#7C3AED",
      path: "M0 510 C 240 450, 430 560, 640 510 C 850 450, 980 570, 1200 500",
      label: "Interacción y soporte",
    },
    {
      icon: UserRoundCog,
      color: "#D9E120",
      path: "M0 230 C 240 320, 430 170, 640 250 C 850 320, 980 200, 1200 280",
      label: "Capacidad integrada",
    },
    {
      icon: ChartColumnBig,
      color: "#00D4FF",
      path: "M0 350 C 230 430, 430 280, 640 360 C 850 430, 980 300, 1200 370",
      label: "Experiencia y rendimiento",
    },
  ] as const;

  const narrative = [
    "Diagnóstico y criterio antes de mover presupuesto.",
    "Arquitectura para crecer sin romper continuidad.",
    "Flujos conectados para operar con menos fricción.",
    "Conversaciones útiles para soporte y operación.",
    "Capacidad técnica que entra y suma desde el día uno.",
    "Experiencias sobrias que se entienden y rinden.",
  ] as const;

  const activeMeta = visualMeta[active % visualMeta.length];
  const ActiveIcon = activeMeta.icon;
  const activeNarrative = narrative[active % narrative.length];
  const orbitY = useTransform(progress, [0, 1], [90, -120]);
  const meshY = useTransform(progress, [0, 1], [-40, 60]);
  const waveY = useTransform(progress, [0, 1], [120, -90]);

  return (
    <div className="relative h-full">
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        focusable="false"
        preserveAspectRatio="none"
        style={reducedMotion ? undefined : { y: meshY }}
        viewBox="0 0 1200 760"
      >
        <defs>
          <pattern
            height="56"
            id="service-grid"
            patternUnits="userSpaceOnUse"
            width="56"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect fill="url(#service-grid)" height="760" width="1200" />
      </motion.svg>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-screen -translate-x-1/2">
        <svg
          aria-hidden="true"
          className="h-full w-full opacity-45"
          focusable="false"
          preserveAspectRatio="none"
          viewBox="0 0 1200 760"
        >
          {visualMeta.map((item, idx) => (
            <motion.path
              key={item.path}
              animate={{
                opacity: idx === active ? 0.98 : 0.1,
                strokeWidth: idx === active ? 1.9 : 1.3,
              }}
              d={item.path}
              fill="none"
              initial={false}
              stroke={item.color}
              strokeLinecap="round"
              strokeWidth="1.45"
              transition={{ duration: 0.25 }}
            />
          ))}
          <motion.path
            animate={
              reducedMotion
                ? undefined
                : {
                    strokeDashoffset: [0, -2200],
                  }
            }
            d={activeMeta.path}
            fill="none"
            stroke={activeMeta.color}
            strokeDasharray="220 2000"
            strokeLinecap="round"
            strokeOpacity="0.86"
            strokeWidth="2.8"
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 3.4,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          />
        </svg>
      </div>

      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
        focusable="false"
        preserveAspectRatio="none"
        style={reducedMotion ? undefined : { y: orbitY }}
        viewBox="0 0 1200 760"
      >
        <motion.circle
          animate={{ opacity: active % 2 === 0 ? 0.92 : 0.32 }}
          cx="940"
          cy="160"
          fill="none"
          initial={false}
          r="132"
          stroke="rgba(0,212,255,0.35)"
          strokeWidth="1.2"
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          animate={{ opacity: active % 2 === 1 ? 0.82 : 0.22 }}
          cx="990"
          cy="530"
          fill="none"
          initial={false}
          r="106"
          stroke="rgba(124,58,237,0.34)"
          strokeWidth="1.2"
          transition={{ duration: 0.4 }}
        />
      </motion.svg>
      <div className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-screen -translate-x-1/2">
        <motion.svg
          aria-hidden="true"
          className="h-full w-full opacity-55"
          focusable="false"
          preserveAspectRatio="none"
          style={reducedMotion ? undefined : { y: waveY }}
          viewBox="0 0 1200 760"
        >
          <path
            d="M60 610 C 220 540, 420 700, 620 610 C 800 530, 980 680, 1140 600"
            fill="none"
            stroke="rgba(255,149,0,0.34)"
            strokeWidth="1.5"
          />
          <path
            d="M70 150 C 230 230, 430 90, 640 170 C 840 250, 990 120, 1130 180"
            fill="none"
            stroke="rgba(217,225,32,0.34)"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>

      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <motion.span
          key={`spark-${idx}`}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0, 0.95, 0.18, 0],
                  scale: [0.75, 1.3, 0.9, 0.7],
                  y: [10, -16, -30, -45],
                }
          }
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: activeMeta.color,
            left: `${12 + idx * 14}%`,
            top: `${18 + (idx % 2) * 52}%`,
            filter: `drop-shadow(0 0 10px ${activeMeta.color})`,
          }}
          transition={{
            delay: idx * 0.16,
            duration: 1.4 + idx * 0.14,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}

      <motion.div
        animate={
          reducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 5, 0] }
        }
        className="absolute left-0 top-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 md:h-16 md:w-16"
        style={{ color: activeMeta.color }}
        transition={
          reducedMotion ? undefined : { duration: 2.6, repeat: Infinity }
        }
      >
        <ActiveIcon className="h-5 w-5 md:h-7 md:w-7" />
      </motion.div>

      <p className="absolute right-0 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent-lime)] md:text-xs">
        Servicios en foco
      </p>

      <div className="relative h-full overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={section.beats[active]?.title}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            className="absolute inset-0 flex items-center"
            exit={{
              filter: "blur(6px)",
              opacity: 0,
              scale: 0.972,
              y: direction > 0 ? -180 : 180,
            }}
            initial={{
              filter: "blur(10px)",
              opacity: 0,
              scale: 1.02,
              y: direction > 0 ? 180 : -180,
            }}
            transition={{
              opacity: { duration: 0.24 },
              scale: { duration: 0.26, ease: "easeOut" },
              y: { damping: 22, stiffness: 180, type: "spring" },
            }}
          >
            <div className="w-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {`0${active + 1}`} / {`0${section.beats.length}`} ·{" "}
                {activeMeta.label}
              </p>
              <p className="mt-4 max-w-2xl font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 md:text-xs">
                {activeNarrative}
              </p>
              <p
                className="service-title mt-5 max-w-5xl text-[clamp(2.2rem,4.8vw+0.3rem,5.3rem)] font-extrabold leading-[0.9]"
                style={{ color: activeMeta.color }}
              >
                {section.beats[active]?.title}
              </p>
              <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] md:text-lg">
                {section.beats[active]?.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServicesPanel({
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
    [0, 0.08, 0.82, 0.94, 1],
    [0.15, 1, 1, 0.65, 0],
  );
  const sectionY = useTransform(
    syncedScroll,
    [0, 0.08, 0.84, 1],
    [36, 0, 0, -76],
  );
  const sectionScale = useTransform(
    syncedScroll,
    [0, 0.08, 0.84, 1],
    [0.985, 1, 1, 0.955],
  );

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
      id={section.id}
      className="relative h-[calc(100svh*8.7)]"
    >
      <motion.article
        className="sticky top-0 h-[100svh] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(162deg,rgba(17,17,19,0.99),rgba(24,24,27,0.92))] md:top-16 md:h-[calc(100svh-4rem)]"
        style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-12 md:py-14">
          <ServicesView
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


export { ServicesPanel };
