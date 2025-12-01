import {Section} from "@/app/landing/components/section";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {Tier} from "@/app/landing/components/tier";


function PricingSection() {

    return (
        <Section id="precios" className="py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <Badge className="bg-white/10 text-white">Inversión</Badge>
                    <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Paquetes de lanzamiento</h2>
                    <p className="mt-2 text-white/70">Facturamos en COP y USD. Optimiza presupuesto sin sacrificar
                        impacto.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Tier
                        name="Starter"
                        price="$1.490"
                        subtitle="Landing 1‑3 secciones, base SEO y analítica"
                        features={["Hero + Sobre nosotros", "Parallax base + 1 animación clave", "Form de contacto", "Entrega 2‑3 semanas"]}
                        cta={"Comenzar"}
                        highlighted={false}
                    />
                    <Tier
                        name="Pro"
                        price="$2.990"
                        subtitle="Landing completa y storytelling"
                        features={["Parallax total + 6‑8 secciones", "UI kit shadcn + tokens", "Integraciones (Stripe/HubSpot)", "Entrega 4‑6 semanas"]}
                        cta={"Comenzar"}
                        highlighted={false}
                    />
                    <Tier
                        name="Ultra"
                        price="$4.990"
                        subtitle="Efecto wow + growth stack"
                        features={["Video BG + efectos avanzados", "i18n + SSR/SSG + CMS", "Pruebas A/B + performance 90+", "Entrega 6‑8 semanas"]}
                        cta={"Comenzar"}
                        highlighted={false}
                    />
                </div>
            </div>
        </Section>

    );
}

export {PricingSection};