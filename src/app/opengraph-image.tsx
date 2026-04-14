import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BHRK Codelabs — Consultoría, ingeniería y diseño";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid de fondo sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow superior izquierdo */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Glow inferior derecho */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217,225,32,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Bloque superior: eyebrow + logo */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00D4FF",
              boxShadow: "0 0 16px rgba(0,212,255,0.9)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#00D4FF",
            }}
          >
            ESTUDIO TÉCNICO-CREATIVO
          </span>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            BHRK
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#00D4FF",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginLeft: 18,
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "rgba(255,255,255,0.72)",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              marginLeft: 18,
              alignSelf: "center",
            }}
          >
            Codelabs
          </span>
        </div>
      </div>

      {/* Bloque inferior: tagline + URL */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Línea separadora */}
        <div
          style={{
            width: 320,
            height: 1,
            background:
              "linear-gradient(90deg, #00D4FF 0%, rgba(0,212,255,0.1) 100%)",
          }}
        />

        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.35,
            margin: 0,
            fontWeight: 500,
            maxWidth: 680,
          }}
        >
          Consultoría tecnológica, desarrollo a medida, automatización e
          integraciones.
        </p>

        {/* Servicios pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            "Consultoría",
            "Desarrollo",
            "Automatización",
            "Chatbots",
            "Staff Aug",
          ].map((label) => (
            <div
              key={label}
              style={{
                padding: "6px 16px",
                borderRadius: 99,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.55)",
                fontSize: 13,
                letterSpacing: "0.08em",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 15,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.28)",
            textTransform: "uppercase",
          }}
        >
          bhrkcodelabs.io
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
