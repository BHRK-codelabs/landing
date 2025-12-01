'use client'

import "./gradient-bg.scss"
import React from "react";
import {Button} from "@/components/ui/button";
import {Hero} from "@/app/landing/components/hero";
import {LOGO_DARK, LOGO_LIGHT} from "@/app/landing/components/logo-imgs";
import {CapabilitiesSection} from "@/app/landing/components/section/capabilities-section";
import {ServicesSection} from "@/app/landing/components/section/services-section";
import {ShowcaseSection} from "@/app/landing/components/section/showcase-section";
import {MethodologySection} from "@/app/landing/components/section/methodology-section";
import {PricingSection} from "@/app/landing/components/section/pricing-section";
import Navbar from "@/app/landing/components/navbar";

const NeonDivider = () => (
    <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
);

const ColombiaStrip = () => (
    <div className="relative w-full overflow-hidden border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
        <span className="inline-flex h-3 w-5 overflow-hidden rounded-sm">
          <span className="h-full w-1/3 bg-yellow-400"/>
          <span className="h-full w-1/3 bg-blue-600"/>
          <span className="h-full w-1/3 bg-red-600"/>
        </span>
                <span>Hecho en Colombia · Operamos para LATAM</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
                <span>🇨🇴 Bogotá · Medellín · Cali · Ibagué</span>
                <span className="text-white/50">GMT-5</span>
            </div>
        </div>
    </div>
);
export default function Landing() {
    const navLinks = [
        {href: "#work", label: "Work"},
        {href: "#capabilities", label: "Capabilities"},
        {href: "#about", label: "About"},
        {href: "#colombia", label: "Colombia"},
        {href: "#contacto", label: "Contact"},
    ];

    return (
        <div className="relative h-screen w-full bg-transparent text-white">
            {/* NAVBAR sticky (64px de alto aprox) */}
            {/*<nav*/}
            {/*    className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40 border-b border-white/10 h-16">*/}
            {/*    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-full">*/}
            {/*        <div className="flex items-center gap-3">*/}
            {/*            <img src={LOGO_DARK} alt="BHRK Codelabs" className="h-7 w-auto hidden dark:block"*/}
            {/*                 loading="eager" decoding="async"/>*/}
            {/*            <img src={LOGO_LIGHT} alt="BHRK Codelabs" className="h-7 w-auto dark:hidden" loading="eager"*/}
            {/*                 decoding="async"/>*/}
            {/*        </div>*/}
            {/*        <div className="hidden gap-6 md:flex text-sm text-white/80">*/}
            {/*            {navLinks.map((l) => (*/}
            {/*                <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>))}*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center gap-2">*/}
            {/*            <Button size="sm" className="rounded-full hidden md:inline-flex">Agenda tu diagnóstico</Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}

            <Navbar />

            {/* CONTENEDOR DE SECCIONES CON SNAP */}
            <main id="snap-root" className="snap-root no-scrollbar">
                {/* HERO */}
                <section id="hero" data-snap-section className="snap-section">
                    <Hero/>
                </section>

                {/* CAPABILITIES */}
                <section id="capabilities" data-snap-section className="snap-section dark">
                    <div className="mx-auto max-w-6xl px-4 py-28">
                        <CapabilitiesSection/>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" data-snap-section className="snap-section ">
                    <div className="mx-auto max-w-6xl px-4 py-28">
                        <div
                            className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                        <div className="">
                            <div className="mb-12"><h2
                                className="text-3xl md:text-5xl font-semibold tracking-tight">Servicios</h2>
                            </div>
                            <ServicesSection/>
                        </div>
                    </div>
                </section>

                {/* SHOWCASE */}
                <section id="work" data-snap-section className="snap-section">
                    <div className="mx-auto max-w-6xl px-4 py-28">
                        <ShowcaseSection/>
                    </div>
                </section>

                {/* METHODOLOGY */}
                <section id="methodology" data-snap-section className="snap-section">
                    <div className="mx-auto max-w-6xl px-4 py-28">
                        <MethodologySection/>
                    </div>
                </section>

                {/* PRICING */}
                <section id="pricing" data-snap-section className="snap-section">
                    <div className="mx-auto max-w-6xl px-4 py-28">
                        <PricingSection/>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" data-snap-section className="snap-section">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 py-24">
                        {/* ...tu bloque FAQ tal como lo tienes... */}
                    </div>
                </section>

                {/* CTA */}
                <section id="cta" data-snap-section className="snap-section">
                    <div
                        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-emerald-500/20 px-6 py-16 mt-10">
                        {/* ...tu bloque CTA tal como lo tienes... */}
                    </div>
                </section>

                {/* FOOTER */}
                <section id="footer" data-snap-section className="snap-section">
                    <footer className="border-t border-white/10">
                        <div
                            className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:text-left">
                            <p className="text-white/60">© {new Date().getFullYear()} BHRK Codelabs. Todos los derechos
                                reservados.</p>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                                <a href="#" className="hover:text-white">Términos</a>
                                <a href="#" className="hover:text-white">Privacidad</a>
                                <a href="#" className="hover:text-white">Cookies</a>
                            </div>
                        </div>
                    </footer>
                </section>
            </main>

            {/* Controlador (rueda/teclas + dots) */}
            <div className="pointer-events-auto">
                {/* navbarOffset = 64 si tu navbar mide 64px */}
                {/**/}
            </div>
        </div>
    )
}
