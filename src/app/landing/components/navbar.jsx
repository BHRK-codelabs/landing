'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {clsx} from 'clsx';
import {LOGO_DARK, LOGO_LIGHT} from "@/app/landing/components/logo-imgs";

const navItems = [

    {path: "#work", name: "Work"},
    {path: "#capabilities", name: "Capabilities"},
    {path: "#services", name: "Services"},
    {path: "#methodology", name: "Methodology"},
    {path: "#pricing", name: "Pricing"},
    {path: "#contacto", name: "Contact"},
];

export default function Navbar() {
    // CORRECCIÓN: Quitamos <string | null>
    const [active, setActive] = useState(navItems[0].path);
    const [hovered, setHovered] = useState(null);

    return (
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <ul className="flex items-center gap-2 rounded-full border border-black/10 bg-black/50 p-2 backdrop-blur-lg shadow-2xl">
                <li
                    key='#hero'
                    onMouseEnter={() => setHovered('#hero')}
                    onMouseLeave={() => setHovered(null)}
                    className="relative"
                >
                    <Link
                        href='#hero'
                        onClick={() => setActive('#hero')}
                        className={clsx(
                            "relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200",
                            active !== '#hero' || hovered === '#hero'
                                ? "text-white"
                                : "text-gray-400"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <img src={LOGO_DARK} alt="BHRK Codelabs" className="h-7 w-auto hidden dark:block"
                                 loading="eager" decoding="async"/>
                            <img src={LOGO_LIGHT} alt="BHRK Codelabs" className="h-7 w-auto dark:hidden" loading="eager"
                                 decoding="async"/>
                        </div>
                    </Link>
                </li>
                {navItems.map((item) => (
                    <li
                        key={item.path}
                        onMouseEnter={() => setHovered(item.path)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative"
                    >
                        <Link
                            href={item.path}
                            onClick={() => setActive(item.path)}
                            className={clsx(
                                "relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200",
                                active === item.path || hovered === item.path
                                    ? "text-white"
                                    : "text-gray-400"
                            )}
                        >
                            {item.name}

                            {/* Fondo animado al hacer Hover */}
                            {hovered === item.path && (
                                <motion.div
                                    layoutId="nav-background"
                                    transition={{type: "spring", bounce: 0.2, duration: 0.6}}
                                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                                />
                            )}

                            {/* Fondo animado para el item Activo */}
                            {active === item.path && !hovered && (
                                <motion.div
                                    layoutId="nav-background"
                                    transition={{type: "spring", bounce: 0.2, duration: 0.6}}
                                    className="absolute inset-0 -z-10 rounded-full bg-teal-400"
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}