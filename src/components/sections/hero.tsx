"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, FileText, Layers, Rocket, Briefcase } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/particle-field";
import { TerminalTypewriter } from "@/components/terminal-typewriter";
import { HeroChip } from "@/components/brand/hero-chip";
import { Magnetic } from "@/components/magnetic";

/* ------------------------------------------------------------------ */
/*  Hero - performance-tuned v4                                         */
/*                                                                      */
/*  No more useScroll/useTransform parallax (was the main source of     */
/*  scroll-jank on mid-spec laptops). Particle density cut further.     */
/* ------------------------------------------------------------------ */

/** 4 selling facts shown under the hero. Preferred over vanity metrics
 *  (years on market, etc.) - we tell the client what they actually get.
 *  Icon + translation key; copy lives in messages/*.json. */
const SELLING_FACTS = [
  { icon: FileText, key: "contract" },
  { icon: Layers, key: "payment" },
  { icon: Rocket, key: "scope" },
  { icon: Briefcase, key: "focus" },
] as const;

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24">
      {/* Background layers - static, no scroll-driven motion */}
      <div className="absolute inset-0 bg-circuit pointer-events-none" />
      <ParticleField density={32} />
      <div className="absolute inset-0 bg-grid mask-radial-fade opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto container-x">
        <div
          className="mx-auto grid gap-10 lg:grid-cols-[minmax(0,_1.2fr)_minmax(300px,_420px)] lg:gap-10 xl:gap-14 items-center"
          style={{ maxWidth: "min(1200px, 92vw)" }}
        >
          {/* LEFT - text content */}
          <div className="w-full mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl px-3 py-1.5 mb-5 md:mb-7"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[color:var(--data)] opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--data)]" />
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium">
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-hero font-bold"
            >
              {t("headlinePre")}{" "}
              <span className="text-gradient-electric">{t("headlineAccent")}</span>{" "}
              {t("headlinePost")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 md:mt-6 text-sm md:text-base lg:text-lg text-muted-foreground max-w-[580px] leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs - magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Magnetic radius={100} strength={0.2}>
                <Link href="/contacts">
                  <Button
                    variant="glow"
                    size="xl"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="w-full sm:w-auto"
                  >
                    {t("ctaDiscuss")}
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic radius={100} strength={0.15}>
                <Link href="/projects">
                  <Button
                    variant="terminal"
                    size="xl"
                    leftIcon={<Sparkles className="h-4 w-4" />}
                    className="w-full sm:w-auto"
                  >
                    {t("ctaViewWorks")}
                  </Button>
                </Link>
              </Magnetic>
            </motion.div>

            {/* Selling facts - заменили vanity-метрики (годы на рынке и т.п.)
                на конкретные обязательства, которые клиенту нужно знать до встречи. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[580px]"
            >
              {SELLING_FACTS.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/15 shrink-0">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs md:text-sm font-medium leading-snug">
                    {t(`sellingFacts.${f.key}`)}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Suitable-for hint - short trust-line под CTA */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-5 text-xs md:text-sm text-muted-foreground/80"
            >
              {t("suitableFor")}
            </motion.p>
          </div>

          {/* RIGHT: HeroChip + Terminal - visually distinct cluster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6 md:gap-8 w-full max-w-md mx-auto xl:mx-0"
          >
            <HeroChip />
            <div className="w-full max-w-md">
              <TerminalTypewriter />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - tall viewports only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden 2xl:flex mt-16 flex-col items-center gap-2 text-muted-foreground/60 text-xs uppercase tracking-[0.3em]"
        >
          <span>{t("scroll")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
