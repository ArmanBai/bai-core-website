import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/lib/env";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const inter = Inter({
  // cyrillic-ext includes the Kazakh-specific glyphs (ұ, қ, ғ, ң, һ,
  // ә, ө, і). Without it the browser falls back to another font for
  // those letters only - e.g. "Жұмыстарды" renders with a mismatched
  // "ұ" that looks heavier than the rest of the word.
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  // Renamed from --font-sans so globals.css can re-export it as a
  // proper fallback stack; the Tailwind `font-sans` utility reads
  // --font-sans (the stack), not this single-font variable.
  variable: "--font-sans-var",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  // Same renaming reason as above. JetBrains Mono is missing a few
  // Kazakh glyphs (ұ visibly renders in Consolas fallback as
  // "heavier" on Windows). globals.css builds a fallback chain so
  // those missing chars land on Inter (which has full coverage)
  // rather than the system monospace.
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06060E" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root layout is intentionally minimal - the locale-aware layout
 * (`[locale]/layout.tsx`) adds <html lang> and <NextIntlClientProvider>.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
