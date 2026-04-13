import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos en desarrollo",
  description:
    "Líneas de producto en desarrollo de BHRK Codelabs: POS, facturación electrónica, CRM, ERP y chatbots especializados.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display text-4xl font-bold">
        Productos en desarrollo
      </h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Estas soluciones están en construcción y se comunican como próximos
        lanzamientos, no como oferta activa.
      </p>
      <ul className="mt-8 space-y-3 text-[var(--color-text-secondary)]">
        <li>POS</li>
        <li>Facturación electrónica</li>
        <li>CRM</li>
        <li>ERP</li>
        <li>Chatbots especializados</li>
      </ul>
    </main>
  );
}
