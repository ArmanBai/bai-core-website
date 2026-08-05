import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalLayout } from "@/components/legal-layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy.metadata");
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");
  return (
    <LegalLayout title={t("title")} updated={t("updated")}>
      <p>{t("intro")}</p>

      <h2>{t("s1h")}</h2>
      <p>{t("s1p1")}</p>
      <p>{t("s1p2")}</p>
      <p>{t("s1p3")}</p>

      <h2>{t("s2h")}</h2>
      <ul>
        <li>{t("s2l1")}</li>
        <li>{t("s2l2")}</li>
        <li>{t("s2l3")}</li>
        <li>{t("s2l4")}</li>
      </ul>

      <h2>{t("s3h")}</h2>
      <p>
        {t("s3p1Prefix")} <strong>{t("s3p1NotSell")}</strong> {t("s3p1And")}{" "}
        <strong>{t("s3p1NotShare")}</strong> {t("s3p1Suffix")}
      </p>
      <p>{t("s3p2")}</p>

      <h2>{t("s4h")}</h2>
      <p>{t("s4p1")}</p>
      <p>{t("s4p2")}</p>
      <p>{t("s4p3")}</p>

      <h2>{t("s5h")}</h2>
      <ul>
        <li>{t("s5l1")}</li>
        <li>{t("s5l2")}</li>
        <li>{t("s5l3")}</li>
        <li>{t("s5l4")}</li>
      </ul>

      <h2>{t("s6h")}</h2>
      <p>
        {t("s6pPrefix")} <a href="mailto:info@baicore.kz">info@baicore.kz</a>.
      </p>
    </LegalLayout>
  );
}
