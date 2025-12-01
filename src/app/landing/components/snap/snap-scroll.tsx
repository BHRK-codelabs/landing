'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type SnapScrollProps = {
    /** id del contenedor scrolleable; por defecto busca #snap-root */
    containerId?: string
    /** selector de las secciones */
    sectionSelector?: string
    /** altura del navbar sticky para ajustar el scroll-margin */
    navbarOffset?: number
    /** mostrar u ocultar la navegación por puntos */
    showDots?: boolean
}

export default function SnapScroll({
                                       containerId = 'snap-root',
                                       sectionSelector = '[data-snap-section]',
                                       navbarOffset = 64,
                                       showDots = true,
                                   }: SnapScrollProps) {
    const [active, setActive] = useState(0)
    const sectionsRef = useRef<HTMLElement[]>([])
    const containerRef = useRef<HTMLElement | null>(null)
    const lockRef = useRef(false) // evita múltiples jumps por rueda

    const queryDom = useCallback(() => {
        containerRef.current = document.getElementById(containerId) as HTMLElement | null
        sectionsRef.current = Array.from(document.querySelectorAll(sectionSelector)) as HTMLElement[]
        // Garantiza scroll-margin-top apropiado para cada sección (por si cambias altura navbar)
        sectionsRef.current.forEach(s => s.style.scrollMarginTop = `${navbarOffset}px`)
    }, [containerId, sectionSelector, navbarOffset])

    useEffect(() => {
        queryDom()
        const ro = new ResizeObserver(() => queryDom())
        containerRef.current && ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [queryDom])

    // Observa qué sección está en viewport para activar el dot
    useEffect(() => {
        if (!sectionsRef.current.length) return
        const io = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
            if (visible) {
                const idx = sectionsRef.current.findIndex(s => s === visible.target)
                if (idx >= 0) setActive(idx)
            }
        }, { root: containerRef.current || null, threshold: [0.5, 0.75] })
        sectionsRef.current.forEach(s => io.observe(s))
        return () => io.disconnect()
    }, [])

    const scrollToIndex = useCallback((idx: number) => {
        const el = sectionsRef.current[idx]
        if (!el || !containerRef.current) return
        lockRef.current = true
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // libera el lock después de la animación (~550ms)
        setTimeout(() => { lockRef.current = false }, 600)
    }, [])

    // Navegación por rueda (paginada)
    useEffect(() => {
        const cont = containerRef.current
        if (!cont) return
        const onWheel = (e: WheelEvent) => {
            if (lockRef.current) { e.preventDefault(); return }
            const delta = e.deltaY
            if (Math.abs(delta) < 10) return // micro scroll, ignorar
            e.preventDefault()
            if (delta > 0 && active < sectionsRef.current.length - 1) scrollToIndex(active + 1)
            else if (delta < 0 && active > 0) scrollToIndex(active - 1)
        }
        cont.addEventListener('wheel', onWheel, { passive: false })
        return () => cont.removeEventListener('wheel', onWheel as any)
    }, [active, scrollToIndex])

    // Navegación por teclado
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const keysDown = ['ArrowDown','PageDown',' ']
            const keysUp = ['ArrowUp','PageUp']
            if (keysDown.includes(e.key)) { e.preventDefault(); if (active < sectionsRef.current.length - 1) scrollToIndex(active + 1) }
            if (keysUp.includes(e.key))   { e.preventDefault(); if (active > 0) scrollToIndex(active - 1) }
        }
        window.addEventListener('keydown', onKey, { passive: false })
        return () => window.removeEventListener('keydown', onKey as any)
    }, [active, scrollToIndex])

    const dots = useMemo(() => sectionsRef.current.map((_, i) => i), [])

    if (!showDots) return null

    return (
        <div className="snap-dots">
            {dots.map(i => (
                <button
                    key={i}
                    aria-label={`Ir a sección ${i+1}`}
                    onClick={() => scrollToIndex(i)}
                    className={`snap-dot ${active === i ? 'snap-dot--active' : ''}`}
                />
            ))}
        </div>
    )
}
