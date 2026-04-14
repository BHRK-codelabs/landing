import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio web y servicios de BHRK Codelabs.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TerminosYCondicionesPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display fs-d-md font-bold">
        Términos y condiciones
      </h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        El uso de este sitio implica aceptación de estos términos. El contenido
        tiene fines informativos sobre servicios actuales de BHRK Codelabs.
      </p>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Para consultas legales o comerciales, escribir a: hola.bhrkcodelabs@gmail.com.
      </p>
    </main>
  );
}
