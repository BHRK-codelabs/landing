"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const phases = ["headline", "logo", "invite"] as const;

type Phase = (typeof phases)[number];

function GlowWord({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  return (
    <motion.span
      animate={{
        color: ["#f4f4f5", "#cfffff", "#f4f4f5"],
        textShadow: [
          "0 0 0 rgba(0,212,255,0)",
          "0 0 18px rgba(0,212,255,0.58), 0 0 32px rgba(217,225,32,0.28)",
          "0 0 0 rgba(0,212,255,0)",
        ],
      }}
      className="inline-block"
      transition={{
        delay,
        duration: 2.8,
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.span>
  );
}

export function HeroSequence() {
  const reducedMotion = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase: Phase = phases[phaseIndex] ?? "headline";

  useEffect(() => {
    if (reducedMotion) {
      setPhaseIndex(2);
      return;
    }

    const timer = window.setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, [reducedMotion]);

  return (
    <div className="mt-5 min-h-[13.5rem] md:min-h-[15.5rem]">
      <AnimatePresence mode="wait">
        {phase === "headline" ? (
          <motion.h1
            key="headline"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl text-display text-[clamp(2.5rem,4.6vw+1rem,5.6rem)] font-black leading-[1.03]"
            exit={{ opacity: 0, y: -24 }}
            initial={{ opacity: 0, y: 22 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Consultoría, <GlowWord>software</GlowWord> e{" "}
            <GlowWord delay={0.4}>integración</GlowWord> para empresas que
            necesitan construir con claridad.
          </motion.h1>
        ) : null}

        {phase === "logo" ? (
          <motion.div
            key="logo"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex h-[15rem] items-center"
            exit={{ opacity: 0, scale: 0.96, y: -24 }}
            initial={{ opacity: 0, scale: 1.04, y: 24 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image
              alt="BHRK Codelabs"
              className="h-auto w-[min(24rem,88vw)]"
              height={96}
              priority
              src="/brand/bhrk-logo-primary.png"
              width={398}
            />
          </motion.div>
        ) : null}

        {phase === "invite" ? (
          <motion.div
            key="invite"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
            exit={{ opacity: 0, y: -16 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-display text-[clamp(2.5rem,4.6vw+1rem,5.6rem)] font-black leading-[1.03]">
              Conversemos primero la ruta técnica y de permisos.
            </p>
            <motion.p
              animate={{
                color: ["#a1a1aa", "#d9e120", "#a1a1aa"],
              }}
              className="mt-4 max-w-4xl text-sm text-[var(--color-text-secondary)] md:text-base"
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
            >
              Sigue bajando y revisa cómo trabajamos para resolverlo sin
              fricción.
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
