import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChangelogKind = "feature" | "improvement" | "fix" | "release";

export type ChangelogEntry = {
  slug: string;
  title: string;
  date: string;
  kind: ChangelogKind;
  summary: string;
  content: string;
};

const DIR = path.join(process.cwd(), "content", "changelog");

export function getChangelog(): ChangelogEntry[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));

  const entries: ChangelogEntry[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
    const { data, content } = matter(raw);
    if (!data?.title || !data?.date) continue;

    entries.push({
      slug,
      title: String(data.title),
      date: String(data.date),
      kind: (data.kind as ChangelogKind) ?? "release",
      summary: String(data.summary ?? ""),
      content,
    });
  }

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}
