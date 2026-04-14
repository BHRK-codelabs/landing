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
  Building2,
  Cable,
  ChartColumnBig,
  Crosshair,
  FileText,
  GitBranch,
  MessageSquareText,
  Orbit,
  PhoneCall,
  RefreshCw,
  ScanLine,
  SendHorizontal,
  ShoppingCart,
  UserRoundCog,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { type ReactNode, useMemo, useRef, useState } from "react";
import {PitchBridgePanel} from "@/components/landing/stacked/pitch-bridge-panel";

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

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;
const CINEMATIC_ENTER = { duration: 0.88, ease: CINEMATIC_EASE } as const;
const CINEMATIC_DISSOLVE = { duration: 1.08, ease: CINEMATIC_EASE } as const;

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
              <p className="mt-4 max-w-2xl font-mono text-xs uppercase tracking-[0.22em] text-white/60 md:text-xs">
                {activeNarrative}
              </p>
              <p
                className="service-title typo-title-section mt-5 max-w-5xl"
                style={{ color: activeMeta.color }}
              >
                {section.beats[active]?.title}
              </p>
              <p className="mt-7 max-w-3xl text-base leading-[1.7] text-[var(--color-text-secondary)] md:text-lg">
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
    [0, section.beats.length],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.82, 0.94, 1],
    [0.15, 1, 1, 0.65, 0],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.84, 1],
    [36, 0, 0, -76],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.84, 1],
    [0.985, 1, 1, 0.955],
  );

  useMotionValueEvent(mapped, "change", (v) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(v + Number.EPSILON)),
    );
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
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden  border-[var(--color-border)] bg-[linear-gradient(162deg,rgba(17,17,19,0.99),rgba(24,24,27,0.92))]"
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
        <h2 className="hero-glow typo-title-section mt-4 max-w-xl">
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
            transition={CINEMATIC_ENTER}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
              Etapa {`0${active + 1}`}
            </p>
            <p className="typo-title-block mt-3 font-semibold">
              {section.beats[active]?.title}
            </p>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-[var(--color-text-secondary)]">
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
    [0, section.beats.length],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.84, 1],
    [0.15, 1, 1, 0.06],
  );
  const sectionY = useTransform(scrollYProgress, [0, 0.08, 1], [34, 0, -56]);

  useMotionValueEvent(mapped, "change", (v) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(v + Number.EPSILON)),
    );
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
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden  border-[var(--color-border)] bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(23,23,31,0.94))]"
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

function VisionView({
  section,
  progress,
}: {
  section: NarrativeSection;
  progress: MotionValue<number>;
}) {
  const reducedMotion = useReducedMotion();
  const links = [
    "/productos/pos",
    "/productos/facturacion-electronica",
    "/productos/crm",
    "/productos/erp",
    "/productos/chatbots-especializados",
  ] as const;
  const icons = [ShoppingCart, FileText, Building2, Cable, Bot] as const;
  const legends = [
    "Operación de ventas",
    "Cumplimiento fiscal",
    "Relación comercial",
    "Integración interna",
    "Atención especializada",
  ] as const;
  const tones = [
    "#00D4FF",
    "#D9E120",
    "#FF9500",
    "#7C3AED",
    "#00BCD4",
  ] as const;
  const revealMapped = useTransform(
    progress,
    [0.04, 0.78],
    [0, section.beats.length],
  );
  const [revealedCount, setRevealedCount] = useState(1);

  useMotionValueEvent(revealMapped, "change", (value) => {
    const nextCount = Math.max(
      1,
      Math.min(section.beats.length, Math.floor(value + Number.EPSILON) + 1),
    );
    setRevealedCount(nextCount);
  });

  return (
    <div className="relative md:h-full">
      <motion.div
        aria-hidden
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.58, 0.9, 0.62],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
        }
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 md:block"
        style={{
          background:
            "radial-gradient(circle at 18% 24%, rgba(0,212,255,0.2), transparent 46%), radial-gradient(circle at 82% 28%, rgba(124,58,237,0.2), transparent 48%), radial-gradient(circle at 34% 82%, rgba(255,107,107,0.14), transparent 50%), linear-gradient(110deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08), rgba(255,107,107,0.06))",
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 220% 220%",
        }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 8.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
        }
      />
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-start pt-4 pb-10 md:h-full md:justify-center md:pt-0 md:pb-0">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
          Exploración de producto ✨
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Image
            alt="BHRK"
            className="h-8 w-auto opacity-80"
            height={32}
            src="/brand/bhrk-logo-primary.png"
            width={132}
          />
          <span className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
            🧪 En incubación
          </span>
        </div>
        <h3 className="typo-title-block mt-3 max-w-3xl">
          Estos son los productos que estamos desarrollando y que pronto podrás conocer.
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Priorizamos líneas con impacto directo en ingresos, continuidad operativa
          y control del negocio. Cada frente avanza por hitos hasta llegar a beta.
        </p>

        <div className="mt-5 border-white/12 md:hidden">
          <AnimatePresence initial={false}>
            {section.beats.slice(0, revealedCount).map((beat, idx) => {
            const Icon = icons[idx];
            return (
              <motion.a
                key={`vision-mobile-${beat.title}`}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                className="relative block border-b border-white/10 py-3 last:border-b-0"
                exit={{ filter: "blur(3px)", opacity: 0, y: -10 }}
                href={links[idx]}
                initial={{ filter: "blur(6px)", opacity: 0, y: 12 }}
                transition={{ ...CINEMATIC_ENTER, duration: 0.74, delay: idx * 0.03 }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/70 to-transparent"
                  animate={reducedMotion ? undefined : { opacity: [0.22, 0.8, 0.22] }}
                  transition={
                    reducedMotion
                      ? undefined
                      : {
                          delay: idx * 0.12,
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Number.POSITIVE_INFINITY,
                        }
                  }
                />
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: tones[idx % tones.length] }} />
                  <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: tones[idx] }}>
                    Línea 0{idx + 1}
                  </p>
                  <span className="rounded-full border border-white/18 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
                    Muy pronto
                  </span>
                </div>
                <p
                  className="mt-1.5 text-base font-semibold text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${tones[idx % tones.length]}, #F4F4F5)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {beat.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {legends[idx]}
                </p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                  Saber más
                </p>
              </motion.a>
            );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-6 hidden  border-white/12 md:block">
          <AnimatePresence initial={false}>
            {section.beats.slice(0, revealedCount).map((beat, idx) => (
              <motion.a
                key={`vision-link-${beat.title}`}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                className="group relative grid gap-2 border-b border-white/10 py-3 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-3"
                exit={{ filter: "blur(3px)", opacity: 0, y: -10 }}
                href={links[idx]}
                initial={{ filter: "blur(6px)", opacity: 0, y: 14 }}
                transition={{ ...CINEMATIC_ENTER, duration: 0.76, delay: idx * 0.04 }}
              >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/60 to-transparent opacity-70"
                animate={reducedMotion ? undefined : { opacity: [0.25, 0.75, 0.25] }}
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        delay: idx * 0.15,
                        duration: 1.6,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }
                }
              />
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = icons[idx];
                  return (
                    <Icon
                      className="h-4 w-4 transition group-hover:text-[var(--color-accent-cyan)]"
                      style={{ color: tones[idx % tones.length] }}
                    />
                  );
                })()}
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">
                  Línea 0{idx + 1}
                </p>
                <span className="rounded-full border border-white/18 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
                  Muy pronto
                </span>
              </div>
              <p
                className="text-sm font-semibold text-transparent transition md:text-[15px]"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${tones[idx % tones.length]}, #F4F4F5)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                {beat.title}
              </p>
              <div className="flex items-center justify-start gap-2 md:justify-end">
                <span className="hidden rounded-full border border-white/16 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/58 md:inline-flex">
                  {legends[idx]}
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition group-hover:text-white/80">
                  Saber más
                </p>
                <motion.span
                  aria-hidden
                  animate={
                    reducedMotion
                      ? undefined
                      : { opacity: [0.38, 0.9, 0.38], x: [0, 3, 0] }
                  }
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cyan)]/90 shadow-[0_0_12px_rgba(0,212,255,0.8)]"
                  transition={
                    reducedMotion
                      ? undefined
                      : {
                          delay: idx * 0.16,
                          duration: 1.8,
                          ease: "easeInOut",
                          repeat: Number.POSITIVE_INFINITY,
                        }
                  }
                />
              </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
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
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.95, 1],
    [0, 1, 1, 0.9],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.95, 1],
    [14, 0, -4, -10],
  );
  const sectionOpacitySmooth = useSpring(sectionOpacity, {
    stiffness: 90,
    damping: 26,
    mass: 0.42,
  });
  const sectionYSmooth = useSpring(sectionY, {
    stiffness: 85,
    damping: 24,
    mass: 0.44,
  });

  return (
    <section
      ref={rootRef}
      className="relative z-10 min-h-[100svh] md:h-[calc(100svh*3.6)]"
    >
      <motion.article
        className="relative min-h-[100svh] overflow-visible  border-[var(--color-border)] bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(21,20,27,0.94))] md:sticky md:top-0 md:h-[100svh] md:overflow-hidden"
        style={{ opacity: sectionOpacitySmooth, y: sectionYSmooth }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-12 md:h-full md:py-16">
          <VisionView progress={scrollYProgress} section={section} />
        </div>
      </motion.article>
    </section>
  );
}

// ─── Beat 0 — Profundidad antes de ejecutar ───────────────────────────────
function DepthVisual({ progress }: { progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const strataY = useTransform(progress, [0, 1], [-20, 38]);
  const probeY = useTransform(progress, [0, 1], [14, -28]);
  const glowY = useTransform(progress, [0, 1], [6, -14]);

  const strata = [
    { y: 76, h: 40, label: "01" },
    { y: 128, h: 44, label: "02" },
    { y: 184, h: 52, label: "03" }, // active / deepest
    { y: 248, h: 44, label: "04" },
    { y: 304, h: 40, label: "05" },
  ] as const;
  const probeX = 172;
  const activeIdx = 2;
  const intersections = strata.map((s) => ({ x: probeX, y: s.y + s.h / 2 }));

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 — Strata horizontal bands */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: strataY }}
        viewBox="0 0 400 480"
      >
        {/* Artboard frame */}
        <rect
          fill="none"
          height={296}
          rx="2"
          stroke="rgba(0,212,255,0.28)"
          strokeWidth="0.7"
          width={296}
          x={52}
          y={60}
        />
        {/* Corner marks */}
        <path
          d="M66 60 L52 60 L52 74"
          fill="none"
          stroke="rgba(0,212,255,0.7)"
          strokeWidth="1.4"
        />
        <path
          d="M334 60 L348 60 L348 74"
          fill="none"
          stroke="rgba(0,212,255,0.7)"
          strokeWidth="1.4"
        />
        <path
          d="M66 356 L52 356 L52 342"
          fill="none"
          stroke="rgba(0,212,255,0.7)"
          strokeWidth="1.4"
        />
        <path
          d="M334 356 L348 356 L348 342"
          fill="none"
          stroke="rgba(0,212,255,0.7)"
          strokeWidth="1.4"
        />
        {strata.map((s, i) => (
          <g key={s.label}>
            <rect
              fill={`rgba(0,212,255,${i === activeIdx ? 0.14 : 0.05})`}
              height={s.h}
              rx="1"
              stroke={
                i === activeIdx
                  ? "rgba(0,212,255,0.48)"
                  : "rgba(0,212,255,0.14)"
              }
              strokeWidth={i === activeIdx ? 0.85 : 0.5}
              width={268}
              x={66}
              y={s.y}
            />
            {/* Layer index label */}
            <text
              fill={
                i === activeIdx
                  ? "rgba(0,212,255,0.62)"
                  : "rgba(255,255,255,0.2)"
              }
              fontFamily="monospace"
              fontSize="7"
              textAnchor="end"
              x={59}
              y={s.y + s.h / 2 + 2.5}
            >
              {s.label}
            </text>
          </g>
        ))}
        {/* Depth scale — right edge */}
        <line
          stroke="rgba(0,212,255,0.22)"
          strokeWidth="0.6"
          x1={348}
          x2={348}
          y1={76}
          y2={344}
        />
        {strata.map((s) => (
          <line
            key={`tick-${s.y}`}
            stroke="rgba(0,212,255,0.22)"
            strokeWidth="0.6"
            x1={344}
            x2={352}
            y1={s.y + s.h / 2}
            y2={s.y + s.h / 2}
          />
        ))}
      </motion.svg>

      {/* Layer 2 — Probe vertical scanner */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: probeY }}
        viewBox="0 0 400 480"
      >
        {/* Static probe axis */}
        <line
          stroke="rgba(0,212,255,0.38)"
          strokeWidth="0.85"
          x1={probeX}
          x2={probeX}
          y1={60}
          y2={360}
        />
        {/* Animated scan sweep */}
        <motion.line
          animate={
            reducedMotion ? undefined : { strokeDashoffset: [0, -640] }
          }
          stroke="rgba(0,212,255,0.88)"
          strokeDasharray="36 604"
          strokeLinecap="round"
          strokeWidth="1.6"
          transition={{
            duration: 3.4,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          x1={probeX}
          x2={probeX}
          y1={60}
          y2={360}
        />
        {/* Intersection nodes */}
        {intersections.map((pt, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={pt.x}
              cy={pt.y}
              fill={
                i === activeIdx
                  ? "rgba(0,212,255,1)"
                  : "rgba(0,212,255,0.38)"
              }
              r={i === activeIdx ? 3.5 : 2}
            />
            {i !== activeIdx && (
              <circle
                cx={pt.x}
                cy={pt.y}
                fill="none"
                r="5.5"
                stroke="rgba(0,212,255,0.22)"
                strokeWidth="0.6"
              />
            )}
          </g>
        ))}
      </motion.svg>

      {/* Layer 3 — Active layer glow + read annotation */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: glowY }}
        viewBox="0 0 400 480"
      >
        <defs>
          <radialGradient cx="50%" cy="50%" id="depth-node-glow" r="50%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.52)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </radialGradient>
        </defs>
        {/* Glow halo at active intersection */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.4, 0.85, 0.4], r: [16, 25, 16] }
          }
          cx={probeX}
          cy={intersections[activeIdx].y}
          fill="url(#depth-node-glow)"
          r={16}
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Pulse outer ring */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.55, 0.1, 0.55], r: [10, 20, 10] }
          }
          cx={probeX}
          cy={intersections[activeIdx].y}
          fill="none"
          r={10}
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="0.75"
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Horizontal read line */}
        <line
          stroke="rgba(0,212,255,0.32)"
          strokeDasharray="6 8"
          strokeWidth="0.75"
          x1={probeX + 6}
          x2={326}
          y1={intersections[activeIdx].y}
          y2={intersections[activeIdx].y}
        />
        <text
          fill="rgba(0,212,255,0.48)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="start"
          x={probeX + 10}
          y={intersections[activeIdx].y - 7}
        >
          lectura activa
        </text>
      </motion.svg>

      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(0,212,255,0.35)]">
        capas · contexto · profundidad
      </div>
    </div>
  );
}

// ─── Beat 1 — Diseño con intención ────────────────────────────────────────
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

// ─── Beat 2 — Construcción con método ────────────────────────────────────
function MethodVisual({ progress }: { progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const treeY = useTransform(progress, [0, 1], [20, -40]);
  const leavesY = useTransform(progress, [0, 1], [-16, 32]);
  const stepsY2 = useTransform(progress, [0, 1], [10, -20]);

  // Component tree geometry
  const root = { x: 160, y: 64, w: 80, h: 28 };
  const mid = [
    { x: 72, y: 152, w: 96, h: 28, label: "M01" },
    { x: 232, y: 152, w: 96, h: 28, label: "M02" },
  ];
  const leaves = [
    { x: 40, y: 240, w: 76, h: 24, label: "M01·A" },
    { x: 128, y: 240, w: 76, h: 24, label: "M01·B" },
    { x: 208, y: 240, w: 76, h: 24, label: "M02·A" },
    { x: 284, y: 240, w: 76, h: 24, label: "M02·B" },
  ];

  const rootCx = root.x + root.w / 2; // 200
  const rootCy = root.y + root.h; // 92
  const midBottoms = mid.map((m) => ({ x: m.x + m.w / 2, y: m.y + m.h }));
  const leafTops = leaves.map((l) => ({ x: l.x + l.w / 2, y: l.y }));

  const treeConnections = [
    { from: midBottoms[0], to: leafTops[0] },
    { from: midBottoms[0], to: leafTops[1] },
    { from: midBottoms[1], to: leafTops[2] },
    { from: midBottoms[1], to: leafTops[3] },
  ];

  const steps = [
    { x: 80, label: "01" },
    { x: 160, label: "02" },
    { x: 240, label: "03" },
    { x: 320, label: "04" },
  ];
  const stepsLineY = 330;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 — Root + mid-level blocks */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: treeY }}
        viewBox="0 0 400 480"
      >
        {/* Root → mid connections */}
        {mid.map((m, i) => {
          const mcx = m.x + m.w / 2;
          return (
            <path
              key={`root-mid-${i}`}
              d={`M${rootCx},${rootCy} C${rootCx},${rootCy + 26} ${mcx},${m.y - 26} ${mcx},${m.y}`}
              fill="none"
              stroke="rgba(132,204,22,0.42)"
              strokeWidth="0.85"
            />
          );
        })}
        {/* Root block */}
        <rect
          fill="rgba(132,204,22,0.1)"
          height={root.h}
          rx="2"
          stroke="rgba(132,204,22,0.68)"
          strokeWidth="1"
          width={root.w}
          x={root.x}
          y={root.y}
        />
        <text
          fill="rgba(132,204,22,0.72)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x={root.x + root.w / 2}
          y={root.y + root.h / 2 + 2.5}
        >
          CORE
        </text>
        {/* Root glow */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.2, 0.55, 0.2], r: [18, 26, 18] }
          }
          cx={rootCx}
          cy={root.y + root.h / 2}
          fill="rgba(132,204,22,0.22)"
          r={18}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Mid-level blocks */}
        {mid.map((m) => (
          <g key={m.label}>
            <rect
              fill="rgba(132,204,22,0.07)"
              height={m.h}
              rx="2"
              stroke="rgba(132,204,22,0.44)"
              strokeWidth="0.75"
              width={m.w}
              x={m.x}
              y={m.y}
            />
            <text
              fill="rgba(132,204,22,0.55)"
              fontFamily="monospace"
              fontSize="7"
              textAnchor="middle"
              x={m.x + m.w / 2}
              y={m.y + m.h / 2 + 2.5}
            >
              {m.label}
            </text>
          </g>
        ))}
      </motion.svg>

      {/* Layer 2 — Leaf nodes */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: leavesY }}
        viewBox="0 0 400 480"
      >
        {/* Mid → leaf connections */}
        {treeConnections.map((conn, i) => (
          <path
            key={`leaf-conn-${i}`}
            d={`M${conn.from.x},${conn.from.y} C${conn.from.x},${conn.from.y + 24} ${conn.to.x},${conn.to.y - 24} ${conn.to.x},${conn.to.y}`}
            fill="none"
            stroke="rgba(132,204,22,0.26)"
            strokeWidth="0.65"
          />
        ))}
        {/* Leaf blocks */}
        {leaves.map((l) => (
          <g key={l.label}>
            <rect
              fill="rgba(132,204,22,0.04)"
              height={l.h}
              rx="2"
              stroke="rgba(132,204,22,0.28)"
              strokeWidth="0.6"
              width={l.w}
              x={l.x}
              y={l.y}
            />
            <text
              fill="rgba(132,204,22,0.38)"
              fontFamily="monospace"
              fontSize="6"
              textAnchor="middle"
              x={l.x + l.w / 2}
              y={l.y + l.h / 2 + 2}
            >
              {l.label}
            </text>
          </g>
        ))}
      </motion.svg>

      {/* Layer 3 — Step sequence rail */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: stepsY2 }}
        viewBox="0 0 400 480"
      >
        {/* Timeline rail */}
        <line
          stroke="rgba(132,204,22,0.28)"
          strokeWidth="0.75"
          x1={56}
          x2={344}
          y1={stepsLineY}
          y2={stepsLineY}
        />
        {steps.map((s, i) => (
          <g key={s.label}>
            <motion.circle
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: [0.4, 0.92, 0.4] }
              }
              cx={s.x}
              cy={stepsLineY}
              fill={i < 3 ? "rgba(132,204,22,0.82)" : "rgba(132,204,22,0.28)"}
              r="4"
              transition={{
                delay: i * 0.28,
                duration: 1.8,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <text
              fill="rgba(132,204,22,0.42)"
              fontFamily="monospace"
              fontSize="7"
              textAnchor="middle"
              x={s.x}
              y={stepsLineY + 14}
            >
              {s.label}
            </text>
          </g>
        ))}
      </motion.svg>

      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(132,204,22,0.38)]">
        módulos · arquitectura · método
      </div>
    </div>
  );
}

// ─── Beat 3 — Refinamiento continuo ──────────────────────────────────────
function RefinementVisual({ progress }: { progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const outerY = useTransform(progress, [0, 1], [28, -44]);
  const innerY = useTransform(progress, [0, 1], [-18, 32]);
  const coreY = useTransform(progress, [0, 1], [8, -16]);

  const cx = 200;
  const cy = 224;

  // Concentric ellipses — outermost = roughest, innermost = most refined
  const ellipses = [
    { rx: 150, ry: 86, opacity: 0.14, dash: "14 18", label: "iter 01" },
    { rx: 104, ry: 60, opacity: 0.28, dash: "10 14", label: "iter 02" },
    { rx: 66, ry: 38, opacity: 0.5, dash: "8 10", label: "iter 03" },
    { rx: 36, ry: 21, opacity: 0.82, dash: undefined, label: "iter 04" },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 — Outer ellipses (roughest iterations) */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: outerY }}
        viewBox="0 0 400 480"
      >
        {ellipses.slice(0, 2).map((e, i) => (
          <g key={`outer-${i}`}>
            <ellipse
              cx={cx}
              cy={cy}
              fill="none"
              rx={e.rx}
              ry={e.ry}
              stroke={`rgba(255,0,144,${e.opacity})`}
              strokeDasharray={e.dash}
              strokeWidth="0.9"
            />
            {/* Direction arrow at rightmost point */}
            <path
              d={`M${cx + e.rx - 9},${cy - 5} L${cx + e.rx},${cy} L${cx + e.rx - 9},${cy + 5}`}
              fill="none"
              stroke={`rgba(255,0,144,${e.opacity * 1.5})`}
              strokeWidth="0.75"
            />
            {/* Iteration label above ellipse */}
            <text
              fill={`rgba(255,0,144,${e.opacity * 1.2})`}
              fontFamily="monospace"
              fontSize="7"
              textAnchor="middle"
              x={cx}
              y={cy - e.ry - 6}
            >
              {e.label}
            </text>
          </g>
        ))}
      </motion.svg>

      {/* Layer 2 — Inner ellipses (refined iterations) */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: innerY }}
        viewBox="0 0 400 480"
      >
        {ellipses.slice(2).map((e, i) => (
          <g key={`inner-${i}`}>
            <ellipse
              cx={cx}
              cy={cy}
              fill="none"
              rx={e.rx}
              ry={e.ry}
              stroke={`rgba(255,0,144,${e.opacity})`}
              strokeDasharray={e.dash}
              strokeWidth={e.dash === undefined ? "1.2" : "0.9"}
            />
            <path
              d={`M${cx + e.rx - 8},${cy - 4} L${cx + e.rx},${cy} L${cx + e.rx - 8},${cy + 4}`}
              fill="none"
              stroke={`rgba(255,0,144,${e.opacity})`}
              strokeWidth="0.85"
            />
            <text
              fill={`rgba(255,0,144,${e.opacity * 0.85})`}
              fontFamily="monospace"
              fontSize="7"
              textAnchor="middle"
              x={cx}
              y={cy - e.ry - 6}
            >
              {e.label}
            </text>
          </g>
        ))}
        {/* Horizontal convergence guides */}
        <line
          stroke="rgba(255,0,144,0.18)"
          strokeDasharray="5 9"
          strokeWidth="0.6"
          x1={cx - 150}
          x2={cx - 36}
          y1={cy}
          y2={cy}
        />
        <line
          stroke="rgba(255,0,144,0.18)"
          strokeDasharray="5 9"
          strokeWidth="0.6"
          x1={cx + 36}
          x2={cx + 150}
          y1={cy}
          y2={cy}
        />
      </motion.svg>

      {/* Layer 3 — Core focal point */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: coreY }}
        viewBox="0 0 400 480"
      >
        <defs>
          <radialGradient cx="50%" cy="50%" id="refine-core-glow" r="50%">
            <stop offset="0%" stopColor="rgba(255,0,144,0.58)" />
            <stop offset="100%" stopColor="rgba(255,0,144,0)" />
          </radialGradient>
        </defs>
        {/* Glow halo */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.4, 0.85, 0.4], r: [14, 22, 14] }
          }
          cx={cx}
          cy={cy}
          fill="url(#refine-core-glow)"
          r={14}
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Inner ring */}
        <circle
          cx={cx}
          cy={cy}
          fill="none"
          r="7"
          stroke="rgba(255,0,144,0.72)"
          strokeWidth="0.75"
        />
        {/* Core dot */}
        <circle cx={cx} cy={cy} fill="rgba(255,0,144,1)" r="3" />
        {/* Pulse ring */}
        <motion.circle
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.6, 0.1, 0.6], r: [12, 26, 12] }
          }
          cx={cx}
          cy={cy}
          fill="none"
          r={12}
          stroke="rgba(255,0,144,0.48)"
          strokeWidth="0.7"
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {/* Δ label */}
        <text
          fill="rgba(255,0,144,0.44)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="start"
          x={cx + 10}
          y={cy - 10}
        >
          Δ
        </text>
        {/* Signal → precision annotation */}
        <path
          d="M72 388 C 102 376, 136 372, 168 370 C 196 368, 216 366, 240 364"
          fill="none"
          stroke="rgba(255,0,144,0.28)"
          strokeLinecap="round"
          strokeWidth="1"
        />
        <path
          d="M236 360 L241 364 L236 368"
          fill="none"
          stroke="rgba(255,0,144,0.28)"
          strokeWidth="1"
        />
        <text
          fill="rgba(255,0,144,0.32)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="start"
          x="72"
          y="402"
        >
          señal → precisión
        </text>
      </motion.svg>

      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(255,0,144,0.35)]">
        iteración · evidencia · convergencia
      </div>
    </div>
  );
}

// ─── Dispatcher — selecciona visual por beat index ────────────────────────
function StudioSideVisual({
  active,
  progress,
}: {
  active: number;
  progress: MotionValue<number>;
}) {
  if (active === 0) return <DepthVisual progress={progress} />;
  if (active === 1) return <DesignIntentionVisual progress={progress} />;
  if (active === 2) return <MethodVisual progress={progress} />;
  return <RefinementVisual progress={progress} />;
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
  const beatIcons = [ScanLine, Crosshair, Blocks, RefreshCw] as const;
  const BeatIcon = beatIcons[Math.min(active, beatIcons.length - 1)];

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="relative z-20 min-h-0 flex-1 overflow-hidden bg-black">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`${section.beats[active]?.title}-bg`}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={CINEMATIC_DISSOLVE}
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
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 0.985, y: direction > 0 ? -120 : 120 }}
            initial={{ opacity: 0, scale: 0.985, y: direction > 0 ? 120 : -120 }}
            transition={CINEMATIC_ENTER}
          >
            {/* Layout split izquierda / derecha — todos los beats */}
            <div className="grid h-full md:grid-cols-[1fr_1fr]">
              <div className="flex items-center px-6 md:px-10">
                <div className="max-w-lg">
                  <div className="mb-4 flex items-center gap-2.5">
                    <BeatIcon
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
                  <p className="typo-title-section text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.42)]">
                    {section.beats[active]?.title}
                  </p>
                  <p className="mt-5 text-base leading-[1.7] text-white/90 md:text-lg">
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
              {/* Visual hero semántico por beat */}
              <div className="relative hidden overflow-hidden md:block">
                <StudioSideVisual active={active} progress={progress} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
    [0.08, 0.94],
    [0, section.beats.length],
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.95, 1],
    [0.24, 1, 1, 0.82],
  );
  const sectionY = useTransform(scrollYProgress, [0, 0.08, 1], [30, 0, -18]);
  const sectionOpacitySmooth = useSpring(sectionOpacity, {
    stiffness: 88,
    damping: 26,
    mass: 0.46,
  });
  const sectionYSmooth = useSpring(sectionY, {
    stiffness: 84,
    damping: 24,
    mass: 0.48,
  });

  useMotionValueEvent(mapped, "change", (v) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(v + Number.EPSILON)),
    );
    setActive((prev) => {
      if (prev === next) {
        return prev;
      }
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  return (
    <section ref={rootRef} className="relative h-[calc(100svh*12.4)]">
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden  border-[var(--color-border)] bg-[linear-gradient(158deg,rgba(13,13,15,0.99),rgba(23,22,30,0.94))]"
        style={{ opacity: sectionOpacitySmooth, y: sectionYSmooth }}
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
  const [mode, setMode] = useState<"whatsapp" | "contacto">("whatsapp");
  const [contactPreference, setContactPreference] = useState<
    "llamada" | "mensaje"
  >("llamada");
  const [inputValue, setInputValue] = useState("");
  const [website, setWebsite] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const contactPayload = useMemo(() => {
    const trimmedValue = inputValue.trim();

    if (mode === "whatsapp") {
      return [
        "Hola BHRK, vengo desde su sitio web.",
        "",
        `Mensaje: ${trimmedValue || "Quiero hablar de mi proyecto."}`,
      ].join("\n");
    }

    const preferenceText =
      contactPreference === "llamada"
        ? "Quiero que me llamen."
        : "Quiero que me escriban.";

    return [
      "Hola BHRK, vengo desde su sitio web.",
      "",
      `Solicitud: ${preferenceText}`,
      `Contacto: ${trimmedValue || "No indicado"}`,
    ].join("\n");
  }, [contactPreference, inputValue, mode]);

  const whatsappHref = useMemo(
    () => `https://wa.me/573024012969?text=${encodeURIComponent(contactPayload)}`,
    [contactPayload],
  );

  const validateAction = () => {
    if (website.trim().length > 0) {
      setFeedback("No se pudo validar el envío. Intenta nuevamente.");
      return false;
    }

    const trimmedValue = inputValue.trim();
    if (mode === "whatsapp" && trimmedValue.length < 4) {
      setFeedback("Escribe un mensaje breve para enviarte a WhatsApp.");
      return false;
    }

    if (mode === "contacto" && trimmedValue.length < 6) {
      setFeedback("Déjanos un número o contacto válido para responderte.");
      return false;
    }

    setFeedback(null);
    return true;
  };

  const handleSend = () => {
    if (!validateAction()) {
      return;
    }
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-full">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
        {section.eyebrow}
      </p>
      <h2 className="typo-title-section mt-4 max-w-4xl">
        {section.title}
      </h2>
      <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
        {section.lead}
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-3">
          {section.beats.map((beat, idx) => (
            <div
              key={beat.title}
              className="grid rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 md:grid-cols-[220px_1fr] md:gap-6"
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

        <div className="rounded-2xl border border-white/16 bg-[linear-gradient(162deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 md:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
            Contacto directo
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            En LATAM resolvemos rápido por WhatsApp. Elige cómo quieres avanzar.
          </p>
          <div className="mt-5 grid gap-2">
            <button
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                mode === "whatsapp"
                  ? "bg-[#25D366] text-[#07220f]"
                  : "border border-white/20 text-[var(--color-text-primary)] hover:border-white/35"
              }`}
              onClick={() => {
                setMode("whatsapp");
                setFeedback(null);
                setInputValue("");
              }}
              type="button"
            >
              <MessageCircle className="h-4 w-4" />
              Escríbeme a WhatsApp
            </button>
            <button
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                mode === "contacto"
                  ? "bg-[var(--color-accent-cyan)] text-[var(--color-bg-base)]"
                  : "border border-white/20 text-[var(--color-text-primary)] hover:border-white/35"
              }`}
              onClick={() => {
                setMode("contacto");
                setFeedback(null);
                setInputValue("");
              }}
              type="button"
            >
              <PhoneCall className="h-4 w-4" />
              ¿Quieres que te llamemos o te escribamos?
            </button>
          </div>

          {mode === "contacto" ? (
            <div className="mt-4 flex gap-2">
              <button
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  contactPreference === "llamada"
                    ? "bg-white/16 text-white"
                    : "border border-white/20 text-white/75 hover:border-white/35"
                }`}
                onClick={() => setContactPreference("llamada")}
                type="button"
              >
                Llámenme
              </button>
              <button
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  contactPreference === "mensaje"
                    ? "bg-white/16 text-white"
                    : "border border-white/20 text-white/75 hover:border-white/35"
                }`}
                onClick={() => setContactPreference("mensaje")}
                type="button"
              >
                Escríbanme
              </button>
            </div>
          ) : null}

          <div className="mt-4">
            <div className="flex overflow-hidden rounded-xl border border-white/24 bg-white/[0.08]">
              <input
                className="w-full bg-transparent px-3 py-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                inputMode={mode === "whatsapp" ? "text" : "text"}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={
                  mode === "whatsapp"
                    ? "Escribe tu mensaje y te llevamos a WhatsApp."
                    : contactPreference === "llamada"
                      ? "Déjanos tu número para llamarte."
                      : "Déjanos tu WhatsApp o correo para escribirte."
                }
                value={inputValue}
              />
              <button
                className="inline-flex items-center gap-1.5 border-l border-white/18 bg-[var(--color-accent-cyan)] px-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-bg-base)] transition hover:brightness-110"
                onClick={handleSend}
                type="button"
              >
                <SendHorizontal className="h-3.5 w-3.5" />
                Enviar
              </button>
            </div>
            <input
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              type="text"
              value={website}
            />
          </div>

          <p className="mt-4 text-xs leading-6 text-[var(--color-text-muted)]">
            También puedes llamar directo al{" "}
            <a className="underline decoration-white/30 hover:text-white" href="tel:+573024012969">
              +57 302 401 2969
            </a>
            .
          </p>
          {feedback ? (
            <p className="mt-2 text-xs leading-6 text-[#ff8f8f]">{feedback}</p>
          ) : null}
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
      <h2 className="hero-glow typo-title-section mt-5 max-w-4xl">
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

function GenericNarrativePanel({
  section,
  index,
  renderer,
}: {
  section: NarrativeSection;
  index: number;
  renderer: ReactNode;
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const isTrustPanel = section.id === "info-verificada";
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const sectionOpacity = useTransform(
    scrollYProgress,
    isTrustPanel ? [0, 0.08, 0.96, 1] : [0, 0.08, 0.84, 1],
    isTrustPanel ? [0.2, 1, 1, 0.88] : [0.15, 1, 1, 0.08],
  );
  const sectionY = useTransform(
    scrollYProgress,
    isTrustPanel ? [0, 0.08, 0.96, 1] : [0, 0.08, 1],
    isTrustPanel ? [16, 0, -6, -14] : [24, 0, -36],
  );

  return (
    <section
      ref={rootRef}
      id={section.id}
      className={isTrustPanel ? "relative py-14 md:py-18" : "relative h-[185vh]"}
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <motion.article
        className={
          isTrustPanel
            ? "relative overflow-visible  border-[var(--color-border)] bg-[linear-gradient(160deg,rgba(18,18,21,0.98),rgba(33,33,39,0.92))]"
            : "sticky top-16 h-[100svh] overflow-hidden  border-[var(--color-border)] bg-[linear-gradient(160deg,rgba(17,17,19,0.99),rgba(24,24,27,0.9))]"
        }
        style={isTrustPanel ? undefined : { opacity: sectionOpacity, y: sectionY }}
      >
        {isTrustPanel ? null : <BgLayer index={index} />}
        <div
          className={
            isTrustPanel
              ? "relative z-10 mx-auto w-full max-w-6xl px-5 py-10 md:py-12"
              : "relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-14 md:py-18"
          }
        >
          {renderer}
        </div>
      </motion.article>
    </section>
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
    return (
      <>
        <PitchBridgePanel index={index} section={section} tone="vision" />
        <VisionPanel index={index} section={section} />
      </>
    );
  }
  if (section.id === "sobre-bhrk") {
    return (
      <>
        <PitchBridgePanel index={index} section={section} tone="studio" />
        <StudioPanel index={index} section={section} />
      </>
    );
  }

  const renderer =
    section.id === "info-verificada" ? (
      <TrustView section={section} />
    ) : (
      <LedgerView section={section} />
    );

  return (
    <GenericNarrativePanel index={index} renderer={renderer} section={section} />
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
