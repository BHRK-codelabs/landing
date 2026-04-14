import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductEntry = {
  slug: string;
  name: string;
  summary: string;
};

const productEntries: ProductEntry[] = [
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
];

export function generateStaticParams() {
  return productEntries.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = productEntries.find((entry) => entry.slug === params.slug);
  if (!product) {
    return {
      title: "Producto no encontrado",
      alternates: { canonical: "/productos" },
    };
  }

  return {
    title: `${product.name} · Producto en desarrollo`,
    description: `${product.name}: línea de producto en desarrollo de BHRK Codelabs.`,
    alternates: { canonical: `/productos/${product.slug}` },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = productEntries.find((entry) => entry.slug === params.slug);
  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://bhrkcodelabs.io",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Productos",
            item: "https://bhrkcodelabs.io/productos",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `https://bhrkcodelabs.io/productos/${product.slug}`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.summary,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
          price: "0",
          priceCurrency: "COP",
        },
        provider: {
          "@type": "Organization",
          name: "BHRK Codelabs",
          url: "https://bhrkcodelabs.io",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 text-[var(--color-text-primary)]">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-cyan)]">
        Producto en desarrollo
      </p>
      <h1 className="mt-4 typo-title-section">{product.name}</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        {product.summary}
      </p>

      <section
        id="beta-demo"
        className="mt-10 rounded-2xl border border-[var(--color-accent-cyan)]/35 bg-[linear-gradient(155deg,rgba(0,212,255,0.12),rgba(13,13,15,0.86))] p-5"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
          Beta privada
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          Cuando esta línea tenga versión beta estable, abriremos agenda para
          demo.
        </p>
        <a
          className="mt-5 inline-flex rounded-full bg-[var(--color-accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] transition hover:brightness-110"
          href={`mailto:hola.bhrkcodelabs@gmail.com?subject=Interes%20en%20demo%20beta%20-%20${encodeURIComponent(product.name)}&body=Hola%20BHRK%2C%20quiero%20agendar%20demo%20cuando%20haya%20beta%20de%20${encodeURIComponent(product.name)}.`}
        >
          Solicitar demo beta
        </a>
      </section>
    </main>
  );
}
