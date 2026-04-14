import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot: acceso completo con crawl delay ligero
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/cdn-cgi/"],
      },
      {
        // Bingbot
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/cdn-cgi/"],
      },
      {
        // Bots de redes sociales para previews
        userAgent: [
          "Twitterbot",
          "facebookexternalhit",
          "LinkedInBot",
          "WhatsApp",
        ],
        allow: "/",
      },
      {
        // Scrapers de IA conocidos — bloqueados
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Google-Extended",
          "PerplexityBot",
          "Applebot-Extended",
          "Bytespider",
          "YouBot",
        ],
        disallow: "/",
      },
      {
        // Resto de crawlers: acceso general, sin rutas internas
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/cdn-cgi/"],
      },
    ],
    sitemap: "https://bhrkcodelabs.io/sitemap.xml",
    host: "https://bhrkcodelabs.io",
  };
}
