# BHRK Codelabs · Context Pack para Claude

Este paquete da a Claude el contexto necesario para trabajar en la web de BHRK sin improvisar ni rellenar huecos con supuestos.

## Qué debe entender Claude
- **BHRK Codelabs** es la única marca pública del sitio.
- **ARVN** existe como holding/base legal, pero **no es la marca de la web**.
- **NVAX** e **IAAA** **no deben aparecer** en el sitio.
- No hay pricing. No hay productos listos para vender hoy.
- La web transmite credibilidad, explica servicios reales, apoya verificación Meta, mejora SEO y mantiene una estética premium — sin stock photos.

## Contenido del pack

| Archivo | Propósito |
|---|---|
| `01_BUSINESS_CONTEXT.md` | Situación real del negocio, servicios y restricciones |
| `02_BRAND_AND_POSITIONING.md` | Posicionamiento, cultura, tono y límites de narrativa |
| `03_WEBSITE_OBJECTIVES_AND_CONSTRAINTS.md` | Objetivos y restricciones duras del sitio |
| `04_INFORMATION_ARCHITECTURE_AND_COPY_GUIDANCE.md` | Estructura y guía de copy |
| `05_VISUAL_SYSTEM_AND_MOTION.md` | Design tokens, paleta, tipografía, objetos de marca, motion |
| `06_SEO_AND_TRUST_REQUIREMENTS.md` | SEO, schema, señales de confianza |
| `07_CLAUDE_MASTER_PROMPT.md` | Rol y formato de respuesta esperado |
| `08_TECH_STACK.md` | Stack técnico, convenciones y referencias visuales aprobadas |
| `09_CODEX_PROMPT.md` | Prompt maestro para Codex / OpenAI — rol, tokens, patrones de código |

## Cómo cargar el contexto

**Opción A — Automático (recomendada):**
Claude carga `CLAUDE.md` de la raíz del proyecto automáticamente. Contiene un resumen ejecutivo de todo. Para la mayoría de tareas alcanza.

**Opción B — Tarea específica:**
Carga `CLAUDE.md` + solo el doc relevante a la tarea:
- Trabajando copy → `04`
- Trabajando diseño / CSS → `05`
- Trabajando SEO → `06`
- Implementando código → `08`

**Opción C — Sesión de diseño completa:**
Pega `01` → `06` en orden, luego `07`. Usa esta opción solo cuando necesites una propuesta completa desde cero.

## Regla crítica
Si Claude detecta contradicciones entre ideas antiguas y el estado actual del negocio, prioriza:
1. realidad actual
2. credibilidad
3. claridad comercial
4. utilidad para Meta
5. utilidad para SEO
6. consistencia de marca
