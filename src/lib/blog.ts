import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { BlogPost, BlogPostMeta } from "./blog-types";

export type { BlogFrontmatter, BlogPost, BlogPostMeta } from "./blog-types";
export { COVERS, formatPostDate } from "./blog-types";

/**
 * File-based MDX blog. Posts live at `content/blog/<slug>.mdx` (canonical -
 * Russian). Per-locale overrides at `content/blog/<slug>.<locale>.mdx`.
 *
 * When a locale override is missing, we fall back to the canonical file
 * and mark the post as `translated: false` so the detail page can warn.
 *
 * Uses `node:fs` - do NOT import from client components. Client components
 * should import from `@/lib/blog-types` instead.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const CANONICAL_LOCALE = "ru";

function ensureDir() {
  return fs.existsSync(BLOG_DIR);
}

/** Strip `.en` / `.kz` suffix and `.mdx` to get the canonical slug. */
function slugFromFilename(file: string): string {
  return file.replace(/\.(en|kz)\.mdx$/, "").replace(/\.mdx$/, "");
}

/** Canonical (ru) files - any `.mdx` without a `.{locale}.mdx` suffix. */
function listCanonicalFiles(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") && !/\.(en|kz)\.mdx$/.test(f));
}

/** Returns the best-fit MDX path for this slug+locale, plus whether we
 *  actually found a locale-specific file. */
function resolveMdxPath(slug: string, locale: string): { file: string; translated: boolean } | null {
  if (!ensureDir()) return null;
  if (locale !== CANONICAL_LOCALE) {
    const localised = path.join(BLOG_DIR, `${slug}.${locale}.mdx`);
    if (fs.existsSync(localised)) return { file: localised, translated: true };
  }
  const canonical = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(canonical)) {
    return { file: canonical, translated: locale === CANONICAL_LOCALE };
  }
  return null;
}

export function getAllPosts(locale: string = CANONICAL_LOCALE): BlogPostMeta[] {
  const files = listCanonicalFiles();
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const slug = slugFromFilename(file);
    const resolved = resolveMdxPath(slug, locale);
    if (!resolved) continue;

    const raw = fs.readFileSync(resolved.file, "utf-8");
    const { data } = matter(raw);
    if (!data || !data.title) continue;
    if (data.draft) continue;

    posts.push({
      slug,
      title: data.title as string,
      excerpt: (data.excerpt as string) ?? "",
      category: (data.category as string) ?? "General",
      date: (data.date as string) ?? new Date().toISOString().slice(0, 10),
      readMin: (data.readMin as number) ?? 5,
      author: (data.author as string) ?? "BAI Core",
      cover: (data.cover as string) ?? "default",
      coverImage: data.coverImage as string | undefined,
      tags: (data.tags as string[]) ?? [],
      translated: resolved.translated,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(
  slug: string,
  locale: string = CANONICAL_LOCALE,
): BlogPost | null {
  const resolved = resolveMdxPath(slug, locale);
  if (!resolved) return null;

  const raw = fs.readFileSync(resolved.file, "utf-8");
  const { data, content } = matter(raw);
  if (!data || !data.title) return null;
  if (data.draft) return null;

  return {
    slug,
    content,
    title: data.title as string,
    excerpt: (data.excerpt as string) ?? "",
    category: (data.category as string) ?? "General",
    date: (data.date as string) ?? new Date().toISOString().slice(0, 10),
    readMin: (data.readMin as number) ?? 5,
    author: (data.author as string) ?? "BAI Core",
    cover: (data.cover as string) ?? "default",
    coverImage: data.coverImage as string | undefined,
    tags: (data.tags as string[]) ?? [],
    translated: resolved.translated,
  };
}

export function getCategories(
  locale: string = CANONICAL_LOCALE,
): { name: string; count: number }[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
  locale: string = CANONICAL_LOCALE,
): BlogPostMeta[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}
