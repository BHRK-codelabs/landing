"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bot, Building2, Cable, FileText, ShoppingCart } from "lucide-react";
import { useRef, useState } from "react";

import { BgLayer, stepTowardIndex } from "./shared";
import type { NarrativeSection } from "./types";

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
  const openerOpacity = useTransform(progress, [0, 0.44, 0.62], [1, 1, 0]);
  const openerY = useTransform(progress, [0, 0.72], [0, -46]);
  const compOpacity = useTransform(progress, [0.58, 0.8], [0, 1]);

  return (
    <div className="relative flex h-full min-h-0 flex-col pt-24 md:pt-0">
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
        <div className="grid gap-3 md:hidden">
          {section.beats.map((beat, idx) => {
            const Icon = meta[idx].icon;
            const isActive = idx === active;
            return (
              <div
                key={`mobile-${beat.title}`}
                className="rounded-2xl border px-4 py-3"
                style={{
                  background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${meta[idx].color}99` : "rgba(255,255,255,0.16)",
                  boxShadow: isActive ? `0 0 20px ${meta[idx].glow}` : undefined,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className="h-4 w-4"
                    style={{ color: isActive ? meta[idx].color : "#c0c0c7" }}
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    MÃ³dulo 0{idx + 1}
                  </p>
                </div>
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: isActive ? meta[idx].color : "#f4f4f5" }}
                >
                  {beat.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative min-h-0 h-full overflow-visible rounded-[1.8rem] border border-white/12 bg-black/24 hidden md:block">
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
          transition={{ duration: 1.25, ease: "easeOut" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
            Muy pronto
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
            Incubando mÃ³dulo {`0${active + 1}`}
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

  useMotionValueEvent(mapped, "change", (value) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(value + Number.EPSILON)),
    );
    setActive((previous) => stepTowardIndex(previous, next));
  });

  return (
    <section
      ref={rootRef}
      className="relative h-[calc(100svh*8.7)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-0 h-[100svh] overflow-hidden bg-[linear-gradient(155deg,rgba(13,13,15,0.99),rgba(21,20,27,0.94))] md:top-16 md:h-[calc(100svh-4rem)]"
        style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-12 md:py-14">
          <VisionView
            active={active}
            progress={syncedScroll}
            section={section}
          />
        </div>
      </motion.article>
    </section>
  );
}

// --- Beat 0 â€” Profundidad antes de ejecutar -------------------------------
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
      {/* Layer 1 â€” Strata horizontal bands */}
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
        {/* Depth scale â€” right edge */}
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

      {/* Layer 2 â€” Probe vertical scanner */}
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

      {/* Layer 3 â€” Active layer glow + read annotation */}
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
        capas Â· contexto Â· profundidad
      </div>
    </div>
  );
}

// --- Beat 1 â€” DiseÃ±o con intenciÃ³n ----------------------------------------
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
  // Golden ratio focal point (f = 0.618)
  const fx = ax + aw * 0.382; // Ëœ 166
  const fy = ay + ah * 0.618; // Ëœ 280

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 â€” Dot grid */}
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

      {/* Layer 2 â€” Proportion / alignment lines */}
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
        {/* Secondary â€” rule of thirds horizontal */}
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

      {/* Layer 3 â€” Artboard frame + wireframe blocks */}
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
        {/* Dimension tick marks â€” right edge */}
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

      {/* Layer 4 â€” Focal point node (golden ratio intersection) */}
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
        {/* f label at focal point */}
        <text
          fill="rgba(0,188,212,0.42)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="start"
          x={fx + 10}
          y={fy - 10}
        >
          f
        </text>
      </motion.svg>

      {/* Semantic annotation */}
      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(0,188,212,0.38)]">
        proporciÃ³n Â· alineaciÃ³n Â· intenciÃ³n
      </div>
    </div>
  );
}

// --- Beat 2 â€” ConstrucciÃ³n con mÃ©todo ------------------------------------
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
    { x: 40, y: 240, w: 76, h: 24, label: "M01Â·A" },
    { x: 128, y: 240, w: 76, h: 24, label: "M01Â·B" },
    { x: 208, y: 240, w: 76, h: 24, label: "M02Â·A" },
    { x: 284, y: 240, w: 76, h: 24, label: "M02Â·B" },
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
      {/* Layer 1 â€” Root + mid-level blocks */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: treeY }}
        viewBox="0 0 400 480"
      >
        {/* Root ? mid connections */}
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

      {/* Layer 2 â€” Leaf nodes */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={reducedMotion ? undefined : { y: leavesY }}
        viewBox="0 0 400 480"
      >
        {/* Mid ? leaf connections */}
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

      {/* Layer 3 â€” Step sequence rail */}
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
        mÃ³dulos Â· arquitectura Â· mÃ©todo
      </div>
    </div>
  );
}

// --- Beat 3 â€” Refinamiento continuo --------------------------------------
function RefinementVisual({ progress }: { progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const outerY = useTransform(progress, [0, 1], [28, -44]);
  const innerY = useTransform(progress, [0, 1], [-18, 32]);
  const coreY = useTransform(progress, [0, 1], [8, -16]);

  const cx = 200;
  const cy = 224;

  // Concentric ellipses â€” outermost = roughest, innermost = most refined
  const ellipses = [
    { rx: 150, ry: 86, opacity: 0.14, dash: "14 18", label: "iter 01" },
    { rx: 104, ry: 60, opacity: 0.28, dash: "10 14", label: "iter 02" },
    { rx: 66, ry: 38, opacity: 0.5, dash: "8 10", label: "iter 03" },
    { rx: 36, ry: 21, opacity: 0.82, dash: undefined, label: "iter 04" },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Layer 1 â€” Outer ellipses (roughest iterations) */}
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

      {/* Layer 2 â€” Inner ellipses (refined iterations) */}
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

      {/* Layer 3 â€” Core focal point */}
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
        {/* ? label */}
        <text
          fill="rgba(255,0,144,0.44)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="start"
          x={cx + 10}
          y={cy - 10}
        >
          ?
        </text>
        {/* Signal ? precision annotation */}
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
          seÃ±al ? precisiÃ³n
        </text>
      </motion.svg>

      <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.22em] text-[rgba(255,0,144,0.35)]">
        iteraciÃ³n Â· evidencia Â· convergencia
      </div>
    </div>
  );
}

// --- Dispatcher â€” selecciona visual por beat index ------------------------
export {
  DepthVisual,
  DesignIntentionVisual,
  MethodVisual,
  RefinementVisual,
  VisionPanel,
};

