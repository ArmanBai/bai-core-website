"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";
import { SlideUp } from "@/components/ui/motion";

type StepId = "discovery" | "design" | "build" | "ship";

const STEP_META: { id: StepId; n: string; icon: typeof Search; accent: string }[] = [
  { id: "discovery", n: "01", icon: Search,  accent: "from-cyan-500/40 to-indigo-500/30"     },
  { id: "design",    n: "02", icon: PenTool, accent: "from-indigo-500/40 to-violet-500/30"   },
  { id: "build",     n: "03", icon: Code2,   accent: "from-violet-500/40 to-fuchsia-500/30"  },
  { id: "ship",      n: "04", icon: Rocket,  accent: "from-fuchsia-500/40 to-cyan-500/30"    },
];

export function Process() {
  const t = useTranslations("home.process");

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dense opacity-[0.06] mask-radial-fade pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <SlideUp className="max-w-2xl">
          <span className="text-caption text-primary">{t("eyebrow")}</span>
          <h2 className="text-h1 mt-3">
            {t("headingPre")}{" "}
            <span className="text-gradient-electric">{t("headingAccent")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>
        </SlideUp>

        <div className="mt-16 relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(99,102,241,0) 0%, rgba(34,211,238,0.5) 15%, rgba(167,139,250,0.5) 50%, rgba(217,70,239,0.5) 85%, rgba(34,211,238,0) 100%)",
            }}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEP_META.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <div className="relative mx-auto mb-5 inline-flex">
                    <div
                      className={cn(
                        "relative z-10 h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br",
                        s.accent
                      )}
                    >
                      <div className="h-[72px] w-[72px] rounded-2xl bg-background flex items-center justify-center border border-white/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl blur-2xl opacity-50 bg-gradient-to-br",
                        s.accent
                      )}
                    />
                  </div>

                  <div className="text-center text-[11px] font-mono text-muted-foreground tracking-[0.3em] uppercase mb-2">
                    {t("stepLabel")} {s.n}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {t(`steps.${s.id}.title`)}
                      </h3>
                      <span className="text-[10px] font-mono text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">
                        {t(`steps.${s.id}.tag`)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(`steps.${s.id}.text`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
