import {Section} from "@/app/landing/components/section";
import {Rocket, ShieldCheck, Sparkles} from "lucide-react";
import React from "react";
import {FeatureCard} from "@/app/landing/components/feature-card";


function CapabilitiesSection() {
    return (

        <Section id="capabilities" className="py-28" >
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Capabilities</h2>
                <p className="mt-3 max-w-2xl text-white/70">From concept to launch.
                    Strategy, design and engineering aligned to outcomes.</p>
                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <FeatureCard icon={Rocket} title="Estrategia Digital"
                                 desc="Convertimos ideas en estrategias con propósito."/>
                    <FeatureCard icon={Sparkles} title="Diseño de Experiencias"
                                 desc="Creamos interfaces que emocionan."/>
                    <FeatureCard icon={ShieldCheck} title="Ingeniería Escalable"
                                 desc="Accessibility AA, Lighthouse 90+, edge caching and analytics."/>
                </div>
            </div>
        </Section>
    );
}

export {CapabilitiesSection};