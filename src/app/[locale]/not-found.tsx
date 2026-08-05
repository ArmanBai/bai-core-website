import { getTranslations } from "next-intl/server";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 bg-circuit overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial-fade pointer-events-none" />
        <div className="relative z-10 text-center max-w-xl">
          <div className="font-mono text-[160px] lg:text-[220px] leading-none font-bold text-gradient-electric">
            404
          </div>
          <h1 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight">
            {t("notFound")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("notFoundDescription")}</p>
          <div className="mt-8">
            <Link href="/">
              <Button variant="glow" size="lg">
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
