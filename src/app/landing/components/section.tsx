import React, {JSX} from "react";

interface SectionProps {
    id: string,
    children: JSX.Element,
    className?: string,
    style?: any
}

const Section = ({id, children, className = "", style = {}}: SectionProps) => (
    <section id={id} className={`relative w-full ${className}`} style={style}>
        {children}
    </section>
);

export {Section};