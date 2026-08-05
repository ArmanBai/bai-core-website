"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Rocket, Workflow, Database, TrendingUp, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SlideUp } from "@/components/ui/motion";

type ServiceId = "saas" | "automation" | "internal" | "bi";

/** Icon + accent + tech-tag list per service. Copy (title/description) is
 *  pulled from i18n via the id. Tags stay as raw strings - they're product
 *  names / protocols, not something to translate. */
const SERVICE_META: {
  id: ServiceId;
  icon: typeof Rocket;
  tags: string[];
  accent: string;
}[] = [
  {
    id: "saas",
    icon: Rocket,
    tags: ["Next.js", "Postgres", "Stripe", "Supabase"],
    accent: "from-cyan-500/25 via-indigo-500/15 to-transparent",
  },
  {
    id: "automation",
    icon: Workflow,
    tags: ["n8n", "Node.js", "Webhooks"],
    accent: "from-violet-500/25 via-fuchsia-500/15 to-transparent",
  },
  {
    id: "internal",
    icon: Database,
    tags: ["Admin", "Multi-tenant", "RLS"],
    accent: "from-indigo-500/25 via-cyan-500/15 to-transparent",
  },
  {
    id: "bi",
    icon: TrendingUp,
    tags: ["Metabase", "ClickHouse", "ETL"],
    accent: "from-emerald-500/25 via-cyan-500/15 to-transparent",
  },
];

export function Services() {
  const t = useTranslations("home.services");

  return (
    <section id="services" className="relative py-20 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.04] mask-fade-b pointer-events-none" />
      <div className="relative mx-auto container-x" style={{ maxWidth: "min(1400px, 94vw)" }}>
        <SlideUp className="max-w-2xl">
          <span className="text-caption text-primary">{t("eyebrow")}</span>
          <h2 className="text-h1 mt-3 font-semibold">{t("heading")}</h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>
        </SlideUp>

        {/* Symmetric grid: 1x4 on xl, 2x2 on md+, 1x on mobile. Equal heights. */}
        <div className="mt-12 md:mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
          {SERVICE_META.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm hover:border-primary/30 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.18_215_/_0.3)]"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity bg-gradient-to-br",
                    s.accent
                  )}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div className="relative mt-5 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                    {t(`items.${s.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {t(`items.${s.id}.description`)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contacts"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t("cardCta")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <SlideUp delay={0.3} className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("footerCta")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </SlideUp>
      </div>
    </section>
  );
}
