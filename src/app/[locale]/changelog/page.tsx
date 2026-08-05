import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Sparkles, Wrench, Bug, Rocket } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { remarkPlugins, rehypePlugins } from "@/lib/mdx";
import { getChangelog, type ChangelogKind } from "@/lib/changelog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("changelog.metadata");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/changelog" },
  };
}

/** Next-intl locale ids → BCP-47 tags for Intl APIs. */
const DATE_LOCALE: Record<string, string> = {
  ru: "ru-RU",
  kz: "kk-KZ",
  en: "en-US",
};

const KIND_ICON: Record<ChangelogKind, typeof Sparkles> = {
  feature: Sparkles,
  improvement: Wrench,
  fix: Bug,
  release: Rocket,
};

const KIND_TONE: Record<ChangelogKind, string> = {
  feature: "bg-primary/10 border-primary/25 text-primary",
  improvement: "bg-cyan-400/10 border-cyan-400/25 text-cyan-300",
  fix: "bg-amber-400/10 border-amber-400/25 text-amber-300",
  release: "bg-emerald-400/10 border-emerald-400/25 text-emerald-300",
};

export default function ChangelogPage() {
  const t = useTranslations("changelog");
  const ta11y = useTranslations("a11y");
  const locale = useLocale();
  const entries = getChangelog();
  const dateLocale = DATE_LOCALE[locale] ?? "en-US";
  const mdx = mdxComponents({ sectionLink: ta11y("sectionLink") });

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
            {entries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                <p className="text-sm text-muted-foreground">{t("empty")}</p>
              </div>
            ) : (
              <div className="relative space-y-10">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent" />

                {entries.map((e, i) => {
                  const Icon = KIND_ICON[e.kind];
                  const tone = KIND_TONE[e.kind];
                  return (
                    <SlideUp key={e.slug} delay={i * 0.05}>
                      <article className="relative pl-8">
                        <span
                          className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-background ${tone}`}
                          aria-hidden="true"
                        >
                          <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                        </span>

                        <header className="flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-mono ${tone}`}
                          >
                            <Icon className="h-3 w-3" />
                            {t(`kinds.${e.kind}`)}
                          </span>
                          <time className="text-xs font-mono text-muted-foreground">
                            {new Date(e.date).toLocaleDateString(dateLocale, {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </header>

                        <h2 className="mt-2 text-xl lg:text-2xl font-semibold tracking-tight">
                          {e.title}
                        </h2>
                        {e.summary && (
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            {e.summary}
                          </p>
                        )}
                        <div className="prose prose-invert max-w-none mt-4 text-sm">
                          <MDXRemote
                            source={e.content}
                            components={mdx}
                            options={{
                              mdxOptions: { remarkPlugins, rehypePlugins },
                            }}
                          />
                        </div>
                      </article>
                    </SlideUp>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
