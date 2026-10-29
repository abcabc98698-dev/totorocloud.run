// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, readFileSync } from "node:fs";
import { loadEnv } from "vite";
import { AIRPORT_BRANDS } from "./src/data/brands.ts";

const { SITE_URL = "https://totorocloud.run" } = loadEnv(
  process.env.NODE_ENV ?? "production",
  process.cwd(),
  "SITE_URL",
);
const site = new URL(SITE_URL);
if (
  !["http:", "https:"].includes(site.protocol) ||
  site.pathname !== "/" ||
  site.search ||
  site.hash ||
  site.username ||
  site.password
) {
  throw new Error(
    "SITE_URL must be an HTTP(S) origin, such as https://example.com, without a path, credentials, query, or fragment.",
  );
}

// Last modification date of each post URL, read from its frontmatter, so the
// sitemap can tell search engines which pages changed.
/** @type {Map<string, Date>} */
const lastModified = new Map();
for (const lang of ["zh", "en", "es"]) {
  const dir = `./src/content/posts/${lang}`;
  try {
    for (const file of readdirSync(dir).filter((name) =>
      name.endsWith(".md"),
    )) {
      const frontmatter = readFileSync(`${dir}/${file}`, "utf8").split(
        "---",
      )[1];
      if (/^draft:\s*true/m.test(frontmatter)) continue;
      const date =
        /^updated:\s*(\S+)/m.exec(frontmatter)?.[1] ??
        /^date:\s*(\S+)/m.exec(frontmatter)?.[1];
      if (!date) continue;
      const prefix = lang === "zh" ? "" : `/${lang}`;
      lastModified.set(
        `${prefix}/posts/${file.replace(/\.md$/, "")}/`,
        new Date(date),
      );
    }
  } catch {}
}
/** Newest post date for default or language listings. */
const newest = (/** @type {string} */ prefix) =>
  [...lastModified]
    .filter(([path]) =>
      prefix
        ? path.startsWith(prefix)
        : !path.startsWith("/en/") && !path.startsWith("/es/"),
    )
    .map(([, date]) => date)
    .sort((a, b) => b.valueOf() - a.valueOf())[0];

// Dynamic redirects for all historical/variant airport review slugs to eliminate 404s
const zhPostFiles = readdirSync("./src/content/posts/zh").filter((name) =>
  name.endsWith(".md"),
);
const legacyPatterns = [
  "flagship-review",
  "airport-review",
  "speedtest-evaluation",
  "iepl-deepdive",
  "buyers-guide",
  "network-audit",
  "review-audit",
  "speedtest-telemetry",
  "infrastructure-audit",
  "ai-productivity-audit",
  "4k-streaming-audit",
  "budget-value-guide",
  "ecommerce-sla-audit",
  "advanced-configuration-guide",
  "review",
];

/** @type {Record<string, string>} */
const redirects = {};
for (const b of AIRPORT_BRANDS) {
  const canonicalFile = zhPostFiles.find((f) => f.startsWith(`${b.slug}-`));
  if (canonicalFile) {
    const canonicalSlug = canonicalFile.replace(/\.md$/, "");
    const dest = `/posts/${canonicalSlug}/`;
    redirects[`/posts/${b.slug}`] = dest;
    for (const p of legacyPatterns) {
      const from = `${b.slug}-${p}`;
      if (from !== canonicalSlug) {
        redirects[`/posts/${from}`] = dest;
      }
    }
  }
}

// https://astro.build/config
export default defineConfig({
  site: site.href,
  output: "static",
  trailingSlash: "always",
  redirects,
  // Preserve the spacing between inline elements when migrating from Astro 5.
  compressHTML: true,
  // Inline the small stylesheet to avoid a render-blocking request.
  build: { inlineStylesheets: "always" },
  // Fetch pages on hover so navigation feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  // Prerender prefetched pages with the Speculation Rules API where supported.
  experimental: { clientPrerender: true },
  integrations: [
    vue(),
    sitemap({
      // Link each page to its translation for search engines.
      i18n: {
        defaultLocale: "zh",
        locales: { zh: "zh-CN", en: "en-US", es: "es-ES" },
      },
      filter: (page) =>
        !["/404/", "/404.html"].includes(new URL(page).pathname),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const listing = /^\/(es\/)?(posts\/)?$/.exec(path);
        const date = listing
          ? newest(listing[1] ? "/es/" : "")
          : lastModified.get(path);
        return date ? { ...item, lastmod: date.toISOString() } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
