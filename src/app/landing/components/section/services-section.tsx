import {Section} from "@/app/landing/components/section";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FeatureCard} from "@/app/landing/components/feature-card";
import {Code2, Globe2, Rocket, ShieldCheck, Sparkles, Zap} from "lucide-react";

function ServicesSection() {
    return (

        <><Section id="servicios" className="py-1">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <Badge className="bg-white/10 text-white">Servicios</Badge>
                        <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Lo que construimos</h2>
                        <p className="mt-2 max-w-2xl text-white/70">Paquetes modulares para escalar rápido sin
                            perder calidad.</p>
                    </div>
                    <Tabs defaultValue="web" className="hidden md:block">
                        <TabsList>
                            <TabsTrigger value="web">Web</TabsTrigger>
                            <TabsTrigger value="brand">Brand</TabsTrigger>
                            <TabsTrigger value="growth">Growth</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <FeatureCard icon={Rocket} title="Landing Parallax"
                                 desc="Landing cinematográfica con storytelling, parallax total, SEO y analítica lista para producción."/>
                    <FeatureCard icon={Sparkles} title="UI Kit + shadcn"
                                 desc="Sistema de diseño listo: tokens, componentes y variantes para escalar múltiples páginas y apps."/>
                    <FeatureCard icon={ShieldCheck} title="SEO Técnico"
                                 desc="SSG/SSR, sitemap, meta OG/Twitter, rendimiento 90+, accesibilidad AA."/>
                    <FeatureCard icon={Globe2} title="i18n + Localización"
                                 desc="Multi‑idioma con rutas limpias, contenido CMS y edge cache global."/>
                    <FeatureCard icon={Zap} title="Animaciones"
                                 desc="Transiciones micro‑interacciones con framer‑motion, sensible al performance."/>
                    <FeatureCard icon={Code2} title="Headless + Integraciones"
                                 desc="Stripe/PayPal, CMS (Sanity/Contentlayer), formularios y CRM."/>
                </div>
            </div>
        </Section></>


)

}

export {ServicesSection}