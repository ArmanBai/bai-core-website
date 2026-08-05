import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Rss } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SlideUp } from "@/components/ui/motion";
import { BlogCard } from "@/components/blog-card";
import { BlogCategoryFilter } from "@/components/blog-category-filter";
import { getAllPosts, getCategories } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.metadata");
  return { title: t("title"), description: t("description") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const posts = getAllPosts(locale);
  const categories = getCategories(locale);
  const [featured, ...rest] = posts;

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
        >
          <div className="flex flex-wrap gap-3 items-center text-xs text-muted-foreground">
            <span>{t("postsCount", { count: posts.length })}</span>
            <span className="text-muted-foreground/40">·</span>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
            >
              <Rss className="h-3.5 w-3.5" />
              {t("rss")}
            </Link>
          </div>
        </PageHero>

        {posts.length === 0 ? (
          <section className="py-16 lg:py-24">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <p className="text-muted-foreground">{t("empty.text")}</p>
              <Link
                href="/contacts"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
              >
                {t("empty.cta")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : (
          <section className="py-12 lg:py-16">
            <div className="max-w-6xl mx-auto px-6">
              {/* Featured */}
              {featured && (
                <SlideUp className="mb-14">
                  <p className="text-caption text-primary mb-4">{t("featured")}</p>
                  <div className="grid md:grid-cols-[2fr_1fr] gap-5">
                    <BlogCard post={featured} featured />
                    <div className="grid gap-5">
                      {rest.slice(0, 2).map((p, i) => (
                        <BlogCard key={p.slug} post={p} index={i} />
                      ))}
                    </div>
                  </div>
                </SlideUp>
              )}

              {/* All posts with filter */}
              <SlideUp delay={0.1}>
                <div className="flex items-end justify-between gap-4 flex-wrap mb-2">
                  <div>
                    <p className="text-caption text-primary">{t("archiveEyebrow")}</p>
                    <h2 className="text-h2 mt-2">{t("archiveHeading")}</h2>
                  </div>
                </div>

                <div className="mt-6">
                  <BlogCategoryFilter posts={posts} categories={categories} />
                </div>
              </SlideUp>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
