import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Clock, TrendingUp, Workflow, Database, Shield } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cases.metadata");
  return { title: t("title"), description: t("description") };
}

type CaseId =
  | "tendercrm-self"
  | "distributor-automation"
  | "services-crm"
  | "saas-startup";

type CaseMetric = { value: string; label: string };

/** Per-case visual + structural config. Copy lives in messages/*.json under
 *  cases.items.{id} so it swaps with the active locale. */
const CASE_META: {
  id: CaseId;
  icon: typeof Workflow;
  accent: string;
  featured?: boolean;
  internalSlug?: string;
  confidential?: boolean;
  stack: string[];
}[] = [
  {
    id: "tendercrm-self",
    icon: Database,
    accent: "from-cyan-500/30 via-indigo-500/20 to-violet-500/20",
    featured: true,
    internalSlug: "tendercrm",
    stack: ["Next.js 16", "Supabase", "TypeScript", "Claude API", "Vercel"],
  },
  {
    id: "distributor-automation",
    icon: Workflow,
    accent: "from-emerald-500/30 via-cyan-500/20 to-transparent",
    confidential: true,
    stack: ["Next.js", "Node.js", "Postgres", "n8n", "1С API"],
  },
  {
    id: "services-crm",
    icon: TrendingUp,
    accent: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
    confidential: true,
    stack: ["Next.js 16", "Supabase", "RLS", "Resend", "Metabase"],
  },
  {
    id: "saas-startup",
    icon: Shield,
    accent: "from-amber-500/30 via-orange-500/20 to-transparent",
    confidential: true,
    stack: ["Next.js 16", "Supabase", "Stripe", "Vercel", "Sentry"],
  },
];

export default function CasesPage() {
  const t = useTranslations("cases");
  const tRaw = useTranslations("cases");

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
            <div className="space-y-8">
              {CASE_META.map((c, i) => {
                const Icon = c.icon;
                const approach = tRaw.raw(`items.${c.id}.approach`) as string[];
                const metrics = tRaw.raw(`items.${c.id}.metrics`) as CaseMetric[];
                return (
                  <SlideUp
                    key={c.id}
                    delay={i * 0.06}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-colors"
                  >
                    <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br ${c.accent} opacity-60 pointer-events-none`} />

                    <div className="relative grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10 p-6 lg:p-8">
                      {/* Left: client + icon + metrics */}
                      <div className="space-y-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              {t("labels.clientLabel")}
                            </p>
                            <p className="text-sm font-semibold mt-0.5 truncate">
                              {t(`items.${c.id}.client`)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {t(`items.${c.id}.industry`)}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-mono text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {t(`items.${c.id}.timeline`)}
                        </div>

                        {c.confidential && (
                          <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/5 px-2 py-1 text-[11px] text-amber-300/90">
                            <Shield className="h-3 w-3" />
                            {t("labels.ndaBadge")}
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                          {metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5"
                            >
                              <p className="text-base lg:text-lg font-bold tracking-tight tabular-nums text-foreground">
                                {m.value}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                                {m.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: problem / approach / outcome */}
                      <div className="space-y-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                            {t("labels.problemLabel")}
                          </p>
                          <p className="mt-1.5 text-sm text-foreground/90 leading-relaxed">
                            {t(`items.${c.id}.problem`)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                            {t("labels.approachLabel")}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {approach.map((a) => (
                              <li key={a} className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                                <span className="text-foreground/85">{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                            {t("labels.outcomeLabel")}
                          </p>
                          <p className="mt-1.5 text-sm text-foreground/90 leading-relaxed">
                            {t(`items.${c.id}.outcome`)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {c.stack.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {c.internalSlug && (
                          <div>
                            <Link href={`/projects/${c.internalSlug}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                              >
                                {t("labels.caseStudyCta")}
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </SlideUp>
                );
              })}
            </div>

            {/* Trust note */}
            <SlideUp delay={0.3} className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("trustNote.text")}
              </p>
              <div className="mt-5">
                <Link href="/contacts">
                  <Button variant="gradient" size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    {t("trustNote.cta")}
                  </Button>
                </Link>
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
