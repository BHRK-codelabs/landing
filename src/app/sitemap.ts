import type { MetadataRoute } from "next";

const BASE_URL = "https://bhrkcodelabs.io";

const PRODUCT_SLUGS = [
  "pos",
  "facturacion-electronica",
  "crm",
  "erp",
  "chatbots-especializados",
];

const PRIORITY_MAP: Record<string, number> = {
  "": 1.0,
  "/servicios": 0.9,
  "/metodologia": 0.8,
  "/sobre-nosotros": 0.8,
  "/contacto": 0.8,
  "/productos": 0.7,
  "/politica-de-privacidad": 0.3,
  "/terminos-y-condiciones": 0.3,
  "/cookies": 0.3,
};

const CHANGE_FREQ_MAP: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "": "weekly",
  "/servicios": "monthly",
  "/metodologia": "monthly",
  "/sobre-nosotros": "monthly",
  "/contacto": "monthly",
  "/productos": "monthly",
  "/politica-de-privacidad": "yearly",
  "/terminos-y-condiciones": "yearly",
  "/cookies": "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.keys(PRIORITY_MAP).map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: CHANGE_FREQ_MAP[route] ?? "monthly",
    priority: PRIORITY_MAP[route] ?? 0.5,
    lastModified: new Date(),
  }));

  const productRoutes = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/productos/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
