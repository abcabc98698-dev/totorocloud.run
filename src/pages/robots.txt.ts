import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL("/sitemap.xml", site).href;
  const sitemapIndexUrl = new URL("/sitemap-index.xml", site).href;
  const host = new URL(site!).host;

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: bingbot",
    "Allow: /",
    "",
    "User-agent: Baiduspider",
    "Allow: /",
    "",
    "User-agent: yisouspider",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl}`,
    `Sitemap: ${sitemapIndexUrl}`,
    `Host: ${host}`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
