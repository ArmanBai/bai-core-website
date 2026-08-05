import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Target, Zap, Shield, Heart, Users, MapPin, Calendar } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { FadeIn, SlideUp, CountUp } from "@/components/ui/motion";
import { FinalCTA } from "@/components/sections/final-cta";
import { FounderCard } from "@/components/founder-card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.metadata");
  return { title: t("title"), description: t("description") };
}

type ValueId = "result" | "speed" | "security" | "longterm";
const VALUE_META: { id: ValueId; icon: typeof Target }[] = [
  { id: "result", icon: Target },
  { id: "speed", icon: Zap },
  { id: "security", icon: Shield },
  { id: "longterm", icon: Heart },
];

type FactId = "products" | "tech" | "testing" | "uptime";
const FACT_META: {
  id: FactId;
  value: number;
  suffix: string;
  decimals?: number;
}[] = [
  { id: "products", value: 1, suffix: "" },
  { id: "tech", value: 15, suffix: "+" },
  { id: "testing", value: 80, suffix: "%" },
  { id: "uptime", value: 99.9, suffix: "%", decimals: 1 },
];

type FounderId = "arman";
const FOUNDER_META: {
  id: FounderId;
  avatarSeed: string;
  photoSrc?: string;
  style: "notionists" | "bottts-neutral";
  accent: "indigo" | "cyan" | "violet";
}[] = [
  { id: "arman",  avatarSeed: "Arman-BAI-Core-Founder-CEO",    photoSrc: "/team/arman.jpg",  style: "notionists",     accent: "indigo" },
];

export default function AboutPage() {
  const t = useTranslations("about");
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
          breadcrumbs={[{ label: t("hero.breadcrumb") }]}
        />

        {/* Mission */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
              <SlideUp>
                <span className="text-caption text-primary">{t("mission.eyebrow")}</span>
                <h2 className="text-h2 mt-3 leading-tight">
                  {t("mission.headingPre")}{" "}
                  <span className="text-gradient-electric">{t("mission.headingAccent")}</span>{" "}
                  {t("mission.headingPost")}
                </h2>
              </SlideUp>
              <FadeIn delay={0.1}>
                <p className="text-muted-foreground leading-relaxed">{t("mission.text1")}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t("mission.text2")}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative py-20 lg:py-24 border-t border-white/10">
          <div className="absolute inset-0 bg-grid-dense opacity-[0.04] mask-radial-fade pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <span className="text-caption text-primary">{t("values.eyebrow")}</span>
              <h2 className="text-h2 mt-3">{t("values.heading")}</h2>
            </SlideUp>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {VALUE_META.map((v, i) => (
                <SlideUp
                  key={v.id}
                  delay={i * 0.08}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15 mb-4">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight">{t(`values.items.${v.id}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`values.items.${v.id}.text`)}
                  </p>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="relative py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <span className="text-caption text-primary">{t("facts.eyebrow")}</span>
              <h2 className="text-h2 mt-3">
                {t("facts.headingPre")}{" "}
                <span className="text-gradient-electric">{t("facts.headingAccent")}</span>
              </h2>
            </SlideUp>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {FACT_META.map((f, i) => (
                <SlideUp
                  key={f.id}
                  delay={i * 0.08}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl bg-primary/20"
                  />
                  <div className="relative">
                    <div className="text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
                      <CountUp
                        value={f.value}
                        decimals={f.decimals ?? 0}
                        suffix={f.suffix}
                        duration={1.6}
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`facts.items.${f.id}`)}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="relative py-20 lg:py-24 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <SlideUp className="max-w-2xl">
              <span className="text-caption text-primary">{t("team.eyebrow")}</span>
              <h2 className="text-h2 mt-3">
                {t("team.headingPre")}{" "}
                <span className="text-gradient-electric">{t("team.headingAccent")}</span>
              </h2>
              <p className="mt-4 text-muted-foreground">{t("team.description")}</p>
            </SlideUp>

            <div className="mt-12 grid gap-6 max-w-sm mx-auto">
              {FOUNDER_META.map((f, i) => (
                <FounderCard
                  key={f.id}
                  index={i}
                  name={t(`team.founders.${f.id}.name`)}
                  role={t(`team.founders.${f.id}.role`)}
                  bio={t(`team.founders.${f.id}.bio`)}
                  avatarSeed={f.avatarSeed}
                  photoSrc={f.photoSrc}
                  style={f.style}
                  accent={f.accent}
                />
              ))}
            </div>

            <SlideUp delay={0.3} className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {t("team.badges.location")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {t("team.badges.composition")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {t("team.badges.founded")}
              </span>
            </SlideUp>
          </div>
        </section>

        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
