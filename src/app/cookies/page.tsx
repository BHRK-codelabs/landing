import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre uso de cookies y tecnologías similares en el sitio web de BHRK Codelabs.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display text-4xl font-bold">Política de cookies</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Este sitio puede usar cookies técnicas y analíticas para mejorar
        rendimiento, seguridad y experiencia de uso.
      </p>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Para más información, escribir a: hola@bhrkcodelabs.com.
      </p>
    </main>
  );
}
