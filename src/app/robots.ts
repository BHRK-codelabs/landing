import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowInternalPaths = [
    "/api/",
    "/admin/",
    "/dashboard/",
    "/private/",
    "/cdn-cgi/",
    "/_next/webpack-hmr",
  ];

  return {
    rules: [
      {
        // Googlebot: indexacion completa sin acceso a rutas internas
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowInternalPaths,
      },
      {
        // Bingbot
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowInternalPaths,
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
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: disallowInternalPaths,
      },
    ],
    sitemap: "https://bhrkcodelabs.io/sitemap.xml",
    host: "https://bhrkcodelabs.io",
  };
}
