/**
 * Central site config - used by metadata, nav, footer, JSON-LD.
 */

export const siteConfig = {
  name: "BAI Core",
  /** Brand used across UI copy. Legal form is in `legalEntity`. */
  legalName: "BAI Core",
  /** Only used in legal/privacy/terms and the footer micro-line. */
  legalEntity: "ТОО «BAI Core»",
  tagline: "Разработка IT-решений и автоматизация бизнеса",
  description:
    "BAI Core разрабатывает SaaS-продукты, автоматизирует бизнес-процессы, " +
    "создаёт внутренние системы учёта и аналитики для компаний в Казахстане.",
  url: "https://baicore.kz",
  ogImage: "/og.png",
  locale: "ru_KZ",
  email: "arman.bai.data@gmail.com",
  phone: "+7 (707) 555-20-62",
  // Machine-friendly form for tel: links. Keep digits only, with leading +.
  phoneHref: "+77075552062",
  city: "Астана, Казахстан",
  socials: {
    linkedin: "https://www.linkedin.com/company/bai-core",
    github: "https://github.com/ArmanBai",
    instagram: "https://www.instagram.com/baicore.kz",
  },
  nav: [
    { label: "Главная", href: "/" },
    { label: "О нас", href: "/about" },
    { label: "Услуги", href: "/services" },
    { label: "Как работаем", href: "/how-we-work" },
    { label: "Кейсы", href: "/cases" },
    { label: "Проекты", href: "/projects" },
    { label: "Блог", href: "/blog" },
    { label: "Контакты", href: "/contacts" },
  ],
  // Products & external product domains
  products: [
    {
      id: "tendercrm",
      name: "TenderCRM",
      tagline: "Управление тендерами и расчёт маржинальности в РК",
      description:
        "Единая платформа для учёта тендерных лотов, AI-разбора ТЗ, расчёта прибыли " +
        "и аналитики закупок для поставщиков и тендерных специалистов.",
      // Временный URL до привязки домена tendercrm.kz
      url: "https://tender-crm.vercel.app",
      internalSlug: "tendercrm",
      status: "live" as const,
      stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Claude API"],
      launchYear: 2026,
    },
  ],
} as const;

export type Product = (typeof siteConfig.products)[number];
