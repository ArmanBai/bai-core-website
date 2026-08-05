"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

const VALUE_KEYS = ["oneWindow", "margin", "team"] as const;
const INSIDE_KEYS = [
  "ai",
  "multiTenant",
  "taxRegimes",
  "roles",
  "platforms",
  "analytics",
  "marginCalc",
  "auditLog",
] as const;

/* ------------------------------------------------------------------ */
/*  Mock TenderCRM preview - animated browser chrome + stats + chart    */
/* ------------------------------------------------------------------ */

function TenderCrmPreview() {
  const t = useTranslations("tenderCrmPreview");
  const lots = [
    { name: t("lot1"), platform: "goszakup", amount: "₸12.4M", tone: "emerald" },
    { name: t("lot2"), platform: "Samruk",   amount: "₸3.8M",  tone: "indigo"  },
    { name: t("lot3"), platform: "NADLoC",   amount: "₸24.0M", tone: "amber"   },
  ];
  const stats = [
    { label: t("statActive"),  value: "47",    tone: "text-indigo-300"  },
    { label: t("statWinRate"), value: "68%",   tone: "text-emerald-300" },
    { label: t("statProfit"),  value: "₸4.2M", tone: "text-amber-300"   },
    { label: t("statMargin"),  value: "22%",   tone: "text-violet-300"  },
  ];
  const toneMap: Record<string, string> = {
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    indigo:  "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    amber:   "bg-amber-500/15 text-amber-300 border-amber-500/25",
  };
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0b20] to-[#06060e] overflow-hidden shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-muted-foreground font-mono">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          tender-crm.vercel.app
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-2"
            >
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className={cn("text-sm font-semibold tabular-nums mt-0.5", s.tone)}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Lots list */}
        <div className="space-y-1.5">
          {lots.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] p-2"
            >
              <span className={cn("text-[9px] rounded border px-1.5 py-0.5 font-medium", toneMap[l.tone])}>
                {l.platform}
              </span>
              <span className="text-[11px] font-medium truncate flex-1">{l.name}</span>
              <span className="text-[11px] font-semibold tabular-nums text-foreground">{l.amount}</span>
            </motion.div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-end gap-1.5 h-10">
            {[40, 65, 50, 82, 70, 92, 76].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, amount: 0 }}
                transition={{ delay: 0.7 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/70 via-violet-500/70 to-cyan-400/70"
                style={{ minHeight: 2 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl bg-gradient-to-br from-cyan-500/40 to-violet-500/30"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                              */
/* ------------------------------------------------------------------ */

export function Products() {
  const t = useTranslations("home.products");
  const tendercrm = siteConfig.products[0];

  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.08), transparent 40%), radial-gradient(circle at 20% 80%, rgba(167,139,250,0.06), transparent 40%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <SlideUp className="max-w-2xl">
          <span className="text-caption text-primary">{t("eyebrow")}</span>
          <h2 className="text-h1 mt-3">
            {t("headingPre")}{" "}
            <span className="text-gradient-electric">{t("headingAccent")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>
        </SlideUp>

        {/* Main product - TenderCRM */}
        <div className="mt-14 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Logo */}
          <SlideUp delay={0.1}>
            <TenderCrmPreview />
          </SlideUp>

          {/* Content */}
          <SlideUp delay={0.2}>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {tendercrm.name}
            </h3>
            <p className="text-base text-muted-foreground mt-2">{t("tagline")}</p>

            {/* Value lines - outcomes */}
            <div className="mt-5 space-y-2">
              {VALUE_KEYS.map((key) => (
                <div key={key} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-foreground/90">{t(`valueLines.${key}`)}</span>
                </div>
              ))}
            </div>

            {/* Audience + buyer */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {t("audienceLabel")}
                </p>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                  {t("audienceText")}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {t("buyerLabel")}
                </p>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                  {t("buyerText")}
                </p>
              </div>
            </div>

            {/* Technical features */}
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
                {t("insideLabel")}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {INSIDE_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span className="text-foreground/80">{t(`insideItems.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {tendercrm.stack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={tendercrm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex"
              >
                <Button variant="gradient" size="lg" rightIcon={<ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}>
                  {t("openLabel")} {tendercrm.url.replace("https://", "")}
                </Button>
              </a>
              <Link href={`/projects/${tendercrm.internalSlug}`}>
                <Button variant="outline" size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                  {t("caseStudy")}
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
