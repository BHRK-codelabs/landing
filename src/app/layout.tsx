import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Body / UI text — Inter Variable, pesos controlados
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display / titulares — Plus Jakarta Sans (geométrica, premium, dark-mode friendly)
const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

// Mono / etiquetas — IBM Plex Mono
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhrkcodelabs.io"),
  title: {
    default: "BHRK Codelabs | Consultoría y desarrollo de software",
    template: "%s | BHRK Codelabs",
  },
  description:
    "Consultoría tecnológica, desarrollo a medida, automatización e integraciones para empresas que necesitan operar con más claridad y control.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BHRK Codelabs | Consultoría y desarrollo de software",
    description:
      "Consultoría tecnológica, desarrollo a medida, automatización e integraciones para empresas que necesitan operar con más claridad y control.",
    url: "https://bhrkcodelabs.io",
    siteName: "BHRK Codelabs",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BHRK Codelabs | Consultoría y desarrollo de software",
    description:
      "Consultoría tecnológica, desarrollo a medida, automatización e integraciones para empresas que necesitan operar con más claridad y control.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${jakartaSans.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
