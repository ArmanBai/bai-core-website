export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMin: number;
  author?: string;
  cover?: string;
  /** Path to a real cover photo under `/public` (e.g. `/blog/xyz.jpg`).
   *  When set, overrides the gradient cover in cards and hero. */
  coverImage?: string;
  tags?: string[];
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  /** False if the page requested a locale translation we don't have yet,
   *  and we fell back to the canonical (Russian) body. Used by the detail
   *  page to show a "translation coming" banner. */
  translated?: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export const COVERS: Record<string, string> = {
  "indigo-cyan": "from-indigo-500/40 via-cyan-500/30 to-transparent",
  "violet-fuchsia": "from-violet-500/40 via-fuchsia-500/30 to-transparent",
  "emerald-cyan": "from-emerald-500/40 via-cyan-500/30 to-transparent",
  "amber-orange": "from-amber-500/40 via-orange-500/30 to-transparent",
  "cyan-indigo": "from-cyan-500/40 via-indigo-500/30 to-transparent",
  default: "from-indigo-500/40 via-violet-500/30 to-transparent",
};

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}
