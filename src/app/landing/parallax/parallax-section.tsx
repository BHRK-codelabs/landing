'use client'

import React from 'react'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'

type Layer = {
    speed?: number
    expanded?: boolean
    children?: React.ReactNode
}

type Props = {
    id?: string
    className?: string
    minH?: string
    backgroundLayers?: Layer[]
    foreground?: React.ReactNode
}

export function ParallaxSection({
                                    id,
                                    className,
                                    minH = 'min-h-[90vh]',
                                    backgroundLayers = [],
                                    foreground,
                                }: Props) {
    return (
        <section id={id} className={`relative overflow-hidden ${minH} ${className ?? ''}`}>
            <ParallaxBanner className="absolute inset-0">
                {backgroundLayers.map((l, i) => (
                    <ParallaxBannerLayer key={i} speed={l.speed ?? 0} expanded={l.expanded ?? true}>
                        {l.children}
                    </ParallaxBannerLayer>
                ))}
            </ParallaxBanner>
            <div className="relative z-10">{foreground}</div>
        </section>
    )
}
