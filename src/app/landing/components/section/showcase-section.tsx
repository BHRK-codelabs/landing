import {Badge} from "@/components/ui/badge";
import {Section} from "@/app/landing/components/section";
import React from "react";


function ShowcaseSection() {
    return (
        <Section id="work" className="py-24">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10">
                    <Badge className="bg-white/10 text-white">Proyectos</Badge>
                    <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Selected work</h2>
                    <p className="mt-2 max-w-2xl text-white/70">Efecto parallax en todas las secciones con capas y
                        desplazamiento diferencial.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="group relative overflow-hidden rounded-3xl border border-white/10">
                            <img
                                src={`https://picsum.photos/seed/parallax${n}/1200/900`}
                                alt={`Proyecto ${n}`}
                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <Badge className="bg-violet-600/90">Landing</Badge>
                                <Badge className="bg-emerald-500/90 text-black">Parallax</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export {ShowcaseSection};