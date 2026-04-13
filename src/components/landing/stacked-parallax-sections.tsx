"use client";

import type { MotionValue } from "framer-motion";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Blocks,
  Bot,
  Building2,
  Cable,
  ChartColumnBig,
  Crosshair,
  FileText,
  GitBranch,
  MessageSquareText,
  Orbit,
  ShoppingCart,
  UserRoundCog,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type NarrativeBeat = {
  title: string;
  description: string;
};

type NarrativeSection = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  beats: NarrativeBeat[];
};

type StackedParallaxSectionsProps = {
  sections: NarrativeSection[];
};

function BgLayer({
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
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.18, 0.36, 0.2],
  );
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
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-55"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 1200 700"
      >
        <motion.path
          animate={{ d: morphA[morphIndex % morphA.length] }}
          d={morphA[0]}
          fill="none"
          stroke={
            index % 2 === 0 ? "rgba(0,212,255,0.24)" : "rgba(124,58,237,0.24)"
          }
          strokeWidth="1.35"
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
        <motion.path
          animate={{ d: morphB[morphIndex % morphB.length] }}
          d={morphB[0]}
          fill="none"
          stroke={
            index % 2 === 0 ? "rgba(217,225,32,0.22)" : "rgba(0,212,255,0.22)"
          }
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
      label: "Decision y direccion",
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
      label: "Conexion operativa",
    },
    {
      icon: MessageSquareText,
      color: "#7C3AED",
      path: "M0 510 C 240 450, 430 560, 640 510 C 850 450, 980 570, 1200 500",
      label: "Interaccion y soporte",
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
    "Diagnostico y criterio antes de mover presupuesto.",
    "Arquitectura para crecer sin romper continuidad.",
    "Flujos conectados para operar con menos friccion.",
    "Conversaciones utiles para soporte y operacion.",
    "Capacidad tecnica que entra y suma desde el dia uno.",
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

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
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
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
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
  const mapped = useTransform(
    scrollYProgress,
    [0.06, 0.92],
    [0, Math.max(0, section.beats.length - 1)],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const fadeOut = useTransform(
    scrollYProgress,
    [0, 0.78, 0.94, 1],
    [1, 1, 0.68, 0],
  );
  const liftOut = useTransform(scrollYProgress, [0, 0.84, 1], [0, -24, -76]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.84, 1], [1, 1, 0.955]);

  useMotionValueEvent(mapped, "change", (v) => {
    const rounded = Math.round(v);
    const next = Math.max(0, Math.min(section.beats.length - 1, rounded));
    setActive((prev) => {
      if (prev === next) {
        return prev;
      }
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  return (
    <section
      ref={rootRef}
      id={section.id}
      className="relative h-[calc(100svh*8.7)]"
    >
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(162deg,rgba(17,17,19,0.99),rgba(24,24,27,0.92))]"
        style={{ opacity: fadeOut, scale: scaleOut, y: liftOut }}
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
    <div className="grid h-full gap-8 md:grid-cols-[1fr_1fr]">
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

      <div className="relative flex h-full items-center overflow-hidden">
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
  const mapped = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    [0, Math.max(0, section.beats.length - 1)],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.06]);
  const liftOut = useTransform(scrollYProgress, [0, 1], [0, -56]);

  useMotionValueEvent(mapped, "change", (v) => {
    const rounded = Math.round(v);
    const next = Math.max(0, Math.min(section.beats.length - 1, rounded));
    setActive((prev) => {
      if (prev === next) {
        return prev;
      }
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  return (
    <section
      ref={rootRef}
      className="relative h-[calc(100svh*7.3)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(23,23,31,0.94))]"
        style={{ opacity: fadeOut, y: liftOut }}
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

function VisionView({
  section,
  active,
  progress,
}: {
  section: NarrativeSection;
  active: number;
  progress: MotionValue<number>;
}) {
  const reducedMotion = useReducedMotion();
  const meta = [
    { icon: ShoppingCart, color: "#00D4FF", glow: "rgba(0,212,255,0.5)" },
    { icon: FileText, color: "#D9E120", glow: "rgba(217,225,32,0.5)" },
    { icon: Building2, color: "#FF9500", glow: "rgba(255,149,0,0.5)" },
    { icon: Cable, color: "#7C3AED", glow: "rgba(124,58,237,0.45)" },
    { icon: Bot, color: "#00D4FF", glow: "rgba(0,212,255,0.5)" },
  ] as const;
  const layerA = useTransform(progress, [0, 1], [70, -110]);
  const layerB = useTransform(progress, [0, 1], [-30, 70]);
  const orbitRadiusX = 220;
  const orbitRadiusY = 150;
  const openerOpacity = useTransform(progress, [0, 0.18, 0.32], [1, 1, 0]);
  const openerY = useTransform(progress, [0, 0.35], [0, -46]);
  const compOpacity = useTransform(progress, [0.16, 0.34], [0, 1]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex items-center"
        style={{ opacity: openerOpacity, y: openerY }}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
            {section.eyebrow}
          </p>
          <h2 className="hero-glow mt-4 max-w-5xl text-display text-[clamp(2.2rem,3.6vw+0.9rem,4.2rem)] font-bold leading-[1.04]">
            {section.title}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
            {section.lead}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid min-h-0 flex-1 gap-6 md:grid-cols-[1fr_320px] md:items-end"
        style={{ opacity: compOpacity }}
      >
        <div className="relative min-h-0 h-full overflow-visible rounded-[1.8rem] border border-white/12 bg-black/24">
          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            focusable="false"
            preserveAspectRatio="none"
            style={reducedMotion ? undefined : { y: layerA }}
            viewBox="0 0 1200 680"
          >
            <path
              d="M120 120 C 360 240, 590 80, 820 230 C 930 300, 1040 280, 1140 350"
              fill="none"
              stroke="rgba(0,212,255,0.28)"
              strokeWidth="1.35"
            />
            <path
              d="M120 560 C 290 500, 500 610, 710 500 C 900 400, 1030 520, 1140 460"
              fill="none"
              stroke="rgba(217,225,32,0.23)"
              strokeWidth="1.35"
            />
          </motion.svg>

          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            focusable="false"
            preserveAspectRatio="none"
            style={reducedMotion ? undefined : { y: layerB }}
            viewBox="0 0 1200 680"
          >
            {section.beats.map((beat, idx) => {
              const angle =
                (idx / section.beats.length) * Math.PI * 2 - Math.PI / 2;
              const x = 600 + Math.cos(angle) * orbitRadiusX;
              const y = 340 + Math.sin(angle) * orbitRadiusY;
              return (
                <line
                  key={beat.title}
                  stroke={
                    idx === active ? meta[idx].color : "rgba(255,255,255,0.2)"
                  }
                  strokeWidth={idx === active ? 1.8 : 1}
                  x1="600"
                  x2={x}
                  y1="340"
                  y2={y}
                />
              );
            })}
          </motion.svg>

          <motion.div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 backdrop-blur">
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                Lab Core
              </span>
            </div>
          </motion.div>

          {section.beats.map((beat, idx) => {
            const Icon = meta[idx].icon;
            const angle =
              (idx / section.beats.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * orbitRadiusX;
            const y = Math.sin(angle) * orbitRadiusY;
            const isActive = idx === active;
            return (
              <motion.div
                key={beat.title}
                animate={{
                  opacity: isActive ? 1 : 0.52,
                  scale: isActive ? 1.1 : 0.9,
                }}
                className="absolute left-1/2 top-1/2 -ml-16 -mt-10 w-32"
                initial={false}
                style={{ x, y }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="rounded-2xl border border-white/18 bg-black/50 px-3 py-3 text-center backdrop-blur"
                  style={{
                    boxShadow: isActive
                      ? `0 0 28px ${meta[idx].glow}`
                      : undefined,
                  }}
                >
                  <Icon
                    className="mx-auto h-4 w-4"
                    style={{ color: isActive ? meta[idx].color : "#c0c0c7" }}
                  />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                    M0{idx + 1}
                  </p>
                  <p
                    className="mt-1 text-xs font-semibold"
                    style={{ color: isActive ? meta[idx].color : "#f4f4f5" }}
                  >
                    {beat.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          key={section.beats[active]?.title}
          animate={{ opacity: 1, y: 0 }}
          className="pb-2 md:pb-6"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.24 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
            Muy pronto
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
            Incubando modulo {`0${active + 1}`}
          </p>
          <p className="mt-2 text-lg font-semibold md:text-xl">
            {section.beats[active]?.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            {section.beats[active]?.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function VisionPanel({
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
  const mapped = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    [0, Math.max(0, section.beats.length - 1)],
  );
  const [active, setActive] = useState(0);
  const fadeOut = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0.05]);

  useMotionValueEvent(mapped, "change", (v) => {
    const rounded = Math.round(v);
    setActive(Math.max(0, Math.min(section.beats.length - 1, rounded)));
  });

  return (
    <section
      ref={rootRef}
      className="relative h-[calc(100svh*7.6)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(21,20,27,0.94))]"
        style={{ opacity: fadeOut }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-12 md:py-14">
          <VisionView
            active={active}
            progress={scrollYProgress}
            section={section}
          />
        </div>
      </motion.article>
    </section>
  );
}

function DesignIntentionVisual({ progress }: { progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const gridY = useTransform(progress, [0, 1], [-24, 44]);
  const frameY = useTransform(progress, [0, 1], [18, -36]);
  const nodeY = useTransform(progress, [0, 1], [8, -18]);

  // Artboard geometry (SVG user units, viewBox 0 0 400 480)
  const ax = 56;
  const ay = 60;
  const aw = 288;
  const ah = 356;
  // Golden ratio focal point (φ = 0.618)
  const fx = ax + aw * 0.382; // ≈ 166
  const fy = ay + ah * 0.618; // ≈ 280

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 — Dot grid */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: gridY }}
        viewBox="0 0 400 480"
      >
        <defs>
          <pattern
            height="32"
            id="did-dot"
            patternUnits="userSpaceOnUse"
            width="32"
          >
            <circle cx="16" cy="16" fill="rgba(255,255,255,0.2)" r="1" />
          </pattern>
        </defs>
        <rect fill="url(#did-dot)" height="480" width="400" />
      </motion.svg>

      {/* Layer 2 — Proportion / alignment lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 400 480"
      >
        {/* Horizontal golden ratio line */}
        <line
          stroke="rgba(0,188,212,0.28)"
          strokeDasharray="8 12"
          strokeWidth="0.75"
          x1={ax}
          x2={ax + aw}
          y1={fy}
          y2={fy}
        />
        {/* Vertical golden ratio line */}
        <line
          stroke="rgba(0,188,212,0.28)"
          strokeDasharray="8 12"
          strokeWidth="0.75"
          x1={fx}
          x2={fx}
          y1={ay}
          y2={ay + ah}
        />
        {/* Secondary — rule of thirds horizontal */}
        <line
          stroke="rgba(255,255,255,0.08)"
          strokeDasharray="4 16"
          strokeWidth="0.6"
          x1={ax}
          x2={ax + aw}
          y1={ay + ah / 3}
          y2={ay + ah / 3}
        />
      </svg>

      {/* Layer 3 — Artboard frame + wireframe blocks */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: frameY }}
        viewBox="0 0 400 480"
      >
        {/* Artboard outer rect */}
        <rect
          fill="none"
          height={ah}
          stroke="rgba(0,188,212,0.45)"
          strokeWidth="0.85"
          width={aw}
          x={ax}
          y={ay}
        />
        {/* Corner L-marks */}
        <path
          d={`M${ax + 14},${ay} L${ax},${ay} L${ax},${ay + 14}`}
          fill="none"
          stroke="rgba(0,188,212,0.88)"
          strokeWidth="1.5"
        />
        <path
          d={`M${ax + aw - 14},${ay} L${ax + aw},${ay} L${ax + aw},${ay + 14}`}
          fill="none"
          stroke="rgba(0,188,212,0.88)"
          strokeWidth="1.5"
        />
        <path
          d={`M${ax + 14},${ay + ah} L${ax},${ay + ah} L${ax},${ay + ah - 14}`}
          fill="none"
          stroke="rgba(0,188,212,0.88)"
          strokeWidth="1.5"
        />
        <path
          d={`M${ax + aw - 14},${ay + ah} L${ax + aw},${ay + ah} L${ax + aw},${ay + ah - 14}`}
          fill="none"
          stroke="rgba(0,188,212,0.88)"
          strokeWidth="1.5"
        />
        {/* Nav bar */}
        <rect
          fill="rgba(0,188,212,0.07)"
          height="20"
          rx="1"
          stroke="rgba(0,188,212,0.3)"
          strokeWidth="0.65"
          width={aw - 16}
          x={ax + 8}
          y={ay + 8}
        />
        {/* Left sidebar */}
        <rect
          fill="rgba(255,255,255,0.03)"
          height="176"
          rx="1"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="0.6"
          width="80"
          x={ax + 8}
          y={ay + 36}
        />
        {/* Hero text block */}
        <rect
          fill="rgba(0,188,212,0.06)"
          height="60"
          rx="1"
          stroke="rgba(0,188,212,0.2)"
          strokeWidth="0.6"
          width="180"
          x={ax + 96}
          y={ay + 36}
        />
        {/* Sub-block A */}
        <rect
          fill="rgba(255,255,255,0.03)"
          height="36"
          rx="1"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="0.55"
          width="180"
          x={ax + 96}
          y={ay + 104}
        />
        {/* Sub-block B */}
        <rect
          fill="rgba(255,255,255,0.03)"
          height="36"
          rx="1"
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="0.55"
          width="96"
          x={ax + 96}
          y={ay + 148}
        />
        {/* CTA pill */}
        <rect
          fill="rgba(0,188,212,0.16)"
          height="18"
          rx="9"
          stroke="rgba(0,188,212,0.48)"
          strokeWidth="0.75"
          width="72"
          x={ax + 8}
          y={ay + 220}
        />
        {/* Footer band */}
        <rect
          fill="rgba(255,255,255,0.02)"
          height="44"
          rx="1"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="0.55"
          width={aw - 16}
          x={ax + 8}
          y={ay + ah - 52}
        />
        {/* Dimension tick marks — right edge */}
        <line
          stroke="rgba(0,188,212,0.28)"
          strokeWidth="0.6"
          x1={ax + aw + 10}
          x2={ax + aw + 10}
          y1={ay}
          y2={ay + ah}
        />
        <line
          stroke="rgba(0,188,212,0.28)"
          strokeWidth="0.6"
          x1={ax + aw + 6}
          x2={ax + aw + 14}
          y1={ay}
          y2={ay}
        />
        <line
          stroke="rgba(0,188,212,0.28)"
          strokeWidth="0.6"
          x1={ax + aw + 6}
          x2={ax + aw + 14}
          y1={ay + ah}
          y2={ay + ah}
        />
      </motion.svg>

      {/* Layer 4 — Focal point node (golden ratio intersection) */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: nodeY }}
        viewBox="0 0 400 480"
      >
        <defs>
          <radialGradient cx="50%" cy="50%" id="did-focal-glow" r="50%">
            <stop offset="0%" stopColor="rgba(0,188,212,0.55)" />
            <stop offset="100%" stopColor="rgba(0,188,212,0)" />
          </radialGradient>
        </defs>
        {/* Glow halo */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.35, 0.8, 0.35], r: [18, 26, 18] }
          }
          cx={fx}
          cy={fy}
          fill="url(#did-focal-glow)"
          r={18}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Crosshair arms */}
        <line
          stroke="rgba(0,188,212,0.55)"
          strokeWidth="0.75"
          x1={fx - 18}
          x2={fx - 7}
          y1={fy}
          y2={fy}
        />
        <line
          stroke="rgba(0,188,212,0.55)"
          strokeWidth="0.75"
          x1={fx + 7}
          x2={fx + 18}
          y1={fy}
          y2={fy}
        />
        <line
          stroke="rgba(0,188,212,0.55)"
          strokeWidth="0.75"
          x1={fx}
          x2={fx}
          y1={fy - 18}
          y2={fy - 7}
        />
        <line
          stroke="rgba(0,188,212,0.55)"
          strokeWidth="0.75"
          x1={fx}
          x2={fx}
          y1={fy + 7}
          y2={fy + 18}
        />
        {/* Inner ring */}
        <circle
          cx={fx}
          cy={fy}
          fill="none"
          r="6"
          stroke="rgba(0,188,212,0.7)"
          strokeWidth="0.75"
        />
        {/* Core dot */}
        <circle cx={fx} cy={fy} fill="rgba(0,188,212,1)" r="2.5" />
        {/* Outer pulse ring */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.55, 0.12, 0.55], r: [12, 22, 12] }
          }
          cx={fx}
          cy={fy}
          fill="none"
          r={12}
          stroke="rgba(0,188,212,0.5)"
          strokeWidth="0.7"
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* φ label at focal point */}
        <text
          fill="rgba(0,188,212,0.42)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="start"
          x={fx + 10}
          y={fy - 10}
        >
          φ
        </text>
      </motion.svg>

      {/* Semantic annotation */}
      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(0,188,212,0.38)]">
        proporción · alineación · intención
      </div>
    </div>
  );
}

function StudioView({
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
  const openerOpacity = useTransform(progress, [0, 0.18, 0.3], [1, 1, 0]);
  const openerY = useTransform(progress, [0, 0.34], [0, -40]);
  const compOpacity = useTransform(progress, [0.18, 0.36], [0, 1]);
  const studioLooks = [
    {
      accent: "#00D4FF",
      detail:
        "Leemos restricciones reales antes de decidir stack, alcance y secuencia de implementación.",
      helper: "Decisión técnica con contexto operativo.",
      overlay:
        "radial-gradient(ellipse 62% 58% at 24% 52%, rgba(0,212,255,0.34) 0%, transparent 70%), radial-gradient(ellipse 58% 60% at 78% 34%, rgba(59,31,255,0.3) 0%, transparent 70%), radial-gradient(ellipse 52% 42% at 80% 76%, rgba(255,0,144,0.24) 0%, transparent 62%), radial-gradient(ellipse 36% 40% at 96% 20%, rgba(255,149,0,0.2) 0%, transparent 66%), #050508",
    },
    {
      accent: "#00BCD4",
      detail:
        "Diseñamos estructura de interacción y arquitectura visual para que el sistema se entienda desde el primer uso.",
      helper: "Forma al servicio de la función.",
      overlay:
        "radial-gradient(ellipse 64% 56% at 20% 42%, rgba(0,188,212,0.34) 0%, transparent 72%), radial-gradient(ellipse 52% 60% at 84% 22%, rgba(255,149,0,0.26) 0%, transparent 66%), radial-gradient(ellipse 48% 48% at 74% 70%, rgba(132,204,22,0.22) 0%, transparent 62%), #050508",
    },
    {
      accent: "#84CC16",
      detail:
        "Construimos por módulos acoplables, con convenciones claras y control de cambios para sostener continuidad.",
      helper: "Estabilidad, mantenibilidad y consistencia.",
      overlay:
        "radial-gradient(ellipse 68% 60% at 30% 30%, rgba(132,204,22,0.34) 0%, transparent 72%), radial-gradient(ellipse 56% 54% at 12% 68%, rgba(255,149,0,0.3) 0%, transparent 66%), radial-gradient(ellipse 52% 50% at 86% 58%, rgba(132,204,22,0.24) 0%, transparent 66%), #050508",
    },
    {
      accent: "#FF0090",
      detail:
        "Refinamos con señales de uso y rendimiento para ajustar precisión sin perder velocidad de entrega.",
      helper: "Iteración con evidencia, no con suposición.",
      overlay:
        "radial-gradient(ellipse 66% 58% at 72% 36%, rgba(255,0,144,0.34) 0%, transparent 70%), radial-gradient(ellipse 58% 52% at 18% 30%, rgba(255,149,0,0.3) 0%, transparent 66%), radial-gradient(ellipse 54% 56% at 26% 78%, rgba(176,144,42,0.24) 0%, transparent 64%), #050508",
    },
  ] as const;
  const activeLook = studioLooks[active % studioLooks.length];

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex items-center"
        style={{ opacity: openerOpacity, y: openerY }}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
            {section.eyebrow}
          </p>
          <h2 className="hero-glow mt-5 max-w-4xl text-display text-[clamp(2.1rem,3.2vw+0.8rem,3.9rem)] font-bold leading-[1.06]">
            {section.title}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--color-text-secondary)]">
            {section.lead}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="relative min-h-0 flex-1 overflow-hidden bg-black"
        style={{ opacity: compOpacity }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`${section.beats[active]?.title}-bg`}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: activeLook.overlay }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={section.beats[active]?.title}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0"
            exit={{ opacity: 0, y: direction > 0 ? -90 : 90 }}
            initial={{ opacity: 0, y: direction > 0 ? 90 : -90 }}
            transition={{ duration: 0.27, ease: "easeOut" }}
          >
            {active === 1 ? (
              /* ── Diseño con intención — layout izquierda/derecha ── */
              <div className="grid h-full md:grid-cols-[1fr_1fr]">
                <div className="flex items-center px-6 md:px-10">
                  <div className="max-w-lg">
                    <div className="mb-4 flex items-center gap-2.5">
                      <Crosshair
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: activeLook.accent }}
                      />
                      <p
                        className="font-mono text-xs uppercase tracking-[0.22em]"
                        style={{ color: activeLook.accent }}
                      >
                        Estudio en accion · {`0${active + 1}`} /{" "}
                        {`0${section.beats.length}`}
                      </p>
                    </div>
                    <p className="text-[clamp(1.9rem,3.4vw+0.4rem,3.8rem)] font-semibold leading-[0.94] text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.42)]">
                      {section.beats[active]?.title}
                    </p>
                    <p className="mt-5 text-base leading-8 text-white/90 md:text-lg">
                      {activeLook.detail}
                    </p>
                    <p className="mt-3 text-sm font-medium text-white/80 md:text-base">
                      {activeLook.helper}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {section.beats.map((beat, idx) => (
                        <span
                          key={beat.title}
                          className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition md:text-xs ${
                            idx === active
                              ? "bg-white/14 text-white"
                              : "border-white/20 text-white/55"
                          }`}
                          style={
                            idx === active
                              ? {
                                  borderColor: activeLook.accent,
                                  boxShadow: `0 0 14px ${activeLook.accent}66`,
                                }
                              : undefined
                          }
                        >
                          {beat.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Visual hero — blueprint abstracto */}
                <div className="relative hidden overflow-hidden md:block">
                  <DesignIntentionVisual progress={progress} />
                </div>
              </div>
            ) : (
              /* ── Otros beats — layout full-bleed ── */
              <div className="absolute inset-0 flex items-center px-6 md:px-10">
                <div className="max-w-4xl">
                  <p
                    className="font-mono text-xs uppercase tracking-[0.22em]"
                    style={{ color: activeLook.accent }}
                  >
                    Estudio en accion · {`0${active + 1}`} /{" "}
                    {`0${section.beats.length}`}
                  </p>
                  <p className="mt-4 text-[clamp(2rem,3.8vw+0.5rem,4.2rem)] font-semibold leading-[0.92] text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.42)]">
                    {section.beats[active]?.title}
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 md:text-lg">
                    {activeLook.detail}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm font-medium text-white/80 md:text-base">
                    {activeLook.helper}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {section.beats.map((beat, idx) => (
                      <span
                        key={beat.title}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition md:text-xs ${
                          idx === active
                            ? "bg-white/14 text-white"
                            : "border-white/20 text-white/55"
                        }`}
                        style={
                          idx === active
                            ? {
                                borderColor: activeLook.accent,
                                boxShadow: `0 0 14px ${activeLook.accent}66`,
                              }
                            : undefined
                        }
                      >
                        {beat.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function StudioPanel({
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
  const mapped = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    [0, Math.max(0, section.beats.length - 1)],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const fadeOut = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1, 0.08]);

  useMotionValueEvent(mapped, "change", (v) => {
    const rounded = Math.round(v);
    const next = Math.max(0, Math.min(section.beats.length - 1, rounded));
    setActive((prev) => {
      if (prev === next) {
        return prev;
      }
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  return (
    <section
      ref={rootRef}
      className="relative h-[calc(100svh*6.1)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(158deg,rgba(13,13,15,0.99),rgba(23,22,30,0.94))]"
        style={{ opacity: fadeOut }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-[95vw] px-4 py-12 md:px-6 md:py-14">
          <StudioView
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

function TrustView({ section }: { section: NarrativeSection }) {
  return (
    <div className="h-full">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
        {section.eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-display text-[clamp(2.2rem,3vw+0.9rem,3.9rem)] font-bold leading-[1.05]">
        {section.title}
      </h2>
      <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
        {section.lead}
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3">
          {section.beats.map((beat, idx) => (
            <div
              key={beat.title}
              className="grid border-b border-white/12 py-3 md:grid-cols-[220px_1fr] md:gap-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                0{idx + 1} · {beat.title}
              </p>
              <p className="mt-1 text-sm leading-7 text-[var(--color-text-secondary)] md:mt-0">
                {beat.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
            Contacto directo
          </p>
          <a
            className="mt-3 inline-flex text-xl font-semibold text-[#ff4d4f] hover:text-[#ff7875]"
            href="tel:+573024012969"
          >
            +57 302 401 2969
          </a>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="inline-flex rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#07220f] transition hover:brightness-110"
              href="https://wa.me/573024012969?text=Hola%20BHRK%2C%20quiero%20hablar%20de%20mi%20proyecto."
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a
              className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
              href="mailto:hola@bhrkcodelabs.com?subject=Quiero%20que%20me%20contacten&body=Nombre:%0ATeléfono:%0ACorreo:%0AContexto%20del%20proyecto:"
            >
              Dejar número o correo
            </a>
          </div>
          <p className="mt-4 text-xs leading-6 text-[var(--color-text-muted)]">
            También puedes enviar tu correo o teléfono y te respondemos con
            contexto técnico y siguiente paso claro.
          </p>
        </div>
      </div>
    </div>
  );
}

function LedgerView({ section }: { section: NarrativeSection }) {
  return (
    <div className="h-full">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
        {section.eyebrow}
      </p>
      <h2 className="hero-glow mt-5 max-w-4xl text-display text-[clamp(2.2rem,3.2vw+0.9rem,3.9rem)] font-bold leading-[1.06]">
        {section.title}
      </h2>
      <p className="mt-5 max-w-3xl text-[var(--color-text-secondary)]">
        {section.lead}
      </p>

      <div className="mt-10">
        {section.beats.map((beat, idx) => (
          <div
            key={beat.title}
            className="grid border-b border-white/10 py-4 md:grid-cols-[260px_1fr] md:gap-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              0{idx + 1} · {beat.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)] md:mt-0">
              {beat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionPanel({
  section,
  index,
}: {
  section: NarrativeSection;
  index: number;
}) {
  if (section.id === "servicios") {
    return <ServicesPanel index={index} section={section} />;
  }
  if (section.id === "metodo") {
    return <MethodPanel index={index} section={section} />;
  }
  if (section.id === "vision-producto") {
    return <VisionPanel index={index} section={section} />;
  }
  if (section.id === "sobre-bhrk") {
    return <StudioPanel index={index} section={section} />;
  }

  const renderer =
    section.id === "info-verificada" ? (
      <TrustView section={section} />
    ) : (
      <LedgerView section={section} />
    );

  return (
    <section id={section.id} className="relative h-[185vh]">
      <article className="sticky top-16 h-[100svh] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(160deg,rgba(17,17,19,0.99),rgba(24,24,27,0.9))]">
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-14 md:py-18">
          {renderer}
        </div>
      </article>
    </section>
  );
}

export function StackedParallaxSections({
  sections,
}: StackedParallaxSectionsProps) {
  return (
    <div>
      {sections.map((section, index) => (
        <SectionPanel key={section.id} index={index} section={section} />
      ))}
    </div>
  );
}
