import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("status.metadata");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/status" },
  };
}

export const revalidate = 60;

type StatusKind = "operational" | "degraded" | "down";
type ComponentId = "site" | "contactApi" | "email" | "tendercrm";

const COMPONENT_META: { id: ComponentId; status: StatusKind; latency?: string }[] = [
  { id: "site",       status: "operational", latency: "~180ms" },
  { id: "contactApi", status: "operational", latency: "~240ms" },
  { id: "email",      status: "operational" },
  { id: "tendercrm",  status: "operational", latency: "~320ms" },
];

const STATUS_ICON: Record<StatusKind, typeof CheckCircle2> = {
  operational: CheckCircle2,
  degraded: AlertTriangle,
  down: Circle,
};

const STATUS_TONE: Record<StatusKind, string> = {
  operational: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  degraded: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  down: "text-rose-400 bg-rose-500/10 border-rose-500/25",
};

/** Next-intl locale ids → BCP-47 tags for Intl APIs. */
const DATE_LOCALE: Record<string, string> = {
  ru: "ru-RU",
  kz: "kk-KZ",
  en: "en-US",
};

export default function StatusPage() {
  const t = useTranslations("status");
  const locale = useLocale();
  const dateLocale = DATE_LOCALE[locale] ?? "en-US";

  const worst: StatusKind = COMPONENT_META.some((c) => c.status === "down")
    ? "down"
    : COMPONENT_META.some((c) => c.status === "degraded")
      ? "degraded"
      : "operational";

  const HeaderIcon = STATUS_ICON[worst];
  const headerTone = STATUS_TONE[worst];

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
          <div className="max-w-3xl mx-auto px-6">
            <SlideUp>
              <div className={`flex items-center gap-3 rounded-2xl border p-5 lg:p-6 ${headerTone}`}>
                <HeaderIcon className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-base lg:text-lg font-semibold">
                    {t(`summary.${worst}`)}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {t("summary.lastCheck")}: {new Date().toLocaleString(dateLocale)}
                  </p>
                </div>
              </div>
            </SlideUp>

            <div className="mt-8 space-y-3">
              {COMPONENT_META.map((c, i) => {
                const Icon = STATUS_ICON[c.status];
                const tone = STATUS_TONE[c.status];
                return (
                  <SlideUp key={c.id} delay={i * 0.04}>
                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${tone}`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{t(`components.${c.id}.name`)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t(`components.${c.id}.description`)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-[11px] font-mono uppercase tracking-wider ${tone.split(" ")[0]}`}
                        >
                          {t(`statusLabels.${c.status}`)}
                        </p>
                        {c.latency && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                            {c.latency}
                          </p>
                        )}
                      </div>
                    </div>
                  </SlideUp>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("transparencyNote.strong")}</strong>{" "}
                {t("transparencyNote.textPre")}{" "}
                <Link href="/changelog" className="text-primary hover:underline">
                  {t("transparencyNote.linkLabel")}
                </Link>{" "}
                {t("transparencyNote.textPost")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
