import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight, MapPin, Briefcase, Clock, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp, FadeIn } from "@/components/ui/motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { JOBS } from "@/lib/careers";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("careers.metadata");
  return { title: t("title"), description: t("description") };
}

type Benefit = { title: string; text: string };

export default async function CareersPage() {
  const t = await getTranslations("careers");
  const hasJobs = JOBS.length > 0;
  const benefits = (t.raw("benefits") as Benefit[]) ?? [];

  // Build JobPosting JSON-LD with translated copy so search indexes see
  // the localised version of each role.
  const jobPostingJsonLd = JOBS.map((j) => {
    const title = t(`jobs.${j.slug}.title`);
    const summary = t(`jobs.${j.slug}.summary`);
    const responsibilities = t.raw(`jobs.${j.slug}.responsibilities`) as string[];
    const requirements = t.raw(`jobs.${j.slug}.requirements`) as string[];
    const salary = (() => {
      try {
        return t(`jobs.${j.slug}.salary`);
      } catch {
        return undefined;
      }
    })();
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title,
      description: `${summary}\n\n${responsibilities.join("\n")}\n\n${requirements.join("\n")}`,
      datePosted: j.postedAt,
      employmentType: j.type.toUpperCase().replace("-", "_"),
      hiringOrganization: {
        "@type": "Organization",
        name: siteConfig.legalName,
        sameAs: siteConfig.url,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Astana",
          addressCountry: "KZ",
        },
      },
      ...(j.remote && {
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "Kazakhstan",
        },
      }),
      ...(salary && {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "KZT",
          value: { "@type": "QuantitativeValue", unitText: "MONTH", description: salary },
        },
      }),
    };
  });

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
          <div className="max-w-5xl mx-auto px-6">
            {/* Benefits */}
            <SlideUp>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <p className="text-sm font-semibold">{b.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </SlideUp>

            {/* Jobs */}
            <FadeIn>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-section">{t("jobsHeading")}</h2>
                <span className="text-xs font-mono text-muted-foreground">
                  {t("jobsOpen", { count: JOBS.length })}
                </span>
              </div>
            </FadeIn>

            {hasJobs ? (
              <div className="space-y-3">
                {JOBS.map((job, i) => {
                  const responsibilities = t.raw(
                    `jobs.${job.slug}.responsibilities`,
                  ) as string[];
                  const requirements = t.raw(
                    `jobs.${job.slug}.requirements`,
                  ) as string[];
                  let nice: string[] = [];
                  try {
                    nice = t.raw(`jobs.${job.slug}.nice`) as string[];
                  } catch {
                    nice = [];
                  }
                  return (
                    <SlideUp key={job.slug} delay={i * 0.05}>
                      <article className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-7 hover:border-primary/30 transition-colors">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[11px] font-mono text-primary mb-2">
                              <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5">
                                {job.team}
                              </span>
                              {job.remote && (
                                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-emerald-300">
                                  {t("remoteBadge")}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
                              {t(`jobs.${job.slug}.title`)}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                              {t(`jobs.${job.slug}.summary`)}
                            </p>
                            <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{t(`jobs.${job.slug}.location`)}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span>{job.type}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span className="text-foreground font-medium">
                                  {t(`jobs.${job.slug}.salary`)}
                                </span>
                              </div>
                            </dl>
                          </div>
                          <Link
                            href={`/contacts?role=${job.slug}`}
                            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {t("applyCta")}
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>

                        <details className="mt-5 group/details">
                          <summary className="text-xs font-mono text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                            {t("detailsToggle")}
                          </summary>
                          <div className="mt-4 grid sm:grid-cols-2 gap-5 text-sm">
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-primary mb-2">
                                {t("responsibilitiesLabel")}
                              </p>
                              <ul className="space-y-1.5 text-muted-foreground text-[13px]">
                                {responsibilities.map((r) => (
                                  <li key={r} className="flex gap-2">
                                    <span className="text-primary/60 shrink-0">-</span>
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold tracking-wider text-primary mb-2">
                                {t("requirementsLabel")}
                              </p>
                              <ul className="space-y-1.5 text-muted-foreground text-[13px]">
                                {requirements.map((r) => (
                                  <li key={r} className="flex gap-2">
                                    <span className="text-primary/60 shrink-0">-</span>
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                              {nice.length > 0 && (
                                <>
                                  <p className="text-[11px] font-semibold tracking-wider text-muted-foreground mt-4 mb-2">
                                    {t("niceLabel")}
                                  </p>
                                  <ul className="space-y-1.5 text-muted-foreground text-[13px]">
                                    {nice.map((r) => (
                                      <li key={r} className="flex gap-2">
                                        <span className="text-muted-foreground/40 shrink-0">
                                          -
                                        </span>
                                        <span>{r}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </details>
                      </article>
                    </SlideUp>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                <p className="text-lg font-semibold">{t("empty.title")}</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  {t("empty.description")}
                </p>
                <Link href="/contacts" className="inline-block mt-5">
                  <Button variant="glow" size="lg">
                    {t("empty.cta")}
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 lg:p-8 text-center">
              <p className="text-caption text-primary mb-2">{t("openCall.eyebrow")}</p>
              <h3 className="text-xl lg:text-2xl font-semibold">{t("openCall.heading")}</h3>
              <Link href="/contacts" className="inline-block mt-5">
                <Button variant="glow" size="lg">
                  {t("openCall.cta")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {jobPostingJsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
    </>
  );
}
