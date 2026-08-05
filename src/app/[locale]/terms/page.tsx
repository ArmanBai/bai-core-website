import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalLayout } from "@/components/legal-layout";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.terms.metadata");
  return { title: t("title"), description: t("description") };
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");
  return (
    <LegalLayout title={t("title")} updated={t("updated")}>
      <h2>{t("s1h")}</h2>
      <p>
        {t("s1pPrefix")} <strong>{t("s1pDomain")}</strong>
        {t("s1pSuffix")}
      </p>

      <h2>{t("s2h")}</h2>
      <p>{t("s2p1")}</p>
      <p>{t("s2p2")}</p>

      <h2>{t("s3h")}</h2>
      <p>{t("s3p1")}</p>
      <p>{t("s3p2")}</p>

      <h2>{t("s4h")}</h2>
      <p>{t("s4p1")}</p>
      <p>{t("s4p2")}</p>

      <h2>{t("s5h")}</h2>
      <p>
        {t("s5pPrefix")} <Link href="/privacy">{t("s5pLink")}</Link>
        {t("s5pSuffix")}
      </p>

      <h2>{t("s6h")}</h2>
      <p>{t("s6p")}</p>

      <h2>{t("s7h")}</h2>
      <p>
        {t("s7pPrefix")} <a href="mailto:info@baicore.kz">info@baicore.kz</a>.
      </p>
    </LegalLayout>
  );
}
