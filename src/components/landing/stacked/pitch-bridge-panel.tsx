"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { BgLayer } from "./shared";
import type { NarrativeSection } from "./types";

const MOTION_CONFIG = {
  sectionOpacity: {
    input: [0, 0.1, 0.84, 1],
    output: [0.22, 1, 1, 0.06],
    spring: { stiffness: 92, damping: 28, mass: 0.42 },
  },
  sectionY: {
    input: [0, 0.1, 1],
    output: [24, 0, -48],
    spring: { stiffness: 84, damping: 24, mass: 0.46 },
  },
  aura: {
    input: [0, 0.5, 1],
    output: [0.22, 0.42, 0.2],
  },
  eyebrow: {
    y: {
      input: [0, 0.12, 0.9, 1],
      output: [18, 0, 0, -12],
      spring: { stiffness: 88, damping: 26, mass: 0.4 },
    },
    opacity: {
      input: [0, 0.1, 0.9, 1],
      output: [0, 1, 1, 0],
      spring: { stiffness: 100, damping: 30, mass: 0.36 },
    },
  },
  heading: {
    y: {
      input: [0.02, 0.2, 0.92, 1],
      output: [20, 0, 0, -14],
      spring: { stiffness: 88, damping: 26, mass: 0.4 },
    },
    opacity: {
      input: [0.02, 0.18, 0.92, 1],
      output: [0, 1, 1, 0],
      spring: { stiffness: 100, damping: 30, mass: 0.36 },
    },
  },
  lead: {
    y: {
      input: [0.06, 0.26, 0.94, 1],
      output: [22, 0, 0, -12],
      spring: { stiffness: 86, damping: 25, mass: 0.42 },
    },
    opacity: {
      input: [0.06, 0.24, 0.94, 1],
      output: [0, 1, 1, 0],
      spring: { stiffness: 98, damping: 30, mass: 0.38 },
    },
  },
  bridge: {
    y: {
      input: [0.1, 0.34, 0.96, 1],
      output: [16, 0, 0, -10],
      spring: { stiffness: 84, damping: 24, mass: 0.44 },
    },
    opacity: {
      input: [0.1, 0.3, 0.96, 1],
      output: [0, 1, 1, 0],
      spring: { stiffness: 96, damping: 30, mass: 0.38 },
    },
  },
};

function PitchBridgePanel({
  section,
  index,
  tone,
}: {
  section: NarrativeSection;
  index: number;
  tone: "vision" | "studio";
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    MOTION_CONFIG.sectionOpacity.input,
    MOTION_CONFIG.sectionOpacity.output,
  );
  const sectionY = useTransform(
    scrollYProgress,
    MOTION_CONFIG.sectionY.input,
    MOTION_CONFIG.sectionY.output,
  );
  const aura = useTransform(
    scrollYProgress,
    MOTION_CONFIG.aura.input,
    MOTION_CONFIG.aura.output,
  );
  const eyebrowY = useTransform(
    scrollYProgress,
    MOTION_CONFIG.eyebrow.y.input,
    MOTION_CONFIG.eyebrow.y.output,
  );
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    MOTION_CONFIG.eyebrow.opacity.input,
    MOTION_CONFIG.eyebrow.opacity.output,
  );
  const headingY = useTransform(
    scrollYProgress,
    MOTION_CONFIG.heading.y.input,
    MOTION_CONFIG.heading.y.output,
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    MOTION_CONFIG.heading.opacity.input,
    MOTION_CONFIG.heading.opacity.output,
  );
  const leadY = useTransform(
    scrollYProgress,
    MOTION_CONFIG.lead.y.input,
    MOTION_CONFIG.lead.y.output,
  );
  const leadOpacity = useTransform(
    scrollYProgress,
    MOTION_CONFIG.lead.opacity.input,
    MOTION_CONFIG.lead.opacity.output,
  );
  const bridgeY = useTransform(
    scrollYProgress,
    MOTION_CONFIG.bridge.y.input,
    MOTION_CONFIG.bridge.y.output,
  );
  const bridgeOpacity = useTransform(
    scrollYProgress,
    MOTION_CONFIG.bridge.opacity.input,
    MOTION_CONFIG.bridge.opacity.output,
  );

  const sectionOpacitySmooth = useSpring(
    sectionOpacity,
    MOTION_CONFIG.sectionOpacity.spring,
  );
  const sectionYSmooth = useSpring(sectionY, MOTION_CONFIG.sectionY.spring);
  const eyebrowYSmooth = useSpring(eyebrowY, MOTION_CONFIG.eyebrow.y.spring);
  const eyebrowOpacitySmooth = useSpring(
    eyebrowOpacity,
    MOTION_CONFIG.eyebrow.opacity.spring,
  );
  const headingYSmooth = useSpring(headingY, MOTION_CONFIG.heading.y.spring);
  const headingOpacitySmooth = useSpring(
    headingOpacity,
    MOTION_CONFIG.heading.opacity.spring,
  );
  const leadYSmooth = useSpring(leadY, MOTION_CONFIG.lead.y.spring);
  const leadOpacitySmooth = useSpring(
    leadOpacity,
    MOTION_CONFIG.lead.opacity.spring,
  );
  const bridgeYSmooth = useSpring(bridgeY, MOTION_CONFIG.bridge.y.spring);
  const bridgeOpacitySmooth = useSpring(
    bridgeOpacity,
    MOTION_CONFIG.bridge.opacity.spring,
  );

  const accentClass =
    tone === "vision"
      ? "text-[var(--color-accent-cyan)]"
      : "text-[var(--color-accent-violet)]";
  const bridgeLine =
    tone === "vision"
      ? "Incubación real: claridad hoy, lanzamiento cuando esté listo."
      : "Estudio técnico-creativo: criterio, ejecución y refinamiento continuo.";

  return (
    <section
      ref={rootRef}
      id={section.id}
      className="relative z-20 h-[165vh]"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <motion.article
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden border-[var(--color-border)] bg-[linear-gradient(158deg,rgba(13,13,15,0.99),rgba(24,24,27,0.92))]"
        style={{ opacity: sectionOpacitySmooth, y: sectionYSmooth }}
      >
        <BgLayer index={index} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-accent-cyan)]/18 blur-3xl"
          style={{ opacity: aura }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-[36%] h-64 w-64 rounded-full bg-[var(--color-accent-violet)]/16 blur-3xl"
          style={{ opacity: aura }}
        />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-5 py-14 md:py-18">
          <motion.div>
            <motion.p
              className={`font-mono text-xs uppercase tracking-[0.24em] ${accentClass}`}
              style={
                reducedMotion
                  ? undefined
                  : { opacity: eyebrowOpacitySmooth, y: eyebrowYSmooth }
              }
            >
              {section.eyebrow}
            </motion.p>
            <motion.h2
              className="hero-glow typo-title-section mt-5 max-w-5xl"
              style={
                reducedMotion
                  ? undefined
                  : { opacity: headingOpacitySmooth, y: headingYSmooth }
              }
            >
              {section.title}
            </motion.h2>
            <motion.p
              className="mt-5 max-w-3xl text-[var(--color-text-secondary)]"
              style={
                reducedMotion
                  ? undefined
                  : { opacity: leadOpacitySmooth, y: leadYSmooth }
              }
            >
              {section.lead}
            </motion.p>
            <motion.div
              aria-hidden
              className="mt-6 h-px w-[min(26rem,80%)] bg-gradient-to-r from-[var(--color-accent-cyan)]/55 via-white/25 to-transparent"
              style={
                reducedMotion
                  ? undefined
                  : { opacity: bridgeOpacitySmooth, y: bridgeYSmooth }
              }
            />
            <motion.p
              className={`mt-3 font-mono text-xs uppercase tracking-[0.2em] ${accentClass}`}
              style={
                reducedMotion
                  ? undefined
                  : { opacity: bridgeOpacitySmooth, y: bridgeYSmooth }
              }
            >
              {bridgeLine}
            </motion.p>
          </motion.div>
        </div>
      </motion.article>
    </section>
  );
}

export { PitchBridgePanel };
