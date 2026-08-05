"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[#0A0A1B] p-10 lg:p-16 text-center">
          {/* Animated mesh blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px]"
              style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.4), transparent)" }}
              animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-20%] right-[20%] w-[440px] h-[440px] rounded-full blur-[140px]"
              style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.35), transparent)" }}
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at 50% 50%, black 35%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 50%, black 35%, transparent 80%)",
              }}
            />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl px-3 py-1 mb-6"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[color:var(--data)] opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--data)]" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl mx-auto"
            >
              {t("headingPre")}{" "}
              <span className="text-gradient-electric">{t("headingAccent")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/contacts">
                <Button
                  variant="glow"
                  size="xl"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  {t("ctaDiscuss")}
                </Button>
              </Link>
              <a href={`mailto:${siteConfig.email}`}>
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<Mail className="h-4 w-4" />}
                  className="border-white/15 text-white/90 hover:bg-white/5"
                >
                  {siteConfig.email}
                </Button>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-2 text-[11px] text-muted-foreground"
            >
              <Calendar className="h-3 w-3" />
              {t("replyTime")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
