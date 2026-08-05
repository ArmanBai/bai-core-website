/**
 * Canonical service catalog - structural/visual config only.
 * Translatable copy (title, tagline, description, longDescription, phases,
 * includes, useCases, timeline, notFor, faqs) lives in messages/*.json under
 * `services.items.${id}` so content can swap with the active locale.
 *
 * Consumed by:
 *  - /services (overview grid)          - uses id, icon, accent, stack
 *  - /services/[slug] (detail pages)    - uses id, icon, accent, stack
 *  - sitemap.ts                          - uses id
 */

import type { LucideIcon } from "lucide-react";
import { Rocket, Workflow, Database, TrendingUp, Compass } from "lucide-react";

export type ServiceId = "saas" | "automation" | "internal" | "bi" | "consulting";

export type ServiceMeta = {
  id: ServiceId;
  icon: LucideIcon;
  /** Tailwind gradient tokens like "from-cyan-500/30 via-indigo-500/20 to-transparent". */
  accent: string;
  /** Tech stack chips. Left as raw strings - these are product / protocol names,
   *  not copy to translate. */
  stack: string[];
};

export const SERVICES: ServiceMeta[] = [
  {
    id: "saas",
    icon: Rocket,
    accent: "from-cyan-500/30 via-indigo-500/20 to-transparent",
    stack: ["Next.js 16", "TypeScript", "Postgres / Supabase", "Stripe", "Redis", "Vercel / AWS"],
  },
  {
    id: "automation",
    icon: Workflow,
    accent: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
    stack: ["n8n", "Node.js", "Webhooks", "Telegram Bot API", "1С API"],
  },
  {
    id: "internal",
    icon: Database,
    accent: "from-indigo-500/30 via-cyan-500/20 to-transparent",
    stack: ["Next.js", "TypeScript", "Postgres", "tRPC", "Prisma / Drizzle"],
  },
  {
    id: "bi",
    icon: TrendingUp,
    accent: "from-emerald-500/30 via-cyan-500/20 to-transparent",
    stack: ["Metabase", "ClickHouse", "Postgres", "dbt", "PostHog"],
  },
  {
    id: "consulting",
    icon: Compass,
    accent: "from-amber-500/30 via-orange-500/20 to-transparent",
    stack: ["-"],
  },
];

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.id === slug);
}
