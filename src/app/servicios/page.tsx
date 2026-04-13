import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios actuales de BHRK Codelabs: consultoría tecnológica, desarrollo a medida, automatización, integraciones, chatbots y staff augmentation.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display text-4xl font-bold">Servicios</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Ayudamos a empresas a diseñar, construir y escalar soluciones de
        software con claridad técnica y foco en operación.
      </p>
      <ul className="mt-8 space-y-3 text-[var(--color-text-secondary)]">
        <li>Consultoría tecnológica</li>
        <li>Desarrollo de software a medida</li>
        <li>Automatización e integraciones</li>
        <li>Chatbots y canales conversacionales</li>
        <li>Staff augmentation</li>
        <li>Experiencias web y producto digital</li>
      </ul>
    </main>
  );
}
