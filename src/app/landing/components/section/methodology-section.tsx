import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Section} from "@/app/landing/components/section";
import React from "react";


function MethodologySection() {
    return (
        <Section id="metodologia" className="py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <Badge className="bg-white/10 text-white">Proceso</Badge>
                    <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Metodología BHRK </h2>
                    <p className="mt-2 text-white/70">Descubrimiento → Diseño → Build → QA → Lanzamiento →
                        Growth</p>
                </div>

                <div className="grid-cols-1  grid gap-5 md:grid-cols-3 lg:grid-cols-6">
                    {[
                        ["Descubrimiento", "Brief, benchmark, objetivos y KPIs."],
                        ["UX/UI", "Wireframes, UI kit, micro‑interacciones."],
                        ["Build", "Next/Vite, shadcn/ui, integración stripe."],
                        ["QA", "Pruebas, Lighthouse, accesibilidad."],
                        ["Launch", "SEO, dominio, CDN edge, analytics."],
                        ["Growth", "Iteración con datos, tests A/B."],
                    ].map(([t, d], i) => (
                        <Card key={i} className="text-gray-400 border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-base">{t}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-white/70">{d}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export {MethodologySection};
