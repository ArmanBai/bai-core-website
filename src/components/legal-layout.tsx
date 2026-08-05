"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("legal");
  const locale = useLocale();
  const showKzNotice = locale === "kz" && t("kzNotice").length > 0;

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow={t("eyebrow")}
          title={title}
          description={`${t("lastUpdatedPrefix")} ${updated}`}
          breadcrumbs={[{ label: title }]}
        />
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-20 lg:pb-28"
        >
          <div className="max-w-3xl mx-auto px-6 prose prose-sm dark:prose-invert max-w-none
              [&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-foreground
              [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:my-2
              [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline
              [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-sm [&_li]:text-muted-foreground
              [&_strong]:text-foreground">
            {showKzNotice && (
              <div
                role="note"
                className="not-prose mb-6 rounded-xl border border-amber-500/25 bg-amber-500/[0.04] px-4 py-3 text-xs text-amber-200/90"
              >
                {t("kzNotice")}
              </div>
            )}
            {children}
          </div>
        </motion.article>
      </main>
      <SiteFooter />
    </>
  );
}
