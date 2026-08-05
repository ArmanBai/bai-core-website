/**
 * Careers config - structural only. Copy (title, location, salary, summary,
 * responsibilities, requirements, nice) lives in messages/*.json under
 * `careers.jobs.${slug}` so content swaps with the active locale.
 *
 * Slugs are kebab-case - used in /contacts?role=<slug> deep links.
 */

export type JobSlug = "senior-fullstack-engineer" | "product-designer";

export type JobMeta = {
  slug: JobSlug;
  team: "Engineering" | "Design" | "Ops" | "Growth";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  remote: boolean;
  postedAt: string;
};

export const JOBS: JobMeta[] = [
  {
    slug: "senior-fullstack-engineer",
    team: "Engineering",
    type: "Full-time",
    remote: true,
    postedAt: "2026-04-01",
  },
  {
    slug: "product-designer",
    team: "Design",
    type: "Full-time",
    remote: true,
    postedAt: "2026-04-10",
  },
];

export function getJobBySlug(slug: string): JobMeta | undefined {
  return JOBS.find((j) => j.slug === slug);
}
