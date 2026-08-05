import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { PricingSection } from "@/components/sections/pricing";
import { SERVICES } from "@/lib/services-data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services.page.metadata");
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const tRaw = useTranslations("services");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={t("page.heroEyebrow")}
          title={
            <>
              {t("page.heroTitlePre")}{" "}
              <span className="text-gradient-electric">{t("page.heroTitleAccent")}</span>
            </>
          }
          description={t("page.heroDescription")}
          breadcrumbs={[{ label: t("page.heroBreadcrumb") }]}
        />

        {/* Service cards */}
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6 space-y-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const includes = tRaw.raw(`items.${s.id}.includes`) as string[];
              const useCases = tRaw.raw(`items.${s.id}.useCases`) as string[];
              return (
                <SlideUp
                  key={s.id}
                  delay={i * 0.05}
                  id={s.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] scroll-mt-24"
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${s.accent}`}
                  />

                  <div className="relative grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 p-8 lg:p-12">
                    {/* Left: title + description + stack */}
                    <div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-5">
                        {t(`items.${s.id}.title`)}
                      </h2>
                      <p className="mt-2 text-primary text-sm font-medium">
                        {t(`items.${s.id}.tagline`)}
                      </p>
                      <p className="mt-5 text-muted-foreground leading-relaxed">
                        {t(`items.${s.id}.description`)}
                      </p>

                      <div className="mt-6">
                        <p className="text-caption mb-2">{t("page.stackLabel")}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.stack.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary">
                        <span>{t("page.timelineLabel")}</span>
                        <span className="font-semibold">{t(`items.${s.id}.timeline`)}</span>
                      </div>
                    </div>

                    {/* Right: what's included + use cases */}
                    <div className="grid gap-6">
                      <div>
                        <p className="text-caption mb-3">{t("page.includesLabel")}</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {includes.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                                <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                              </span>
                              <span className="text-foreground/90">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-caption mb-3">{t("page.examplesLabel")}</p>
                        <ul className="space-y-1.5">
                          {useCases.map((c) => (
                            <li
                              key={c}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        <Link href={`/services/${s.id}`} className="inline-flex self-start">
                          <Button
                            variant="gradient"
                            size="default"
                            rightIcon={<ArrowUpRight className="h-4 w-4" />}
                          >
                            {t("page.detailCta")}
                          </Button>
                        </Link>
                        <Link href="/contacts" className="inline-flex self-start">
                          <Button variant="terminal" size="default">
                            {t("page.discussCta")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </section>

        <PricingSection />

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
