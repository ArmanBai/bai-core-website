import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight, AlertCircle } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn, SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { BlogCard } from "@/components/blog-card";
import { ReadingProgress } from "@/components/reading-progress";
import { Newsletter } from "@/components/newsletter";
import {
  COVERS,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { remarkPlugins, rehypePlugins } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

type PageParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Enumerate canonical slugs once - the slug space is the same across
  // locales, only the rendered body differs.
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations("blog.post");
  if (!post) return { title: t("notFound") };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("blog.post");
  const ta11y = await getTranslations("a11y");
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3, locale);
  const accent = COVERS[post.cover ?? "default"] ?? COVERS.default;
  const showTranslationNotice = !post.translated;

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? "BAI Core",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <main id="main">
        {/* Hero with cover */}
        <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-30`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-dense opacity-[0.05] mask-radial-fade pointer-events-none"
          />

          <div className="relative max-w-3xl mx-auto px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              {t("back")}
            </Link>

            <FadeIn delay={0.05}>
              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-medium text-primary">
                {post.category}
              </div>
            </FadeIn>

            <SlideUp delay={0.1}>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {post.title}
              </h1>
            </SlideUp>

            <FadeIn delay={0.15}>
              <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatPostDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {post.readMin} {t("readMinSuffix")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3 w-3" />
                  {post.author ?? "BAI Core"}
                </span>
              </div>
            </FadeIn>

            {/* Cover image - rendered when the post supplies coverImage */}
            {post.coverImage && (
              <FadeIn delay={0.25}>
                <div className="mt-10 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width:768px) 768px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Content */}
        <article className="relative pb-20 lg:pb-28">
          <div className="max-w-3xl mx-auto px-6">
            {showTranslationNotice && (
              <div
                role="note"
                className="mb-8 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/[0.04] px-4 py-3 text-xs text-amber-200/90"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{t("translationNotice")}</span>
              </div>
            )}

            <MDXRemote
              source={post.content}
              components={mdxComponents({ sectionLink: ta11y("sectionLink") })}
              options={{
                mdxOptions: {
                  remarkPlugins,
                  rehypePlugins,
                },
              }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
                <span className="text-caption text-muted-foreground/80">{t("tagsLabel")}</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Newsletter */}
            <Newsletter className="mt-12" />

            {/* Author card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-caption text-primary mb-3">{t("authorEyebrow")}</p>
              <h3 className="text-lg font-semibold">{t("authorCompany")}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("authorBio")}
              </p>
              <div className="mt-4 flex gap-2">
                <Link href="/contacts">
                  <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                    {t("authorDiscussCta")}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="sm">
                    {t("authorAboutCta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="relative py-16 lg:py-24 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6">
              <SlideUp>
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-caption text-primary">{t("relatedEyebrow")}</span>
                    <h2 className="text-h2 mt-2">
                      {t("relatedHeadingPre")} «{post.category}»
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {t("relatedAllCta")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </SlideUp>

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <BlogCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Structured data for SEO. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
