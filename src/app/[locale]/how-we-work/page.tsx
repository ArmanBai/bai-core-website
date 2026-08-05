import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Search,
  PenTool,
  Code2,
  Rocket,
  MessageSquare,
  FileText,
  CheckCircle2,
  XCircle,
  Users,
  ShieldCheck,
  Activity,
  GitBranch,
  Eye,
  Handshake,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("howWeWork.metadata");
  return { title: t("title"), description: t("description") };
}

type PrincipleId = "transparency" | "metrics" | "code" | "security" | "no";
const PRINCIPLE_META: { id: PrincipleId; icon: typeof Eye }[] = [
  { id: "transparency", icon: Eye         },
  { id: "metrics",      icon: Activity    },
  { id: "code",         icon: GitBranch   },
  { id: "security",     icon: ShieldCheck },
  { id: "no",           icon: Handshake   },
];

type StageId = "discovery" | "design" | "build" | "launch";
const STAGE_META: { id: StageId; n: string; icon: typeof Search }[] = [
  { id: "discovery", n: "01", icon: Search  },
  { id: "design",    n: "02", icon: PenTool },
  { id: "build",     n: "03", icon: Code2   },
  { id: "launch",    n: "04", icon: Rocket  },
];

type CommId = "slack" | "demo" | "notion" | "report";
const COMM_META: { id: CommId; icon: typeof MessageSquare }[] = [
  { id: "slack",  icon: MessageSquare },
  { id: "demo",   icon: Users         },
  { id: "notion", icon: FileText      },
  { id: "report", icon: Activity      },
];

const BOUNDARY_IDS = ["oneoff", "rescue", "shady", "urgent"] as const;

export default function HowWeWorkPage() {
  const t = useTranslations("howWeWork");
  // Array-type translations (deliverables, questions, expectations) -
  // next-intl's `t.raw` returns them as-is so we can map.
  const tRaw = useTranslations("howWeWork");

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

        {/* Principles */}
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{t("principles.eyebrow")}</p>
              <h2 className="text-h2 mt-3">{t("principles.heading")}</h2>
              <p className="mt-3 text-muted-foreground">{t("principles.description")}</p>
            </SlideUp>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLE_META.map((p, i) => {
                const Icon = p.icon;
                return (
                  <SlideUp
                    key={p.id}
                    delay={i * 0.05}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {t(`principles.items.${p.id}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(`principles.items.${p.id}.text`)}
                    </p>
                  </SlideUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed process */}
        <section className="py-12 lg:py-16 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{t("process.eyebrow")}</p>
              <h2 className="text-h2 mt-3">{t("process.heading")}</h2>
              <p className="mt-3 text-muted-foreground">{t("process.description")}</p>
            </SlideUp>

            <div className="mt-10 space-y-6">
              {STAGE_META.map((s, i) => {
                const Icon = s.icon;
                const deliverables = tRaw.raw(
                  `process.stages.${s.id}.deliverables`,
                ) as string[];
                const questions = tRaw.raw(
                  `process.stages.${s.id}.questions`,
                ) as string[];
                return (
                  <SlideUp
                    key={s.id}
                    delay={i * 0.05}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8"
                  >
                    <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-10">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase">
                            {t("process.stageLabel")} {s.n}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl lg:text-2xl font-semibold tracking-tight">
                          {t(`process.stages.${s.id}.title`)}
                        </h3>
                        <span className="mt-2 inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                          {t(`process.stages.${s.id}.duration`)}
                        </span>
                        <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
                          {t(`process.stages.${s.id}.summary`)}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                            {t("process.deliverablesLabel")}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                                <span className="text-foreground/85">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            {t("process.questionsLabel")}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {questions.map((q) => (
                              <li key={q} className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                                <span className="text-muted-foreground">{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* Communication */}
        <section className="py-12 lg:py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{t("communication.eyebrow")}</p>
              <h2 className="text-h2 mt-3">{t("communication.heading")}</h2>
              <p className="mt-3 text-muted-foreground">{t("communication.description")}</p>
            </SlideUp>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {COMM_META.map((c, i) => {
                const Icon = c.icon;
                return (
                  <SlideUp
                    key={c.id}
                    delay={i * 0.05}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">
                      {t(`communication.items.${c.id}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {t(`communication.items.${c.id}.detail`)}
                    </p>
                  </SlideUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* Expectations + boundaries - two-column */}
        <section className="py-12 lg:py-16 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
              <SlideUp className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                    {t("expectations.title")}
                  </h2>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{t("expectations.description")}</p>
                <ul className="mt-5 space-y-2.5">
                  {(tRaw.raw("expectations.items") as string[]).map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
                      <span className="text-foreground/85">{e}</span>
                    </li>
                  ))}
                </ul>
              </SlideUp>

              <SlideUp delay={0.1} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                    {t("boundaries.title")}
                  </h2>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{t("boundaries.description")}</p>
                <ul className="mt-5 space-y-4">
                  {BOUNDARY_IDS.map((id) => (
                    <li key={id} className="text-sm">
                      <p className="font-semibold text-foreground/90">
                        {t(`boundaries.items.${id}.title`)}
                      </p>
                      <p className="mt-1 text-muted-foreground leading-relaxed">
                        {t(`boundaries.items.${id}.reason`)}
                      </p>
                    </li>
                  ))}
                </ul>
              </SlideUp>
            </div>
          </div>
        </section>

        {/* CTA row */}
        <section className="py-12 lg:py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SlideUp>
              <h2 className="text-h2">{t("cta.heading")}</h2>
              <p className="mt-3 text-muted-foreground">{t("cta.description")}</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contacts">
                  <Button variant="gradient" size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    {t("cta.primary")}
                  </Button>
                </Link>
                <Link href="/cases">
                  <Button variant="outline" size="lg">
                    {t("cta.secondary")}
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
