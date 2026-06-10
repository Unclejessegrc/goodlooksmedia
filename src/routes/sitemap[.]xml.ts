import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SHOW_PORTFOLIO } from "@/config/features";
import { absoluteUrl } from "@/data/seo";

const LASTMOD = "2026-06-10";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/business-video", changefreq: "weekly", priority: "0.95" },
          { path: "/real-estate-media", changefreq: "weekly", priority: "0.95" },
          { path: "/weddings", changefreq: "weekly", priority: "0.9" },
          { path: "/packages", changefreq: "weekly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.95" },
          { path: "/music-videos", changefreq: "monthly", priority: "0.8" },
          { path: "/editing", changefreq: "monthly", priority: "0.6" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          ...(SHOW_PORTFOLIO
            ? [{ path: "/work", changefreq: "monthly" as const, priority: "0.7" }]
            : []),
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${absoluteUrl(e.path)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
