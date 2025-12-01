'use client'

import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'

type Ctx = { scrollY: number; viewportH: number; reduced: boolean }
const ParallaxCtx = createContext<Ctx>({ scrollY: 0, viewportH: 1, reduced: false })

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
    const [scrollY, setScrollY] = useState(0)
    const [viewportH, setViewportH] = useState(1)
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    useEffect(() => {
        let raf = 0
        const onScroll = () => {
            if (raf) return
            raf = requestAnimationFrame(() => {
                setScrollY(window.scrollY || window.pageYOffset)
                raf = 0
            })
        }
        const onResize = () => setViewportH(window.innerHeight || 1)
        onResize()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
    }, [])

    const value = useMemo(() => ({ scrollY, viewportH, reduced }), [scrollY, viewportH, reduced])
    return <ParallaxCtx.Provider value={value}>{children}</ParallaxCtx.Provider>
}

export function useParallaxContext() {
    return useContext(ParallaxCtx)
}

type LayerProps = {
    /** velocidad relativa: positiva sube más lento, negativa efecto contrario */
    speed?: number
    /** translateY máximo en px para limitar el movimiento */
    clamp?: number
    /** opcional: opacidad vinculada al progreso de la sección [0..1] */
    fadeInAt?: number
    fadeOutAt?: number
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

export function ParallaxLayer({ speed = 0.2, clamp = 160, fadeInAt, fadeOutAt, className, style, children }: LayerProps) {
    const { scrollY, viewportH, reduced } = useParallaxContext()
    const ref = useRef<HTMLDivElement | null>(null)
    const [active, setActive] = useState(true)
    const [sectionTop, setSectionTop] = useState(0)
    const [sectionH, setSectionH] = useState(1)

    // Observa visibilidad para no recalcular fuera de viewport
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const root = el.closest('[data-parallax-section]') as HTMLElement | null
        if (!root) return
        const r = root.getBoundingClientRect()
        setSectionTop((window.scrollY || 0) + r.top)
        setSectionH(r.height || 1)

        const io = new IntersectionObserver(
            (entries) => { setActive(entries[0]?.isIntersecting ?? true) },
            { root: null, threshold: 0 }
        )
        io.observe(root)
        return () => io.disconnect()
    }, [])

    let transform = undefined
    let opacity = undefined

    if (!reduced && active) {
        const center = sectionTop - viewportH / 2
        const delta = (scrollY - center) * speed
        const y = Math.max(Math.min(delta, clamp), -clamp)
        transform = `translate3d(0, ${-y}px, 0)`

        if (fadeInAt !== undefined || fadeOutAt !== undefined) {
            const prog = Math.min(1, Math.max(0, (scrollY - (sectionTop - viewportH)) / (sectionH + viewportH)))
            const fi = fadeInAt ?? 0
            const fo = fadeOutAt ?? 1
            // opacidad: 0→1 entre fi y (fo - 0.2), y 1→0 entre (fo - 0.2) y fo
            if (prog <= fi) opacity = 0
            else if (prog >= fo) opacity = 0
            else if (prog < Math.max(fi + 0.2, fi)) opacity = (prog - fi) / Math.max(0.2, (0.2))
            else if (prog > fo - 0.2) opacity = Math.max(0, (fo - prog) / 0.2)
            else opacity = 1
        }
    }

    return (
        <div
            ref={ref}
            className={`parallax-layer pointer-events-none will-change-transform ${className ?? ''}`}
            style={{ transform, opacity, ...style }}
            aria-hidden
        >
            {children}
        </div>
    )
}

type SectionProps = {
    id?: string
    className?: string
    children: React.ReactNode
    /** altura mínima de la sección */
    minH?: string
    /** fondo opcional */
    background?: React.ReactNode
}

export function ParallaxSection({ id, className, children, minH = 'min-h-[90vh]', background }: SectionProps) {
    return (
        <section id={id} data-parallax-section className={`parallax-section relative ${minH} overflow-hidden ${className ?? ''}`}>
            {/* fondo */}
            {background}
            {/* contenido */}
            <div className="relative z-10">{children}</div>
        </section>
    )
}
