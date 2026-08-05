import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ExternalLink,
  Clock,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Workflow,
  Briefcase,
} from "lucide-react";

function IconGithub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.1.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.05.13 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.82.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects.metadata");
  return { title: t("title"), description: t("description") };
}

type ProjectId = "tendercrm" | "bi" | "flowops" | "custom";
type ProjectStatus = "live" | "inProgress" | "planned";

type ProjectMeta = {
  id: ProjectId;
  tags: string[];
  external?: string;
  internalSlug?: string;
  year: number;
  status: ProjectStatus;
  accent: string;
  logoSrc?: string;
  icon?: LucideIcon;
};

const PROJECT_META: ProjectMeta[] = [
  {
    id: "tendercrm",
    tags: ["SaaS", "AI", "Multi-tenant", "Next.js 16", "Supabase", "Claude API"],
    external: "https://tender-crm.vercel.app",
    internalSlug: "tendercrm",
    year: 2026,
    status: "live",
    accent: "from-cyan-500/40 via-indigo-500/30 to-violet-500/30",
    logoSrc: "/tendercrm-logo.png",
  },
  {
    id: "bi",
    tags: ["BI", "Metabase", "Postgres", "ETL"],
    year: 2026,
    status: "inProgress",
    accent: "from-emerald-500/40 via-cyan-500/30 to-transparent",
    icon: TrendingUp,
  },
  {
    id: "flowops",
    tags: ["Automation", "n8n-like", "1C", "Low-code"],
    year: 2026,
    status: "planned",
    accent: "from-violet-500/40 via-fuchsia-500/30 to-transparent",
    icon: Workflow,
  },
  {
    id: "custom",
    tags: ["Custom", "NDA"],
    year: 2026,
    status: "live",
    accent: "from-amber-500/40 via-orange-500/30 to-transparent",
    icon: Briefcase,
  },
];

const STATUS_COLOR: Record<ProjectStatus, string> = {
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  inProgress: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  planned: "bg-white/5 text-muted-foreground border-white/10",
};

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={
            <>
              {t("hero.titlePre")}{" "}
              <span className="text-gradient-electric">{t("hero.titleAccent")}</span>
            </>
          }
          description={t("hero.description")}
          breadcrumbs={[{ label: t("hero.breadcrumb") }]}
        />

        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {PROJECT_META.map((p, i) => {
                const name = t(`items.${p.id}.name`);
                const tagline = t(`items.${p.id}.tagline`);
                const description = t(`items.${p.id}.description`);
                const statusLabel = t(`statusLabels.${p.status}`);
                return (
                  <SlideUp
                    key={p.id}
                    delay={i * 0.08}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-colors"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#0b0b20]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                          backgroundSize: "22px 22px",
                        }}
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl bg-white/10 group-hover:bg-white/15 transition-colors"
                      />

                      {p.logoSrc ? (
                        <Image
                          src={p.logoSrc}
                          alt={name}
                          width={260}
                          height={260}
                          className="absolute top-1/2 right-6 -translate-y-1/2 h-[75%] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        />
                      ) : p.icon ? (
                        <p.icon
                          aria-hidden="true"
                          strokeWidth={1.1}
                          className="absolute top-1/2 right-6 -translate-y-1/2 h-28 w-28 md:h-32 md:w-32 text-white/25 group-hover:text-white/35 transition-colors"
                        />
                      ) : null}

                      <div
                        className={`absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border ${STATUS_COLOR[p.status]} backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium`}
                      >
                        {p.status === "live" && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </span>
                        )}
                        {statusLabel}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                          {name}
                        </h2>
                        <p className="text-xs md:text-sm text-white/85 mt-1 line-clamp-1 drop-shadow">
                          {tagline}
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <div className="flex items-center justify-end">
                        <span className="text-xs text-muted-foreground font-mono">{p.year}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.external && (
                          <a
                            href={p.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/a inline-flex"
                          >
                            <Button
                              variant="gradient"
                              size="sm"
                              rightIcon={
                                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/a:-translate-y-0.5" />
                              }
                            >
                              {t("actions.openSite")}
                            </Button>
                          </a>
                        )}
                        {p.internalSlug && (
                          <Link href={`/projects/${p.internalSlug}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                            >
                              {t("actions.detailCase")}
                            </Button>
                          </Link>
                        )}
                        {p.status === "planned" && (
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {t("plannedNote")}
                          </span>
                        )}
                      </div>
                    </div>
                  </SlideUp>
                );
              })}
            </div>

            {/* GitHub nudge */}
            <SlideUp delay={0.3} className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{t("githubNudge.heading")}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                {t("githubNudge.description")}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contacts">
                  <Button variant="glow" size="lg">{t("githubNudge.cta")}</Button>
                </Link>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<IconGithub className="h-4 w-4" />}
                  >
                    {t("githubNudge.github")}
                  </Button>
                </a>
              </div>
            </SlideUp>
          </div>
        </section>

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
