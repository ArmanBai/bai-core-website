"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, Network, Database, LineChart } from "lucide-react";

import { FadeIn, SlideUp } from "@/components/ui/motion";

const HIGHLIGHTS = [
  { icon: Code2, key: "code" },
  { icon: Network, key: "systems" },
  { icon: Database, key: "data" },
  { icon: LineChart, key: "metrics" },
] as const;

export function Manifesto() {
  const t = useTranslations("home.manifesto");
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Mesh lines - decorative */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(closest-side, oklch(0.55 0.2 215 / 0.2), transparent)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <SlideUp>
            <span className="text-caption text-primary">{t("eyebrow")}</span>
            <h2 className="text-h1 mt-3 leading-[1.1]">
              {t("headingPre")}{" "}
              <span className="text-gradient-electric">{t("headingAccent")}</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
              {t("description")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.key}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <h.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">
                    {t(`highlights.${h.key}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </SlideUp>

          {/* Code block */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[10px] text-muted-foreground/70 tracking-wider font-mono">
                  {t("codeFile")}
                </span>
              </div>
              <pre className="p-5 font-mono text-[12.5px] sm:text-[13px] leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-muted-foreground">{`// ${t("codeComment")}`}</span>{"\n"}
                  <span className="text-[color:var(--plasma)]">type</span>{" "}
                  <span className="text-primary">Digitalization</span> = {"{"}
                  {"\n"}  problem: {"{"}{"\n"}
                  {"    "}source: <span className="text-[color:var(--data)]">&quot;{t("codeValues.source")}&quot;</span>,{"\n"}
                  {"    "}pain: <span className="text-[color:var(--data)]">&quot;{t("codeValues.pain")}&quot;</span>,{"\n"}
                  {"  "}{"}"};{"\n"}
                  {"  "}stack: {"{"}{"\n"}
                  {"    "}data: <span className="text-[color:var(--data)]">&quot;Postgres + RLS&quot;</span>,{"\n"}
                  {"    "}app: <span className="text-[color:var(--data)]">&quot;Next.js + TypeScript&quot;</span>,{"\n"}
                  {"    "}infra: <span className="text-[color:var(--data)]">&quot;Vercel + Upstash&quot;</span>,{"\n"}
                  {"    "}ops: <span className="text-[color:var(--data)]">&quot;Sentry + Playwright + CI&quot;</span>,{"\n"}
                  {"  "}{"}"};{"\n"}
                  {"  "}result: {"{"}{"\n"}
                  {"    "}process: <span className="text-[color:var(--data)]">&quot;{t("codeValues.process")}&quot;</span>,{"\n"}
                  {"    "}data: <span className="text-[color:var(--data)]">&quot;{t("codeValues.dataResult")}&quot;</span>,{"\n"}
                  {"    "}mgmt: <span className="text-[color:var(--data)]">&quot;{t("codeValues.mgmt")}&quot;</span>,{"\n"}
                  {"  "}{"}"};{"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
