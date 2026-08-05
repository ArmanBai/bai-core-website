import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

import { SlideUp } from "@/components/ui/motion";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";

export async function LatestArticles() {
  const t = await getTranslations("home.latestArticles");
  const locale = await getLocale();
  const posts = getAllPosts(locale).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="relative py-24 lg:py-32">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SlideUp className="max-w-2xl">
            <span className="text-caption text-primary">{t("eyebrow")}</span>
            <h2 className="text-h1 mt-3">{t("heading")}</h2>
            <p className="mt-4 text-muted-foreground">{t("description")}</p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t("allArticles")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </SlideUp>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
