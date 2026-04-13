"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTime,
  useTransform,
} from "framer-motion";
import { useMemo } from "react";

type WaveConfig = {
  ampA: number;
  ampB: number;
  baseY: number;
  freqA: number;
  freqB: number;
  id: string;
  phase: number;
  driftAmp: number;
  driftFreq: number;
  driftSpeed: number;
  speedA: number;
  speedB: number;
  strokeMainOpacity: number;
  stroke: string;
  strokeMainWidth: number;
  strokeSoftOpacity: number;
  strokeSoft: string;
  strokeSoftWidth: number;
};

type ParticleConfig = {
  color: string;
  glow: string;
  id: string;
  offset: number;
  speed: number;
  waveIndex: number;
};

const WAVES: WaveConfig[] = [
  {
    ampA: 18,
    ampB: 10,
    baseY: 170,
    freqA: 0.014,
    freqB: 0.0056,
    id: "w0",
    phase: 0.2,
    driftAmp: 3.5,
    driftFreq: 0.004,
    driftSpeed: 1.2,
    speedA: 3.05,
    speedB: 1.45,
    strokeMainOpacity: 0.72,
    stroke: "rgba(0,212,255,0.62)",
    strokeMainWidth: 1.22,
    strokeSoftOpacity: 0.38,
    strokeSoft: "rgba(0,212,255,0.22)",
    strokeSoftWidth: 2.2,
  },
  {
    ampA: 14,
    ampB: 8,
    baseY: 250,
    freqA: 0.0132,
    freqB: 0.005,
    id: "w1",
    phase: 1.1,
    driftAmp: 2.8,
    driftFreq: 0.0045,
    driftSpeed: 1.1,
    speedA: 2.7,
    speedB: 1.25,
    strokeMainOpacity: 0.46,
    stroke: "rgba(255,149,0,0.54)",
    strokeMainWidth: 0.88,
    strokeSoftOpacity: 0.24,
    strokeSoft: "rgba(255,149,0,0.19)",
    strokeSoftWidth: 1.45,
  },
  {
    ampA: 13,
    ampB: 7,
    baseY: 330,
    freqA: 0.0128,
    freqB: 0.0048,
    id: "w2",
    phase: 2.3,
    driftAmp: 2.6,
    driftFreq: 0.0038,
    driftSpeed: 1,
    speedA: 2.45,
    speedB: 1.18,
    strokeMainOpacity: 0.68,
    stroke: "rgba(217,225,32,0.56)",
    strokeMainWidth: 1.06,
    strokeSoftOpacity: 0.32,
    strokeSoft: "rgba(217,225,32,0.2)",
    strokeSoftWidth: 1.9,
  },
  {
    ampA: 14,
    ampB: 8,
    baseY: 420,
    freqA: 0.013,
    freqB: 0.0052,
    id: "w3",
    phase: 3.2,
    driftAmp: 2.4,
    driftFreq: 0.0042,
    driftSpeed: 0.95,
    speedA: 2.55,
    speedB: 1.2,
    strokeMainOpacity: 0.44,
    stroke: "rgba(124,58,237,0.5)",
    strokeMainWidth: 0.84,
    strokeSoftOpacity: 0.22,
    strokeSoft: "rgba(124,58,237,0.18)",
    strokeSoftWidth: 1.35,
  },
  {
    ampA: 17,
    ampB: 10,
    baseY: 515,
    freqA: 0.0122,
    freqB: 0.0051,
    id: "w4",
    phase: 4.1,
    driftAmp: 3.1,
    driftFreq: 0.0043,
    driftSpeed: 1.15,
    speedA: 2.85,
    speedB: 1.35,
    strokeMainOpacity: 0.66,
    stroke: "rgba(0,212,255,0.5)",
    strokeMainWidth: 1.14,
    strokeSoftOpacity: 0.3,
    strokeSoft: "rgba(0,212,255,0.18)",
    strokeSoftWidth: 1.8,
  },
];

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}

function waveYAtX(x: number, tMs: number, cfg: WaveConfig) {
  const t = tMs / 1000;
  const smooth =
    cfg.baseY +
    Math.sin(x * cfg.freqA + t * cfg.speedA + cfg.phase) * cfg.ampA +
    Math.sin(x * cfg.freqB - t * cfg.speedB + cfg.phase * 0.72) * cfg.ampB;

  const drift =
    Math.sin(x * cfg.driftFreq - t * cfg.driftSpeed + cfg.phase) * cfg.driftAmp;
  return clamp(smooth + drift, 26, 674);
}

function buildWavePath(tMs: number, cfg: WaveConfig) {
  const step = 20;
  let path = "";
  for (let x = 0; x <= 1200; x += step) {
    const y = waveYAtX(x, tMs, cfg);
    path += x === 0 ? `M${x} ${y}` : ` L${x} ${y}`;
  }
  return path;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function useWaveParticle(
  time: MotionValue<number>,
  cfg: WaveConfig,
  speed: number,
  offset: number,
) {
  const x = useTransform(
    time,
    (t) => (((t / 1000) * speed + offset) % 1) * 1200,
  );
  const y = useTransform([x, time], ([xValue, tValue]) =>
    waveYAtX(xValue as number, tValue as number, cfg),
  );
  return { x, y };
}

function EnergyParticle({
  config,
  time,
  waves,
}: {
  config: ParticleConfig;
  time: MotionValue<number>;
  waves: WaveConfig[];
}) {
  const wave = waves[config.waveIndex] ?? waves[0];
  const particle = useWaveParticle(time, wave, config.speed, config.offset);
  return (
    <>
      <motion.circle
        animate={{ opacity: [0, 0.06, 0.18, 0.05, 0] }}
        cx={particle.x}
        cy={particle.y}
        fill={config.color}
        r="8.5"
        transition={{
          delay: config.offset * 5.7,
          duration: 3.6 + config.speed * 9.2,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.22, 0.5, 0.82, 1],
        }}
      />
      <motion.circle
        animate={{
          opacity: [0, 0.16, 0.7, 0.12, 0],
          scale: [0.8, 1, 1.08, 0.94, 0.74],
        }}
        cx={particle.x}
        cy={particle.y}
        fill={config.color}
        r="2.6"
        style={{ filter: `drop-shadow(0 0 10px ${config.glow})` }}
        transition={{
          delay: config.offset * 6.1,
          duration: 2.8 + config.speed * 10.2,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.2, 0.46, 0.8, 1],
        }}
      />
    </>
  );
}

function WaveLine({
  cfg,
  reducedMotion,
  time,
}: {
  cfg: WaveConfig;
  reducedMotion: boolean;
  time: MotionValue<number>;
}) {
  const path = useTransform(time, (t) => buildWavePath(t, cfg));
  const glowOpacity = useTransform(time, (t) => {
    const flow = Math.abs(Math.sin((t / 1000) * cfg.speedA + cfg.phase));
    return 0.12 + flow ** 2 * 0.24;
  });
  const softOpacity = useTransform(
    glowOpacity,
    (v) => v * cfg.strokeSoftOpacity,
  );

  return (
    <>
      <motion.path
        d={reducedMotion ? buildWavePath(0, cfg) : path}
        fill="none"
        stroke={cfg.strokeSoft}
        strokeWidth={cfg.strokeSoftWidth}
        style={{ opacity: softOpacity }}
      />
      <motion.path
        d={reducedMotion ? buildWavePath(0, cfg) : path}
        fill="none"
        stroke={cfg.stroke}
        strokeWidth={cfg.strokeMainWidth}
        style={{ opacity: cfg.strokeMainOpacity }}
      />
    </>
  );
}

export function BrandParallax() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const time = useTime();

  const ringSlowY = useTransform(scrollY, [0, 1200], [0, -40]);
  const ringFastY = useTransform(scrollY, [0, 1200], [0, -90]);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, idx) => {
        const r1 = seededRandom(idx + 1);
        const r2 = seededRandom(idx + 13);
        const r3 = seededRandom(idx + 31);
        const palette = [
          { color: "rgba(0,212,255,0.96)", glow: "rgba(0,212,255,1)" },
          { color: "rgba(217,225,32,0.95)", glow: "rgba(217,225,32,1)" },
          { color: "rgba(255,149,0,0.94)", glow: "rgba(255,149,0,1)" },
          { color: "rgba(124,58,237,0.93)", glow: "rgba(124,58,237,1)" },
        ] as const;
        const color = palette[idx % palette.length];
        return {
          color: color.color,
          glow: color.glow,
          id: `particle-${idx}`,
          offset: r1,
          speed: 0.03 + r2 * 0.04,
          waveIndex: Math.floor(r3 * WAVES.length),
        } satisfies ParticleConfig;
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-28 top-8 h-96 w-96 rounded-full border border-white/10"
        style={reducedMotion ? undefined : { y: ringSlowY }}
      />
      <motion.div
        className="absolute -right-28 top-24 h-[34rem] w-[34rem] rounded-full border border-white/10"
        style={reducedMotion ? undefined : { y: ringFastY }}
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-80"
        focusable="false"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 700"
      >
        {WAVES.map((wave) => (
          <WaveLine
            key={wave.id}
            cfg={wave}
            reducedMotion={Boolean(reducedMotion)}
            time={time}
          />
        ))}

        {!reducedMotion &&
          particles.map((particle) => (
            <EnergyParticle
              key={particle.id}
              config={particle}
              time={time}
              waves={WAVES}
            />
          ))}
      </svg>

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.4, 0.9, 0.4],
              }
        }
        className="absolute left-[18%] top-[16%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.16)_0%,transparent_70%)] blur-2xl"
        transition={
          reducedMotion ? undefined : { duration: 3.2, repeat: Infinity }
        }
      />
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.35, 0.75, 0.35],
              }
        }
        className="absolute bottom-[10%] right-[14%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)] blur-2xl"
        transition={
          reducedMotion
            ? undefined
            : { duration: 3.6, repeat: Infinity, delay: 0.4 }
        }
      />
    </div>
  );
}
