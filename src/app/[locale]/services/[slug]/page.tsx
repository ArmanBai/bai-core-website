import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";

type PageParams = { params: Promise<{ slug: string }> };

type Phase = { title: string; description: string; deliverable: string };
type Faq = { q: string; a: string };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "404" };
  const t = await getTranslations("services");
  const title = t(`items.${service.id}.title`);
  const description = t(`items.${service.id}.description`);
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function ServiceDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tPage = await getTranslations("services.page");
  const tDetail = await getTranslations("services.detailPage");

  const Icon = service.icon;
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  const title = t(`items.${service.id}.title`);
  const tagline = t(`items.${service.id}.tagline`);
  const timeline = t(`items.${service.id}.timeline`);
  const longDescription = t.raw(`items.${service.id}.longDescription`) as string[];
  const includes = t.raw(`items.${service.id}.includes`) as string[];
  const useCases = t.raw(`items.${service.id}.useCases`) as string[];
  const phases = t.raw(`items.${service.id}.phases`) as Phase[];
  const notFor = t.raw(`items.${service.id}.notFor`) as string[];
  const faqs = t.raw(`items.${service.id}.faqs`) as Faq[];

  // Split the title into "all words but last two" + "last two" so the accent
  // span falls on a meaningful chunk in every language.
  const titleWords = title.split(" ");
  const titleHead = titleWords.slice(0, Math.max(titleWords.length - 2, 1)).join(" ");
  const titleTail = titleWords.slice(Math.max(titleWords.length - 2, 1)).join(" ");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={tPage("heroEyebrow")}
          title={
            titleHead ? (
              <>
                {titleHead}{" "}
                <span className="text-gradient-electric">{titleTail}</span>
              </>
            ) : (
              <span className="text-gradient-electric">{titleTail}</span>
            )
          }
          description={tagline}
          breadcrumbs={[
            { label: tPage("heroBreadcrumb"), href: "/services" },
            { label: title },
          ]}
        >
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-primary">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{timeline}</span>
            </div>
            <Link href="/contacts">
              <Button variant="gradient" size="default" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                {tDetail("heroDiscussCta")}
              </Button>
            </Link>
          </div>
        </PageHero>

        {/* Overview + icon hero */}
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
              <SlideUp>
                <div
                  className={`relative aspect-square max-w-sm rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-70`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-grid-dense opacity-[0.08]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-background/70 backdrop-blur-xl border border-white/15 text-primary">
                      <Icon className="h-14 w-14" strokeWidth={1.4} />
                    </div>
                  </div>
                </div>
              </SlideUp>

              <SlideUp delay={0.1}>
                <p className="text-caption text-primary">{tDetail("overviewLabel")}</p>
                <div className="mt-3 space-y-4">
                  {longDescription.map((p, i) => (
                    <p key={i} className="text-base lg:text-lg text-foreground/85 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-caption mb-3">{tDetail("stackLabel")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.stack.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </section>

        {/* What's included + use cases */}
        <section className="py-12 lg:py-16 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
              <SlideUp className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                    {tDetail("includesLabel")}
                  </h2>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {includes.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </SlideUp>

              <SlideUp delay={0.1} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                  {tDetail("useCasesLabel")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{tDetail("useCasesDescription")}</p>
                <ul className="mt-6 space-y-2.5">
                  {useCases.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground/90">{c}</span>
                    </li>
                  ))}
                </ul>
              </SlideUp>
            </div>
          </div>
        </section>

        {/* Phases */}
        <section className="py-12 lg:py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{tDetail("phasesEyebrow")}</p>
              <h2 className="text-h2 mt-3">{tDetail("phasesHeading")}</h2>
              <p className="mt-3 text-muted-foreground">{tDetail("phasesDescription")}</p>
            </SlideUp>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {phases.map((p, i) => (
                <SlideUp
                  key={p.title}
                  delay={i * 0.05}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] uppercase">
                      {tDetail("stageLabel")} {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-4 rounded-xl border border-primary/15 bg-primary/[0.04] p-3">
                    <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                      {tDetail("deliverableLabel")}
                    </p>
                    <p className="mt-1 text-sm text-foreground/85">{p.deliverable}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Not for */}
        <section className="py-12 lg:py-16 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto px-6">
            <SlideUp className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <XCircle className="h-5 w-5" />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                  {tDetail("notForTitle")}
                </h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{tDetail("notForDescription")}</p>
              <ul className="mt-5 space-y-2.5">
                {notFor.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80" />
                    <span className="text-foreground/85">{n}</span>
                  </li>
                ))}
              </ul>
            </SlideUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{tDetail("faqEyebrow")}</p>
              <h2 className="text-h2 mt-3">{tDetail("faqHeading")}</h2>
            </SlideUp>

            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <SlideUp
                  key={f.q}
                  delay={i * 0.04}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:p-6"
                >
                  <p className="text-base font-semibold tracking-tight">{f.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-12 lg:py-16 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <p className="text-caption text-primary">{tDetail("otherServicesEyebrow")}</p>
              <h2 className="text-h2 mt-3">{tDetail("otherServicesHeading")}</h2>
            </SlideUp>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((s, i) => {
                const OtherIcon = s.icon;
                return (
                  <SlideUp key={s.id} delay={i * 0.05}>
                    <Link
                      href={`/services/${s.id}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-primary/30 transition-colors"
                    >
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity bg-gradient-to-br ${s.accent}`}
                      />
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                          <OtherIcon className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold tracking-tight">
                          {t(`items.${s.id}.title`)}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {t(`items.${s.id}.tagline`)}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary group-hover:gap-1.5 transition-all">
                          {tDetail("otherServicesCta")}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </Link>
                  </SlideUp>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
