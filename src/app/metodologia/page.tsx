import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Metodología de trabajo de BHRK Codelabs: Entender, Mapear, Diseñar, Construir y Refinar.",
  alternates: { canonical: "/metodologia" },
};

export default function MetodologiaPage() {
  const steps = ["Entender", "Mapear", "Diseñar", "Construir", "Refinar"];

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display text-4xl font-bold">Metodología</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Trabajamos por etapas para evitar improvisación, reducir riesgo y
        sostener decisiones técnicas con contexto.
      </p>
      <ol className="mt-8 space-y-3 text-[var(--color-text-secondary)]">
        {steps.map((step, index) => (
          <li key={step}>
            {index + 1}. {step}
          </li>
        ))}
      </ol>
    </main>
  );
}
