import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "kz", "en"],
  defaultLocale: "ru",
  // RU без префикса (/), KZ и EN с префиксом (/kz, /en)
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
