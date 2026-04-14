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
  Crosshair,
  MessageSquareText,
  Orbit,
  RefreshCw,
  ScanLine,
  ShoppingCart,
} from "lucide-react";
import { useRef, useState } from "react";

import { BgLayer, stepTowardIndex } from "./shared";
import type { NarrativeSection } from "./types";
import {
  DepthVisual,
  DesignIntentionVisual,
  MethodVisual,
  RefinementVisual,
} from "./vision-panel";
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
  const reducedMotion = useReducedMotion();
  // Opener: visible 0?0.14, fades 0.14?0.22
  // Beat 0 active Ãƒâ€¹Ã…â€œ 0.08?0.22; compOpacity reaches ~80% before that window closes
  const openerOpacity = useTransform(progress, [0, 0.46, 0.68], [1, 1, 0]);
  const openerY = useTransform(progress, [0, 0.82], [0, -32]);
  const compOpacity = useTransform(progress, [0.62, 0.84], [0, 1]);
  const brandScale = useTransform(progress, [0, 0.68], [1, 1.04]);
  const brandGlow = useTransform(progress, [0, 0.3, 0.68], [0.2, 0.42, 0.18]);
  const brandStripeX = useTransform(progress, [0, 0.68], [-18, 24]);
  // Theatrical opener ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â each layer gets its own parallax speed
  const openerEyebrowY = useTransform(progress, [0, 0.68], [0, -8]);
  const openerBrandY = useTransform(progress, [0, 0.68], [0, -16]);
  const openerTitleY = useTransform(progress, [0, 0.68], [0, -26]);
  const openerLeadY = useTransform(progress, [0, 0.68], [0, -12]);
  const openerPillarsY = useTransform(progress, [0, 0.68], [10, -32]);
  const openerPillarsOp = useTransform(progress, [0, 0.04], [0, 1]);
  const openerBgWmarkY = useTransform(progress, [0, 0.68], [0, 22]);
  const openerSvgY = useTransform(progress, [0, 0.68], [0, -14]);
  const openerScrollCueOp = useTransform(progress, [0, 0.24, 0.46], [0.4, 0.4, 0]);
  const studioLooks = [
    {
      accent: "#00D4FF",
      detail:
        "Leemos restricciones reales antes de decidir stack, alcance y secuencia de implementaciÃƒÆ’Ã‚Â³n.",
      helper: "DecisiÃƒÆ’Ã‚Â³n tÃƒÆ’Ã‚Â©cnica con contexto operativo.",
      overlay:
        "radial-gradient(ellipse 62% 58% at 24% 52%, rgba(0,212,255,0.34) 0%, transparent 70%), radial-gradient(ellipse 58% 60% at 78% 34%, rgba(59,31,255,0.3) 0%, transparent 70%), radial-gradient(ellipse 52% 42% at 80% 76%, rgba(255,0,144,0.24) 0%, transparent 62%), radial-gradient(ellipse 36% 40% at 96% 20%, rgba(255,149,0,0.2) 0%, transparent 66%), #050508",
    },
    {
      accent: "#00BCD4",
      detail:
        "DiseÃƒÆ’Ã‚Â±amos estructura de interacciÃƒÆ’Ã‚Â³n y arquitectura visual para que el sistema se entienda desde el primer uso.",
      helper: "Forma al servicio de la funciÃƒÆ’Ã‚Â³n.",
      overlay:
        "radial-gradient(ellipse 64% 56% at 20% 42%, rgba(0,188,212,0.34) 0%, transparent 72%), radial-gradient(ellipse 52% 60% at 84% 22%, rgba(255,149,0,0.26) 0%, transparent 66%), radial-gradient(ellipse 48% 48% at 74% 70%, rgba(132,204,22,0.22) 0%, transparent 62%), #050508",
    },
    {
      accent: "#84CC16",
      detail:
        "Construimos por mÃƒÆ’Ã‚Â³dulos acoplables, con convenciones claras y control de cambios para sostener continuidad.",
      helper: "Estabilidad, mantenibilidad y consistencia.",
      overlay:
        "radial-gradient(ellipse 68% 60% at 30% 30%, rgba(132,204,22,0.34) 0%, transparent 72%), radial-gradient(ellipse 56% 54% at 12% 68%, rgba(255,149,0,0.3) 0%, transparent 66%), radial-gradient(ellipse 52% 50% at 86% 58%, rgba(132,204,22,0.24) 0%, transparent 66%), #050508",
    },
    {
      accent: "#FF0090",
      detail:
        "Refinamos con seÃƒÆ’Ã‚Â±ales de uso y rendimiento para ajustar precisiÃƒÆ’Ã‚Â³n sin perder velocidad de entrega.",
      helper: "IteraciÃƒÆ’Ã‚Â³n con evidencia, no con suposiciÃƒÆ’Ã‚Â³n.",
      overlay:
        "radial-gradient(ellipse 66% 58% at 72% 36%, rgba(255,0,144,0.34) 0%, transparent 70%), radial-gradient(ellipse 58% 52% at 18% 30%, rgba(255,149,0,0.3) 0%, transparent 66%), radial-gradient(ellipse 54% 56% at 26% 78%, rgba(176,144,42,0.24) 0%, transparent 64%), #050508",
    },
  ] as const;
  const activeLook = studioLooks[active % studioLooks.length];
  const beatIcons = [ScanLine, Crosshair, Blocks, RefreshCw] as const;
  const BeatIcon = beatIcons[Math.min(active, beatIcons.length - 1)];

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* -- Opener teatral -- */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{ opacity: openerOpacity }}
      >
        {/* Watermark BHRK en fondo */}
        <motion.div
          className="absolute inset-0 flex select-none items-center justify-center"
          style={reducedMotion ? undefined : { y: openerBgWmarkY }}
        >
          <span
            className="font-mono text-[22vw] font-black leading-none tracking-[-0.04em] text-white"
            style={{ opacity: 0.035 }}
          >
            BHRK
          </span>
        </motion.div>

        {/* SVG convergencia (desktop) */}
        <motion.div
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-[44%] md:block"
          style={reducedMotion ? undefined : { y: openerSvgY }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 320 460"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="glow-c" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-hub" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* LÃƒÆ’Ã‚Â­neas de conexiÃƒÆ’Ã‚Â³n */}
            <line x1="66" y1="96" x2="160" y2="230" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="4 4" />
            <line x1="254" y1="96" x2="160" y2="230" stroke="#84CC16" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="4 4" />
            <line x1="160" y1="360" x2="160" y2="230" stroke="#FF9500" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="4 4" />

            {/* PartÃƒÆ’Ã‚Â­cula viajante ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â consultorÃƒÆ’Ã‚Â­a */}
            <motion.circle
              r={2.5}
              fill="#00D4FF"
              filter="url(#glow-c)"
              animate={reducedMotion ? {} : { offsetDistance: ["0%", "100%"] }}
              style={{ offsetPath: "path('M66,96 L160,230')", offsetRotate: "0deg" } as React.CSSProperties}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0 }}
            />
            {/* PartÃƒÆ’Ã‚Â­cula viajante ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ingenierÃƒÆ’Ã‚Â­a */}
            <motion.circle
              r={2.5}
              fill="#84CC16"
              filter="url(#glow-c)"
              animate={reducedMotion ? {} : { offsetDistance: ["0%", "100%"] }}
              style={{ offsetPath: "path('M254,96 L160,230')", offsetRotate: "0deg" } as React.CSSProperties}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.7 }}
            />
            {/* PartÃƒÆ’Ã‚Â­cula viajante ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â diseÃƒÆ’Ã‚Â±o */}
            <motion.circle
              r={2.5}
              fill="#FF9500"
              filter="url(#glow-c)"
              animate={reducedMotion ? {} : { offsetDistance: ["0%", "100%"] }}
              style={{ offsetPath: "path('M160,360 L160,230')", offsetRotate: "0deg" } as React.CSSProperties}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.4 }}
            />

            {/* Nodo: ConsultorÃƒÆ’Ã‚Â­a */}
            <circle cx="66" cy="96" r="20" fill="#00D4FF" fillOpacity="0.10" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.55" />
            <motion.circle cx={66} cy={96} r={28} fill="none" stroke="#00D4FF" strokeWidth="0.6" strokeOpacity="0.3"
              animate={reducedMotion ? {} : { r: [28, 36, 28], strokeOpacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <circle cx="66" cy="96" r="4" fill="#00D4FF" filter="url(#glow-c)" />
            <text x="66" y="132" textAnchor="middle" fill="#00D4FF" fontSize="8" fontFamily="monospace" opacity="0.7">CONSULTORÃƒÆ’Ã‚ÂA</text>

            {/* Nodo: IngenierÃƒÆ’Ã‚Â­a */}
            <circle cx="254" cy="96" r="20" fill="#84CC16" fillOpacity="0.10" stroke="#84CC16" strokeWidth="1" strokeOpacity="0.55" />
            <motion.circle cx={254} cy={96} r={28} fill="none" stroke="#84CC16" strokeWidth="0.6" strokeOpacity="0.3"
              animate={reducedMotion ? {} : { r: [28, 36, 28], strokeOpacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            <circle cx="254" cy="96" r="4" fill="#84CC16" filter="url(#glow-c)" />
            <text x="254" y="132" textAnchor="middle" fill="#84CC16" fontSize="8" fontFamily="monospace" opacity="0.7">INGENIERÃƒÆ’Ã‚ÂA</text>

            {/* Nodo: DiseÃƒÆ’Ã‚Â±o */}
            <circle cx="160" cy="360" r="20" fill="#FF9500" fillOpacity="0.10" stroke="#FF9500" strokeWidth="1" strokeOpacity="0.55" />
            <motion.circle cx={160} cy={360} r={28} fill="none" stroke="#FF9500" strokeWidth="0.6" strokeOpacity="0.3"
              animate={reducedMotion ? {} : { r: [28, 36, 28], strokeOpacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
            <circle cx="160" cy="360" r="4" fill="#FF9500" filter="url(#glow-c)" />
            <text x="160" y="396" textAnchor="middle" fill="#FF9500" fontSize="8" fontFamily="monospace" opacity="0.7">DISEÃƒÆ’Ã¢â‚¬ËœO</text>

            {/* Hub central: BHRK */}
            <motion.circle cx={160} cy={230} r={38} fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeOpacity="0.18"
              animate={reducedMotion ? {} : { r: [38, 52, 38], strokeOpacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} />
            <circle cx="160" cy="230" r="28" fill="rgba(0,212,255,0.08)" stroke="#00D4FF" strokeWidth="1.2" strokeOpacity="0.5" filter="url(#glow-hub)" />
            <circle cx="160" cy="230" r="7" fill="#00D4FF" fillOpacity="0.9" filter="url(#glow-hub)" />
            <text x="160" y="226" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold" opacity="0.9">BHRK</text>
            <text x="160" y="237" textAnchor="middle" fill="#00D4FF" fontSize="5.5" fontFamily="monospace" opacity="0.65">CODELABS</text>
          </svg>
        </motion.div>

        {/* Contenido izquierda */}
        <div className="absolute inset-0 flex items-center" aria-hidden={false}>
          <div className="w-full max-w-[54%] pl-6 md:pl-10">
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]"
              style={reducedMotion ? undefined : { y: openerEyebrowY }}
            >
              {section.eyebrow}
            </motion.p>
            <motion.p
              className="mt-3 font-mono text-[clamp(1.6rem,2.4vw+0.6rem,2.8rem)] font-black tracking-[-0.02em] text-white"
              style={reducedMotion ? undefined : { y: openerBrandY }}
            >
              BHRK{" "}
              <span className="hero-glow">Ãƒâ€šÃ‚Â·</span>{" "}
              <span className="text-[var(--color-accent-cyan)]">Codelabs</span>
            </motion.p>
            <motion.h2
              className="mt-4 text-display text-[clamp(1.4rem,2vw+0.5rem,2.4rem)] font-bold leading-[1.1] text-white/90"
              style={reducedMotion ? undefined : { y: openerTitleY }}
            >
              {section.title}
            </motion.h2>
            <motion.p
              className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-text-secondary)]"
              style={reducedMotion ? undefined : { y: openerLeadY }}
            >
              {section.lead}
            </motion.p>

            {/* Tres pilares */}
            <motion.div
              className="mt-6 space-y-2"
              style={reducedMotion ? undefined : { y: openerPillarsY, opacity: openerPillarsOp }}
            >
              {(
                [
                  ["#00D4FF", "ConsultorÃƒÆ’Ã‚Â­a"],
                  ["#84CC16", "IngenierÃƒÆ’Ã‚Â­a"],
                  ["#FF9500", "DiseÃƒÆ’Ã‚Â±o"],
                ] as const
              ).map(([color, label]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="inline-block h-1.5 w-5 rounded-full" style={{ background: color }} />
                  <span className="font-mono text-xs text-white/60">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.p
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30"
              style={reducedMotion ? undefined : { opacity: openerScrollCueOp }}
            >
              Desplaza para explorar
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative min-h-0 flex-1 overflow-hidden bg-black"
        style={{ opacity: compOpacity }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-6 md:px-10 md:pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-cyan)] md:text-xs">
            {section.eyebrow}
          </p>
          <h2 className="hero-glow mt-3 max-w-4xl text-display text-[clamp(1.6rem,2.2vw+0.8rem,3rem)] font-bold leading-[1.06] text-white/95">
            {section.title}
          </h2>
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`${section.beats[active]?.title}-bg`}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1.45, ease: "easeOut" }}
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
            className="absolute inset-0 pt-28 md:pt-32"
            exit={{ opacity: 0, y: direction > 0 ? -90 : 90 }}
            initial={{ opacity: 0, y: direction > 0 ? 90 : -90 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {/* Layout split izquierda / derecha ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â todos los beats */}
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
                      Estudio en acciÃƒÆ’Ã‚Â³n Ãƒâ€šÃ‚Â· {`0${active + 1}`} /{" "}
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
              {/* Visual hero semÃƒÆ’Ã‚Â¡ntico por beat */}
              <div className="relative hidden overflow-hidden md:block">
                <StudioSideVisual active={active} progress={progress} />
              </div>
            </div>
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

  useMotionValueEvent(mapped, "change", (value) => {
    const next = Math.max(
      0,
      Math.min(section.beats.length - 1, Math.floor(value + Number.EPSILON)),
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
      className="relative h-[calc(100svh*8.7)]"
      id={section.id}
    >
      <motion.article
        className="sticky top-0 h-[100svh] overflow-hidden border-y border-[var(--color-border)] bg-[linear-gradient(158deg,rgba(13,13,15,0.99),rgba(23,22,30,0.94))] md:top-16 md:h-[calc(100svh-4rem)]"
        style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
      >
        <BgLayer index={index} />
        <div className="relative z-10 mx-auto h-full w-full max-w-[95vw] px-4 py-12 md:px-6 md:py-14">
          <StudioView
            active={active}
            direction={direction}
            progress={syncedScroll}
            section={section}
          />
        </div>
      </motion.article>
    </section>
  );
}


export { StudioPanel };



