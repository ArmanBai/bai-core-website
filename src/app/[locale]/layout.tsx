import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { routing, type AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/components/theme-provider";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = siteConfig.url;

  const localesAlternates: Record<string, string> = {};
  for (const l of routing.locales) {
    const langTag = l === "ru" ? "ru-KZ" : l === "kz" ? "kk-KZ" : "en";
    localesAlternates[langTag] = l === routing.defaultLocale ? base : `${base}/${l}`;
  }
  localesAlternates["x-default"] = base;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? base : `${base}/${locale}`,
      languages: localesAlternates,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ru" ? "ru_KZ" : locale === "kz" ? "kk_KZ" : "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === "ru" ? "ru_KZ" : l === "kz" ? "kk_KZ" : "en_US")),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as AppLocale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        {/* Sync <html lang> with current locale (client). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(
              locale === "ru" ? "ru-KZ" : locale === "kz" ? "kk-KZ" : "en"
            )};`,
          }}
        />
        {/* Skip to content - a11y */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:outline-none"
        >
          {t("skipToContent")}
        </a>
        {children}
        <OrganizationJsonLd />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

function OrganizationJsonLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Астана",
      addressCountry: "KZ",
    },
    sameAs: Object.values(siteConfig.socials),
    foundingDate: "2025",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
