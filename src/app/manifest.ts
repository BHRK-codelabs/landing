import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BHRK Codelabs",
    short_name: "BHRK",
    description:
      "Consultoría tecnológica, desarrollo a medida, automatización e integraciones.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#00D4FF",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/brand/bhrk-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/bhrk-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
