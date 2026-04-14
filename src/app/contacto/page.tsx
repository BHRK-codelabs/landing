import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Canales de contacto de BHRK Codelabs para proyectos de consultoría tecnológica, desarrollo de software y automatización.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <h1 className="text-display fs-d-md font-bold">Contacto</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">BHRK Codelabs</p>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Teléfono: +57 302 401 2969
      </p>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Dirección: Calle 37A 9-47 Ibagué, Tolima. Colombia
      </p>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Correo: hola.bhrkcodelabs@gmail.com
      </p>
      <p className="mt-2 text-[var(--color-text-secondary)]">Ubicación: Colombia</p>
    </main>
  );
}
