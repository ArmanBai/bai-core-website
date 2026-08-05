"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { RefreshCw, ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Route-level error boundary. Catches unhandled render errors inside
 * `[locale]/*` and shows a branded fallback instead of Next's raw overlay.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error500");

  useEffect(() => {
    console.error("[route-error]", error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 bg-circuit overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial-fade pointer-events-none" />
        <div className="relative z-10 text-center max-w-xl">
          <div className="font-mono text-[140px] lg:text-[200px] leading-none font-bold text-gradient-electric">
            500
          </div>
          <h1 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("description")}</p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-muted-foreground/60">
              {t("codeLabel")} {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="glow"
              size="lg"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={reset}
            >
              {t("retry")}
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                {t("backHome")}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
