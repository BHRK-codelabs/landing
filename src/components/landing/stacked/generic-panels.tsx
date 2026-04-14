"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState, type ReactNode } from "react";

import { BgLayer } from "./shared";
import type { NarrativeSection } from "./types";

function TrustView({ section }: { section: NarrativeSection }) {
  const [contact, setContact] = useState("");
  const [brief, setBrief] = useState("");
  const [humanCheck, setHumanCheck] = useState("");
  const [website, setWebsite] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const isHuman = humanCheck.trim().toUpperCase() === "BHRK";
  const hasContact = contact.trim().length >= 6;

  const contactPayload = useMemo(() => {
    const trimmedContact = contact.trim();
    const trimmedBrief = brief.trim();
    return [
      "Hola BHRK, quiero hablar de mi proyecto.",
      "",
      `Contacto: ${trimmedContact || "No indicado"}`,
      `Necesidad: ${trimmedBrief || "Quiero orientaci�n para el siguiente paso"}`,
    ].join("\n");
  }, [brief, contact]);

  const whatsappHref = useMemo(
    () => `https://wa.me/573024012969?text=${encodeURIComponent(contactPayload)}`,
    [contactPayload],
  );
  const mailtoHref = useMemo(
    () =>
      `mailto:hola.bhrkcodelabs@gmail.com?subject=${encodeURIComponent("Consulta desde sitio web")}&body=${encodeURIComponent(contactPayload)}`,
    [contactPayload],
  );

  const validateLead = () => {
    if (website.trim().length > 0) {
      setFeedback("No se pudo validar el env�o. Intenta nuevamente.");
      return false;
    }
    if (!hasContact) {
      setFeedback("D�janos un correo o n�mero v�lido para responderte.");
      return false;
    }
    if (!isHuman) {
      setFeedback('Para continuar, escribe "BHRK" en la confirmaci�n.');
      return false;
    }
    setFeedback(null);
    return true;
  };

  const handleWhatsApp = () => {
    if (!validateLead()) {
      return;
    }
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    if (!validateLead()) {
      return;
    }
    window.location.href = mailtoHref;
  };

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

      <div className="mt-8 grid gap-10 md:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-3">
          {section.beats.map((beat, idx) => (
            <div
              key={beat.title}
              className="grid rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 md:grid-cols-[220px_1fr] md:gap-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                0{idx + 1} � {beat.title}
              </p>
              <p className="mt-1 text-sm leading-7 text-[var(--color-text-secondary)] md:mt-0">
                {beat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(162deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 md:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
            Contacto directo
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            Cu�ntanos qu� necesitas y te respondemos por WhatsApp o correo, como te quede mejor.
          </p>
          <a
            className="mt-4 inline-flex text-xl font-semibold text-[#ff4d4f] hover:text-[#ff7875]"
            href="tel:+573024012969"
          >
            +57 302 401 2969
          </a>

          <div className="mt-6 grid gap-3">
            <input
              className="w-full rounded-xl border border-white/16 bg-black/30 px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-cyan)]"
              inputMode="email"
              onChange={(event) => setContact(event.target.value)}
              placeholder="Tu WhatsApp o correo"
              value={contact}
            />
            <textarea
              className="min-h-24 w-full rounded-xl border border-white/16 bg-black/30 px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-cyan)]"
              onChange={(event) => setBrief(event.target.value)}
              placeholder="�Qu� quieres resolver?"
              value={brief}
            />
            <input
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              type="text"
              value={website}
            />
            <input
              className="w-full rounded-xl border border-white/16 bg-black/30 px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-cyan)]"
              onChange={(event) => setHumanCheck(event.target.value)}
              placeholder='Confirmaci�n r�pida: escribe "BHRK"'
              value={humanCheck}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="inline-flex rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#07220f] transition hover:brightness-110"
              onClick={handleWhatsApp}
              type="button"
            >
              Enviar por WhatsApp
            </button>
            <button
              className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
              onClick={handleEmail}
              type="button"
            >
              Enviar por correo
            </button>
          </div>

          <p className="mt-4 text-xs leading-6 text-[var(--color-text-muted)]">
            Si prefieres, tambi�n puedes llamarnos directo sin llenar el formulario.
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
              0{idx + 1} � {beat.title}
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
  const isFinalTrustPanel = section.id === "info-verificada";
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const syncedScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.34,
  });
  const sectionOpacity = useTransform(
    syncedScroll,
    isFinalTrustPanel ? [0, 0.2, 1] : [0, 0.2, 0.84, 1],
    isFinalTrustPanel ? [0.15, 1, 1] : [0.15, 1, 1, 0.08],
  );
  const sectionY = useTransform(
    syncedScroll,
    isFinalTrustPanel ? [0, 0.2, 1] : [0, 0.2, 1],
    isFinalTrustPanel ? [28, 0, 0] : [28, 0, -36],
  );

  return (
    <section
      ref={rootRef}
      id={section.id}
      className="relative h-[185vh]"
      style={
        isFinalTrustPanel
          ? { scrollSnapAlign: "start", scrollSnapStop: "always" }
          : { scrollSnapAlign: "start", scrollSnapStop: "always" }
      }
    >
      <motion.article
        className={
          isFinalTrustPanel
            ? "relative min-h-[100svh] overflow-visible bg-[linear-gradient(160deg,rgba(17,17,19,0.99),rgba(24,24,27,0.9))] md:sticky md:top-16 md:h-[calc(100svh-4rem)] md:overflow-hidden"
            : "sticky top-0 h-[100svh] overflow-hidden  bg-[linear-gradient(160deg,rgba(17,17,19,0.99),rgba(24,24,27,0.9))] md:top-16 md:h-[calc(100svh-4rem)]"
        }
        style={{ opacity: sectionOpacity, y: sectionY }}
      >
        <BgLayer index={index} />
        <div
          className={
            isFinalTrustPanel
              ? "relative z-10 mx-auto h-full w-full max-w-6xl px-5 py-14 md:py-18"
              : "relative z-10 mx-auto h-full w-full max-w-6xl overflow-y-auto px-5 py-14 md:overflow-visible md:py-18"
          }
        >
          {renderer}
        </div>
      </motion.article>
    </section>
  );
}


export { GenericNarrativePanel, LedgerView, TrustView };

