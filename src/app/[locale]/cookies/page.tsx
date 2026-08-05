import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalLayout } from "@/components/legal-layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.cookies.metadata");
  return { title: t("title"), description: t("description") };
}

export default async function CookiesPage() {
  const t = await getTranslations("legal.cookies");
  return (
    <LegalLayout title={t("title")} updated={t("updated")}>
      <h2>{t("s1h")}</h2>
      <p>{t("s1p")}</p>

      <h2>{t("s2h")}</h2>
      <ul>
        <li>
          <strong>{t("s2l1Bold")}</strong> {t("s2l1Suffix")}
        </li>
        <li>
          <strong>{t("s2l2Bold")}</strong> {t("s2l2Suffix")}
        </li>
        <li>
          <strong>{t("s2l3Bold")}</strong> {t("s2l3Suffix")}
        </li>
      </ul>

      <h2>{t("s3h")}</h2>
      <p>{t("s3p")}</p>

      <h2>{t("s4h")}</h2>
      <p>{t("s4p")}</p>

      <h2>{t("s5h")}</h2>
      <p>
        {t("s5pPrefix")} <a href="mailto:info@baicore.kz">info@baicore.kz</a>.
      </p>
    </LegalLayout>
  );
}
