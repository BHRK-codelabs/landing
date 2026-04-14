import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de BHRK Codelabs sobre tratamiento de datos personales y canales de contacto.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display fs-d-md font-bold">
        Política de privacidad
      </h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Esta política describe cómo BHRK Codelabs recopila, usa y protege la
        información compartida por usuarios y clientes.
      </p>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Para solicitudes relacionadas con datos personales, escribir a:
        hola@bhrkcodelabs.com.
      </p>
    </main>
  );
}
