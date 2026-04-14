import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandParallax } from "@/components/landing/brand-parallax";
import { HeroSequence } from "@/components/landing/hero-sequence";
import { IntroParallaxPhrase } from "@/components/landing/intro-parallax-phrase";
import { StackedParallaxSections } from "@/components/landing/stacked-parallax-sections";
import { TypewriterBadge } from "@/components/landing/typewriter-badge";
import { FadeIn } from "@/components/motion/fade-in";

const heroTickerItems = [
  "Software a medida",
  "Automatización",
  "Integraciones",
  "Canales conversacionales",
];

const stackedSections = [
  {
    id: "servicios",
    eyebrow: "Servicios actuales",
    title:
      "Capacidades técnicas pensadas para resolver problemas reales, no para llenar un portafolio.",
    lead: "Cada línea de trabajo responde a una necesidad concreta: ordenar operaciones, reducir fricción, conectar sistemas, acelerar decisiones y construir productos que sí se sostienen.",
    beats: [
      {
        title: "CONSULTORÍA TECNOLÓGICA",
        description:
          "Aterrizamos decisiones técnicas con contexto real de operación, negocio y crecimiento. Ayudamos a definir prioridades, ordenar alcance y tomar mejores decisiones antes de construir mal o demasiado tarde.",
      },
      {
        title: "DESARROLLO DE SOFTWARE A MEDIDA",
        description:
          "Diseñamos y construimos sistemas, plataformas y componentes que responden al flujo real de trabajo. Nos enfocamos en claridad estructural, mantenibilidad y una ejecución que no se rompa al primer cambio.",
      },
      {
        title: "AUTOMATIZACIÓN E INTEGRACIONES",
        description:
          "Conectamos herramientas, reducimos tareas manuales y eliminamos fricciones repetitivas entre áreas, canales y sistemas. La meta no es automatizar por moda, sino operar mejor con menos desgaste y menos error.",
      },
      {
        title: "CANALES CONVERSACIONALES",
        description:
          "Diseñamos experiencias conversacionales para atención, soporte y operación en canales digitales. No se trata de poner un bot por ponerlo, sino de construir flujos útiles, comprensibles y alineados con tareas reales.",
      },
      {
        title: "STAFF AUGMENTATION",
        description:
          "Sumamos capacidad técnica con integración rápida, criterio de trabajo y foco en continuidad. Nos acoplamos a equipos que necesitan avanzar sin perder tiempo en fricción de arranque ni en procesos innecesarios.",
      },
      {
        title: "EXPERIENCIAS WEB Y PRODUCTO",
        description:
          "Creamos interfaces y experiencias digitales donde la forma no estorba al fondo. Buscamos claridad, rendimiento y una sensación de uso que transmita confianza desde el primer contacto.",
      },
    ],
  },
  {
    id: "metodo",
    eyebrow: "Cómo trabajamos",
    title: "Del problema al resultado con un proceso visible y sin burocracia.",
    lead: "Trabajamos por etapas para reducir riesgo, mantener claridad y mejorar decisiones en cada entrega.",
    beats: [
      {
        title: "Entender",
        description:
          "Leemos contexto, operación y restricciones antes de proponer.",
      },
      {
        title: "Mapear",
        description:
          "Traducimos complejidad en prioridades, dependencias y riesgos.",
      },
      {
        title: "Diseñar",
        description:
          "Definimos solución técnica y experiencia con foco en claridad.",
      },
      {
        title: "Construir",
        description:
          "Implementamos con trazabilidad, calidad y ritmo sostenible.",
      },
      {
        title: "Refinar",
        description:
          "Ajustamos con evidencia de uso para mejorar adopción y rendimiento.",
      },
    ],
  },
  {
    id: "vision-producto",
    eyebrow: "Visión de producto",
    title:
      "Líneas en incubación con dirección clara, no promesas de lanzamiento.",
    lead: "Estas áreas se comunican como trabajo en desarrollo. No son oferta comercial activa.",
    beats: [
      {
        title: "POS",
        description:
          "Arquitectura operativa para puntos de venta con control del flujo transaccional.",
      },
      {
        title: "Facturación electrónica",
        description:
          "Estandarización de procesos fiscales con trazabilidad y menor carga manual.",
      },
      {
        title: "CRM",
        description:
          "Relación comercial organizada sobre datos útiles para decisiones reales.",
      },
      {
        title: "ERP",
        description:
          "Integración gradual de procesos críticos en una capa operativa coherente.",
      },
      {
        title: "Chatbots especializados",
        description:
          "Prototipos orientados a tareas concretas de negocio y atención.",
      },
    ],
  },
  {
    id: "sobre-bhrk",
    eyebrow: "Estudio",
    title: "Consultoría, ingeniería y diseño en una misma capa de criterio.",
    lead: "No somos software factory genérica ni agencia de marketing. Somos un estudio técnico-creativo enfocado en soluciones claras, útiles y confiables.",
    beats: [
      {
        title: "Profundidad antes de ejecutar",
        description:
          "Pensamos con contexto para evitar decisiones apresuradas.",
      },
      {
        title: "Diseño con intención",
        description: "Buscamos que lo complejo se entienda y se use mejor.",
      },
      {
        title: "Construcción con método",
        description:
          "Priorizamos estabilidad, mantenibilidad y consistencia de entrega.",
      },
      {
        title: "Refinamiento continuo",
        description: "Mejoramos con evidencia, no con supuestos vacíos.",
      },
    ],
  },
  {
    id: "info-verificada",
    eyebrow: "Confianza para empezar",
    title: "Sabes quiénes somos y cómo contactarnos hoy.",
    lead: "Datos claros, respuesta humana y un canal directo para avanzar.",
    beats: [
      { title: "Nombre de negocio", description: "BHRK Codelabs." },
      {
        title: "Contacto comercial",
        description: "+57 302 401 2969 · hola@bhrkcodelabs.com.",
      },
      {
        title: "Dirección",
        description: " Calle 37A 9-47 Ibagué, Tolima. Colombia",
      },
      { title: "Operación", description: "Colombia y LATAM." },
      {
        title: "Atención",
        description:
          "Respuesta directa con contexto técnico, sin filtros innecesarios.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "BHRK Codelabs combina consultoría, ingeniería y diseño para resolver procesos, desarrollar software y conectar sistemas con claridad.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const mainSections = stackedSections.filter(
    (section) => section.id !== "info-verificada",
  );
  const trustSection = stackedSections.find(
    (section) => section.id === "info-verificada",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BHRK Codelabs",
    url: "https://bhrkcodelabs.io",
    email: "hola@bhrkcodelabs.com",
    telephone: "+57 302 4012969",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressLocality: "Colombia",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgb(13_13_15_/_0.86)] backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <a className="group flex items-center gap-3" href="#inicio">
            <Image
              alt="BHRK Codelabs"
              className="h-9 w-auto opacity-90 transition duration-300 group-hover:opacity-100"
              height={48}
              priority
              src="/brand/bhrk-logo-primary.png"
              width={198}
            />
          </a>
          <div className="hidden items-center gap-6 text-sm text-[var(--color-text-secondary)] md:flex">
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#servicios"
            >
              Servicios
            </a>
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#metodo"
            >
              Cómo trabajamos
            </a>
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#vision-producto"
            >
              Visión de producto
            </a>
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#sobre-bhrk"
            >
              Estudio
            </a>
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#info-verificada"
            >
              Confianza
            </a>
            <a
              className="transition hover:text-[var(--color-text-primary)]"
              href="#contacto"
            >
              Contacto
            </a>
          </div>
        </nav>
      </header>

      <main className="snap-y snap-proximity overscroll-y-contain md:snap-none">
        <section
          id="inicio"
          className="section-shell relative overflow-hidden px-5 pb-24 pt-24 md:pb-32 md:pt-32"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <BrandParallax />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent-cyan)]">
                ESTUDIO TÉCNICO-CREATIVO
              </p>
              <HeroSequence />
              <TypewriterBadge items={heroTickerItems} />
            </FadeIn>

            <FadeIn className="flex flex-wrap gap-4" delay={0.1}>
              <a
                className="rounded-full bg-[var(--color-accent-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-bg-base)] transition hover:scale-[1.02]"
                href="#contacto"
              >
                Hablemos de tu proyecto
              </a>
              <a
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-white/30 hover:text-white"
                href="#metodo"
              >
                Ver cómo trabajamos
              </a>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--color-text-muted)]">
                Software a medida · Automatización · Integraciones · Canales
                conversacionales
              </p>
            </FadeIn>
          </div>
        </section>

        <IntroParallaxPhrase />

        <StackedParallaxSections sections={mainSections} />

        <section
          id="contacto"
          className="section-shell relative overflow-hidden bg-[var(--color-bg-surface)] px-5 py-24"
          style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
        >
          <BrandParallax />
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent-cyan)]">
                Contacto directo
              </p>
              <h2 className="mt-4 text-display text-[clamp(2rem,3vw+0.8rem,3.4rem)] font-bold leading-[1.08]">
                Tienes una idea o una operación que necesita{" "}
                <span className="hero-glow inline-block">orden</span>.
              </h2>
              <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
                Hablemos y definimos un siguiente paso claro, con foco técnico y
                tiempos realistas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex rounded-full bg-[var(--color-accent-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-bg-base)] transition hover:scale-[1.02]"
                  href="mailto:hola@bhrkcodelabs.com"
                >
                  Escribir por correo
                </a>
                <a
                  className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-base)] px-6 py-3 text-sm font-semibold transition hover:border-white/30 hover:text-white"
                  href="tel:+573024012969"
                >
                  Llamar ahora
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {trustSection ? (
          <StackedParallaxSections sections={[trustSection]} />
        ) : null}
      </main>


      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-base)] px-5 py-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 text-sm text-[var(--color-text-secondary)] md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p>
              © {new Date().getFullYear()} BHRK Codelabs. Todos los derechos
              reservados.
            </p>
            <div className="mt-4 space-y-1.5 text-xs leading-6 text-[var(--color-text-muted)] md:text-sm">
              <p>
                <span className="text-[var(--color-text-secondary)]">Dirección:</span>{" "}
                Calle 37A 9-47 Ibagué, Tolima. Colombia
              </p>
              <p>
                <span className="text-[var(--color-text-secondary)]">Teléfono:</span>{" "}
                +57 302 401 2969
              </p>
              <p>
                <span className="text-[var(--color-text-secondary)]">Correo:</span>{" "}
                hola@bhrkcodelabs.com
              </p>
              <p>
                <span className="text-[var(--color-text-secondary)]">Cobertura:</span>{" "}
                Colombia y LATAM
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link href="/servicios">Servicios</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/metodologia">Metodología</Link>
            <Link href="/sobre-nosotros">Sobre nosotros</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
            <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
