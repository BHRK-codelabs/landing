import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bhrkcodelabs.com";
  const routes = [
    "",
    "/servicios",
    "/productos",
    "/metodologia",
    "/sobre-nosotros",
    "/contacto",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
    lastModified: new Date(),
  }));
}
