import {Button} from "@/components/ui/button";
import {ArrowRight, PlayCircle} from "lucide-react";
import React from "react";
import {LOGO_DARK, LOGO_LIGHT} from "@/app/landing/components/logo-imgs";
import {Section} from "@/app/landing/components/section";

function Hero (){
    return (
        <Section id="hero" className="min-h-[70vh] overflow-hidden">
            <div className={"gradient-bg"}>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                            <feColorMatrix in="blur" mode="matrix"
                                           values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                           result="goo"/>
                            <feBlend in="SourceGraphic" in2="goo"/>
                        </filter>
                    </defs>
                </svg>
                <div className="gradients-container absolute inset-0">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div className="interactive"></div>
                </div>
                <div
                    className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                    <div className="mx-auto mb-11 py-5">
                        <img src={LOGO_DARK} alt="BHRK Codelabs" className="h-45 w-auto hidden dark:block" style={{ filter: "invert(1) opacity(0.7)" }}
                             loading="eager"
                             decoding="async"/>
                        <img src={LOGO_LIGHT} alt="BHRK Codelabs" className="h-45 w-auto dark:hidden"  style={{ filter: "invert(1) opacity(0.7)" }}
                             loading="eager"
                             decoding="async"/>
                    </div>

                    <span
                        className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">
                    </span>

                    <h1 className="text-4xl md:text-4xl font-geist-mono tracking-dark text-black">
                        No somos una fábrica de software.
                        Somos un laboratorio donde la ingeniería se convierte en arte,
                        y el diseño, en un lenguaje que  <span
                        className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">transforma empresas y personas, inspiran, venden y escalan.

                    </span>
                        <span className={"blinking-text"}>_</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-black">
                        No somos una fábrica de software.
                        Somos un laboratorio donde la ingeniería se convierte en arte,
                        y el diseño, en un lenguaje que transforma empresas y personas.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button size="lg" className="group">
                            Empezar Proyecto
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                        </Button>
                        <Button size="lg" variant="secondary">
                            <PlayCircle className="mr-2 h-4 w-4"/> Ver Portfolio
                        </Button>
                    </div>

                </div>
            </div>
        </Section>
    )
}

export { Hero }