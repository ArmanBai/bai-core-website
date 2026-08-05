import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Clock, MessageCircle, Zap, Shield, Phone } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp, FadeIn } from "@/components/ui/motion";
import { ContactForm } from "@/components/contact-form";
import { FaqSection } from "@/components/sections/faq";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contacts.metadata");
  return { title: t("title"), description: t("description") };
}

type NextStepId = "reply" | "call" | "proposal";
const NEXT_STEPS: { id: NextStepId; icon: typeof MessageCircle }[] = [
  { id: "reply",    icon: MessageCircle },
  { id: "call",     icon: Zap           },
  { id: "proposal", icon: Shield        },
];

export default function ContactsPage() {
  const t = useTranslations("contacts");
  const tFaq = useTranslations("faq");

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

        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
              {/* Form */}
              <SlideUp>
                <ContactForm />
              </SlideUp>

              {/* Info */}
              <div className="space-y-5">
                <FadeIn delay={0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <p className="text-caption text-primary">{t("directContact.label")}</p>
                    <ul className="mt-4 space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/15">
                          <Phone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("directContact.phoneLabel")}
                          </p>
                          <a
                            href={`tel:${siteConfig.phoneHref}`}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {siteConfig.phone}
                          </a>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {t("directContact.phoneHint")}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/15">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("directContact.emailLabel")}
                          </p>
                          <a
                            href={`mailto:${siteConfig.email}`}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {siteConfig.email}
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/15">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("directContact.officeLabel")}
                          </p>
                          <p className="text-sm font-medium">{siteConfig.city}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {t("directContact.officeHint")}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/15">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("directContact.responseLabel")}
                          </p>
                          <p className="text-sm font-medium">
                            {t("directContact.responseValue")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {t("directContact.responseHours")}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                {/* What happens next */}
                <FadeIn delay={0.15}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <p className="text-caption text-primary">{t("nextSteps.label")}</p>
                    <ol className="mt-4 space-y-3">
                      {NEXT_STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <li key={step.id} className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10">
                              <Icon className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-mono text-muted-foreground">
                                {t("nextSteps.stepPrefix")} 0{i + 1}
                              </p>
                              <p className="text-sm font-medium">
                                {t(`nextSteps.items.${step.id}.title`)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {t(`nextSteps.items.${step.id}.text`)}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </FadeIn>

                {/* Legal block */}
                <FadeIn delay={0.2}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 font-mono text-[11.5px] leading-relaxed">
                    <p className="text-caption text-primary mb-3">{t("legal.label")}</p>
                    <div className="space-y-1 text-muted-foreground">
                      <div>
                        <span className="text-muted-foreground/60">legal:</span>{" "}
                        {siteConfig.legalName}
                      </div>
                      <div>
                        <span className="text-muted-foreground/60">bin:</span>{" "}
                        {t("legal.binValue")}
                      </div>
                      <div>
                        <span className="text-muted-foreground/60">country:</span>{" "}
                        {t("legal.countryValue")}
                      </div>
                      <div>
                        <span className="text-muted-foreground/60">payment:</span>{" "}
                        {t("legal.paymentValue")}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <FaqSection
          items={tFaq.raw("items") as { q: string; a: string }[]}
          eyebrow={tFaq("eyebrow")}
          title={tFaq("title")}
          description={t("faqIntro")}
        />
      </main>
      <SiteFooter />
    </>
  );
}
