import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos en desarrollo",
  description:
    "Lineas de producto en desarrollo de BHRK Codelabs: POS, facturacion electronica, CRM, ERP y chatbots especializados.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  const products = [
    {
      slug: "pos",
      name: "POS",
      summary:
        "Control operativo de punto de venta con trazabilidad y foco en continuidad.",
    },
    {
      slug: "facturacion-electronica",
      name: "Facturación electrónica",
      summary:
        "Flujos fiscales estandarizados para reducir carga manual y errores repetitivos.",
    },
    {
      slug: "crm",
      name: "CRM",
      summary:
        "Gestión comercial orientada a seguimiento real y decisiones sobre datos útiles.",
    },
    {
      slug: "erp",
      name: "ERP",
      summary:
        "Integración gradual de procesos críticos en una capa operativa coherente.",
    },
    {
      slug: "chatbots-especializados",
      name: "Chatbots especializados",
      summary:
        "Asistentes orientados a tareas puntuales de soporte, operación y atención.",
    },
  ] as const;

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-cyan)]">
        Vision de producto
      </p>
      <h1 className="mt-4 text-display fs-d-md font-bold">Productos en desarrollo</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Estas lineas se encuentran en exploracion e incubacion. No son oferta
        comercial activa y se comunican como trabajo en evolucion.
      </p>

      <div className="mt-8 grid gap-3">
        {products.map((product, idx) => (
          <a
            key={product.name}
            className="rounded-2xl border border-white/12 bg-white/[0.02] p-4 transition hover:border-[var(--color-accent-cyan)]/55 hover:bg-white/[0.04]"
            href={`/productos/${product.slug}`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Linea 0{idx + 1}
            </p>
            <p className="mt-2 text-base font-semibold">{product.name}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
              {product.summary}
            </p>
          </a>
        ))}
      </div>

      <section
        id="beta-demo"
        className="mt-10 rounded-2xl border border-[var(--color-accent-cyan)]/35 bg-[linear-gradient(155deg,rgba(0,212,255,0.12),rgba(13,13,15,0.86))] p-5"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
          Beta privada
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          Si quieres conocer una linea cuando alcance version beta, podemos
          agendar una demo controlada.
        </p>
        <a
          className="mt-5 inline-flex rounded-full bg-[var(--color-accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] transition hover:brightness-110"
          href="mailto:hola.bhrkcodelabs@gmail.com?subject=Interes%20en%20demo%20beta&body=Hola%20BHRK%2C%20quiero%20agendar%20demo%20cuando%20haya%20beta%20disponible."
        >
          Solicitar demo beta
        </a>
      </section>
    </main>
  );
}
