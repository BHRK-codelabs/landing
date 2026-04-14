import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0b",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Glow de fondo */}
      <div
        style={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.28) 0%, transparent 70%)",
        }}
      />

      {/* Letras BH en bloque */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          BH
        </span>
        {/* Línea divisora cyan */}
        <div
          style={{
            width: 48,
            height: 2,
            background: "#00D4FF",
            borderRadius: 2,
            margin: "4px 0",
            boxShadow: "0 0 12px rgba(0,212,255,0.8)",
          }}
        />
        <span
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#00D4FF",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          RK
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
