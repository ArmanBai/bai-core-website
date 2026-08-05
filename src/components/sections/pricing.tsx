"use client";

import { useTranslations } from "next-intl";
import { Layers, Repeat, Handshake } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormatId = "fixed" | "sprints" | "partnership";

const FORMAT_META: { id: FormatId; icon: typeof Layers; featured?: boolean }[] = [
  { id: "fixed",       icon: Layers                     },
  { id: "sprints",     icon: Repeat,    featured: true  },
  { id: "partnership", icon: Handshake                  },
];

export function PricingSection() {
  const t = useTranslations("services.pricing");
  const tRaw = useTranslations("services.pricing");

  return (
    <section className="py-16 lg:py-24 relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-caption text-primary mb-3">{t("eyebrow")}</p>
          <h2 className="text-h2">{t("heading")}</h2>
          <p className="mt-3 text-muted-foreground">{t("description")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {FORMAT_META.map((f) => {
            const Icon = f.icon;
            const points = tRaw.raw(`formats.${f.id}.points`) as string[];
            return (
              <div
                key={f.id}
                className={cn(
                  "relative rounded-2xl border p-6 lg:p-7 flex flex-col",
                  f.featured
                    ? "border-primary/40 bg-primary/[0.04]"
                    : "border-white/10 bg-white/[0.02]"
                )}
              >
                {f.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-primary/40 bg-background px-3 py-0.5 text-[11px] font-medium text-primary">
                    {t("featured")}
                  </span>
                )}

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {t(`formats.${f.id}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t(`formats.${f.id}.tagline`)}
                </p>

                <ul className="mt-5 space-y-2 flex-1">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                      <span className="text-foreground/85">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    {t("suitableLabel")}
                  </p>
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                    {t(`formats.${f.id}.suitable`)}
                  </p>
                </div>

                <Link href="/contacts" className="mt-6">
                  <Button
                    variant={f.featured ? "gradient" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    {t("ctaDiscuss")}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">{t("bottomNote")}</p>
      </div>
    </section>
  );
}
