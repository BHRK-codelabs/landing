# Sistema visual, objetos de marca y motion

## 1. Dirección de arte
**technical editorial minimalism + premium motion + brand objects**

- minimalismo técnico con jerarquía editorial fuerte
- motion elegante y de buen rendimiento
- profundidad por capas
- objetos abstractos de marca como único recurso visual
- cero fotos de stock ni renders genéricos

---

## 2. Design tokens

### Colores

```css
/* Fondos */
--color-bg-base:      #0D0D0F;   /* grafito profundo — base de todo */
--color-bg-surface:   #111113;   /* sección alternada */
--color-bg-card:      #18181B;   /* superficie de card */
--color-bg-card-alt:  #1C1C1F;   /* card hover / estado activo */

/* Bordes */
--color-border:       #2A2A2E;   /* borde estándar de card */
--color-border-subtle:#1E1E22;   /* borde muy sutil */

/* Texto */
--color-text-primary: #F4F4F5;   /* blanco cálido — titulares y cuerpo principal */
--color-text-secondary:#A1A1AA;  /* gris editorial — descripción, metadata */
--color-text-muted:   #71717A;   /* gris apagado — labels, captions */

/* Acentos */
--color-accent-cyan:  #00D4FF;   /* acento principal — CTAs, links, highlights */
--color-accent-violet:#7C3AED;   /* acento secundario — elementos de énfasis */
--color-accent-coral: #FF6B6B;   /* acento terciario — usar con mucho criterio */

/* Gradientes de marca */
--gradient-radial-cyan:   radial-gradient(ellipse at 60% 0%, #00D4FF15 0%, transparent 65%);
--gradient-radial-violet: radial-gradient(ellipse at 20% 100%, #7C3AED12 0%, transparent 60%);
--gradient-accent-line:   linear-gradient(90deg, #00D4FF, #7C3AED);
```

### Tipografía

```css
/* Familias */
--font-display: 'Nexa', sans-serif;      /* titulares y display */
--font-body:    'Inter', sans-serif;     /* cuerpo, UI, labels */
--font-mono:    'IBM Plex Mono', monospace; /* código, tags técnicos */

/* Escala fluid (usar clamp en Tailwind o CSS directo) */
--text-5xl: clamp(3rem,    5vw + 1rem, 6rem);    /* hero H1 */
--text-4xl: clamp(2.25rem, 3.5vw + 1rem, 4rem);  /* section headline */
--text-3xl: clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem);
--text-xl:  clamp(1.125rem, 1.5vw + 0.25rem, 1.375rem);
--text-base: 1rem;                               /* 16px — mínimo de cuerpo */
--text-sm:   0.875rem;
--text-xs:   0.75rem;

/* Pesos */
--font-light:   300;  /* subtítulos secundarios */
--font-regular: 400;  /* cuerpo */
--font-medium:  500;  /* labels, navegación */
--font-semibold:600;  /* subtítulos de sección */
--font-bold:    700;  /* headlines */
--font-black:   900;  /* hero H1 — Nexa Black */

/* Interlineado */
--leading-tight:   1.15;  /* titulares grandes */
--leading-snug:    1.35;  /* subtítulos */
--leading-normal:  1.6;   /* cuerpo */
--leading-relaxed: 1.75;  /* texto largo */
```

### Espaciado base (8pt grid)

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Bordes y radios

```css
--radius-sm:  4px;
--radius-md:  8px;
--radius-lg:  12px;
--radius-xl:  16px;
--radius-full: 9999px;

--border-width: 1px;
--border-style: solid;
```

### Sombras / glow

```css
--shadow-card:      0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
--shadow-card-hover:0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px #2A2A2E;
--glow-cyan:        0 0 20px rgba(0, 212, 255, 0.15);
--glow-violet:      0 0 20px rgba(124, 58, 237, 0.15);
```

---

## 3. Objetos de marca

Construir el sitio visualmente con estos elementos abstractos derivados de la marca. Nunca decoración arbitraria — deben crear profundidad y guiar la vista.

- **Anillos / rings** — círculos concéntricos con opacidad baja
- **Líneas orbitales** — curvas SVG suaves alrededor de elementos clave
- **Nodos y redes** — puntos conectados por líneas finas, muy baja opacidad
- **Líneas de flujo** — trayectorias suaves tipo bezier
- **Grids suaves** — malla puntillada o de líneas muy sutiles como fondo
- **Orbes difusos** — círculos con `blur(80px)` como ambient light
- **Formas geométricas del logo** — derivadas del símbolo BH, como cuts y ángulos
- **Partículas mínimas** — puntos estáticos o con drift muy lento

---

## 4. Motion y parallax

### Reglas
- el contenido manda; la animación acompaña
- nunca animar más de 3 capas simultáneamente
- `prefers-reduced-motion` obligatorio (usar `useReducedMotion()` de Framer Motion)
- performance: preferir `transform` y `opacity`, nunca animar `top/left/width/height`

### Motion permitido
| Tipo | Descripción |
|---|---|
| Reveal on scroll | `opacity: 0→1` + `y: 20→0`, `duration: 0.6s`, `ease: easeOut` |
| Stagger children | `staggerChildren: 0.08s` para listas y grids |
| Floating sutil | `y: 0↔6` loop, `duration: 4s`, objetos de fondo |
| Orbital drift | rotación lenta de rings, `duration: 20–40s`, loop infinito |
| Pointer response | `x/y` leve siguiendo el cursor, máx. `±8px`, solo desktop |
| Glow breathing | `opacity: 0.6↔1` loop en orbes de fondo, `duration: 3s` |
| Hero line-reveal | SplitText stagger línea a línea, `duration: 0.7s` |
| Texto cíclico | `AnimatePresence` exit/enter para ciclar servicios en hero |
| Card hover lift | `y: -4` on `whileHover`, `duration: 0.2s` |

### Motion a evitar
- giros exagerados o flips
- más de 3 capas animadas a la vez
- blur animado intenso (afecta performance en móvil)
- efectos "showreel" o teatrales
- entrada sin salida (siempre balancear enter/exit)

---

## 5. Qué debe sentirse la interfaz

**Sí:** premium · sobria · técnica · refinada · intencional · con personalidad

**No:** cyberpunk exagerado · template SaaS genérico · landing de Framer inflada · showcase de animaciones sin fondo

---

## 6. Recomendación técnica

```tsx
// Patrón estándar de reveal (usar en casi todos los bloques)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Stagger para listas
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}

// prefers-reduced-motion
const { prefersReducedMotion } = useReducedMotion()
const variants = prefersReducedMotion ? {} : fadeUp
```

---

## 7. Performance

Toda propuesta visual debe:
- usar solo `transform` y `opacity` (nunca layout properties)
- mantener CLS mínimo (reservar espacio antes de animar)
- funcionar bien en mobile first
- respetar `prefers-reduced-motion`
- evitar imágenes pesadas en el critical path
