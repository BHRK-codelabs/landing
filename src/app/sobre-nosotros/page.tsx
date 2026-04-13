import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce a BHRK Codelabs, estudio técnico-creativo enfocado en consultoría, ingeniería y diseño de soluciones digitales confiables.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display text-4xl font-bold">Sobre nosotros</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        BHRK Codelabs es un estudio de consultoría tecnológica, desarrollo y
        experiencia digital. Combinamos criterio técnico y diseño para construir
        soluciones útiles, claras y confiables.
      </p>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Responsable: Néstor Villar Lautero.
      </p>
    </main>
  );
}
