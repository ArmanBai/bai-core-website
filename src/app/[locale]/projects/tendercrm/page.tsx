import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLink, ArrowLeft, CheckCircle2, Zap, Shield, LineChart } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp, FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects.detail.metadata");
  return { title: t("title"), description: t("description") };
}

const STAT_KEYS = ["mvp", "stack", "db", "ai"] as const;

type FeatureId = "ai" | "calc" | "multiTenant";
const FEATURE_META: { id: FeatureId; icon: typeof Zap }[] = [
  { id: "ai",          icon: Zap       },
  { id: "calc",        icon: LineChart },
  { id: "multiTenant", icon: Shield    },
];

const STACK_KEYS = [
  "next",
  "ts",
  "supabase",
  "claude",
  "redis",
  "sentry",
  "playwright",
  "tailwind",
] as const;

export default function TenderCrmCasePage() {
  const t = useTranslations("projects.detail");
  const tProjects = useTranslations("projects");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={
            <>
              {t("hero.titlePre")}{" "}
              <span className="text-gradient-electric">{t("hero.titleAccent")}</span>{" "}
              {t("hero.titlePost")}
            </>
          }
          description={t("hero.description")}
          breadcrumbs={[
            { label: tProjects("hero.breadcrumb"), href: "/projects" },
            { label: t("hero.breadcrumb") },
          ]}
        >
          <div className="flex flex-wrap gap-3">
            <a href="https://tender-crm.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button
                variant="glow"
                size="lg"
                rightIcon={<ExternalLink className="h-4 w-4" />}
              >
                {t("hero.openButton")}
              </Button>
            </a>
            <Link href="/projects">
              <Button variant="outline" size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                {t("hero.backButton")}
              </Button>
            </Link>
          </div>
        </PageHero>

        {/* Product logo - full-frame hero visual for the case */}
        <section className="py-10 lg:py-14">
          <div className="max-w-4xl mx-auto px-6">
            <FadeIn>
              <div className="relative aspect-[16/9] rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b0b20] via-[#0a0a1c] to-[#06060e] overflow-hidden shadow-2xl">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br from-cyan-500/40 to-violet-500/30"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl bg-gradient-to-tr from-indigo-500/30 to-fuchsia-500/20"
                />
                <div className="absolute inset-0 flex items-center justify-center p-10 lg:p-16">
                  <Image
                    src="/tendercrm-logo.png"
                    alt="TenderCRM"
                    width={520}
                    height={520}
                    priority
                    className="w-auto h-full max-h-[280px] object-contain drop-shadow-[0_20px_60px_oklch(0.55_0.2_215_/_0.5)]"
                  />
                </div>
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live · tender-crm.vercel.app
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Overview stats */}
        <section className="py-8 lg:py-12 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_KEYS.map((k) => (
              <div key={k} className="border-l-2 border-primary/30 pl-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t(`stats.${k}.label`)}
                </div>
                <div className="text-lg font-semibold mt-1">{t(`stats.${k}.value`)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <SlideUp>
              <span className="text-caption text-primary">{t("problem.eyebrow")}</span>
              <h2 className="text-h2 mt-3">
                {t("problem.headingPre")}{" "}
                <span className="text-muted-foreground italic">{t("problem.headingAccent")}</span>
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("problem.para1")}</p>
                <p>{t("problem.para2")}</p>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 lg:py-20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <span className="text-caption text-primary">{t("solution.eyebrow")}</span>
              <h2 className="text-h2 mt-3">
                {t("solution.headingPre")}{" "}
                <span className="text-gradient-electric">{t("solution.headingAccent")}</span>
              </h2>
            </SlideUp>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {FEATURE_META.map((f, i) => {
                const Icon = f.icon;
                return (
                  <FadeIn
                    key={f.id}
                    delay={i * 0.1}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{t(`solution.features.${f.id}.title`)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(`solution.features.${f.id}.text`)}
                    </p>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stack details */}
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <span className="text-caption text-primary">{t("stack.eyebrow")}</span>
              <h2 className="text-h2 mt-3">{t("stack.heading")}</h2>
              <p className="mt-4 text-muted-foreground">{t("stack.description")}</p>
            </SlideUp>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {STACK_KEYS.map((k, i) => (
                <FadeIn
                  key={k}
                  delay={i * 0.05}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-mono text-sm font-semibold">
                      {t(`stack.items.${k}.name`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`stack.items.${k}.reason`)}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 lg:py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SlideUp>
              <span className="text-caption text-primary">{t("results.eyebrow")}</span>
              <h2 className="text-h2 mt-3">{t("results.heading")}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("results.description")}
              </p>
              <div className="mt-8">
                <a href="https://tender-crm.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="glow"
                    size="xl"
                    rightIcon={<ExternalLink className="h-5 w-5" />}
                  >
                    {t("results.cta")}
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
