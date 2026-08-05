import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services-data";
import { routing } from "@/i18n/routing";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  ...SERVICES.map((s) => `/services/${s.id}`),
  "/how-we-work",
  "/cases",
  "/projects",
  "/projects/tendercrm",
  "/blog",
  "/contacts",
  "/privacy",
  "/terms",
  "/cookies",
];

function urlFor(locale: string, path: string) {
  const base = siteConfig.url;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${base}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_ROUTES) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      const langTag = l === "ru" ? "ru-KZ" : l === "kz" ? "kk-KZ" : "en";
      languages[langTag] = urlFor(l, path);
    }
    entries.push({
      url: urlFor(routing.defaultLocale, path),
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages },
    });
  }

  // Blog posts - one entry per post with hreflang alternates pointing at
  // every locale. Google uses these to serve the right translation to each
  // visitor instead of treating translations as duplicate content.
  const posts = getAllPosts();
  for (const p of posts) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      const langTag = l === "ru" ? "ru-KZ" : l === "kz" ? "kk-KZ" : "en";
      languages[langTag] = urlFor(l, `/blog/${p.slug}`);
    }
    entries.push({
      url: urlFor(routing.defaultLocale, `/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages },
    });
  }

  return entries;
}
