# BAI Core - corporate site

Корпоративный сайт ТОО «BAI CORE» - разработка IT-решений и автоматизация
бизнеса в Казахстане. Продакшен на `https://baicore.kz`.

## Стек

- **Next.js 16** (App Router + Turbopack) + **React 19** + **TypeScript**
- **TailwindCSS v4** с OKLCH-палитрой и кастомными токенами под circuit-лого
- **next-intl 4** - i18n (ru / kz / en)
- **framer-motion** - анимации
- **@tsparticles** - particle mesh на hero
- **next-mdx-remote + rehype-pretty-code + shiki** - MDX-блог с syntax-highlight
- **Resend** - контактная форма
- **Supabase / Sentry / Upstash** - опционально для расширения

## Скрипты

```bash
npm run dev         # dev server (http://localhost:3000)
npm run build       # production build
npm run start       # production сервер
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run check       # lint + typecheck
```

## Структура

```
src/
├── app/
│   ├── layout.tsx              # корневой layout (html/body/fonts)
│   ├── globals.css             # tokens + utilities
│   ├── [locale]/               # i18n routes (RU, KZ, EN)
│   │   ├── layout.tsx          # NextIntlClientProvider + Theme + JSON-LD
│   │   ├── page.tsx            # главная
│   │   ├── about, services, projects, contacts, blog, ...
│   │   └── not-found.tsx
│   ├── api/contact/route.ts    # Resend
│   ├── icon.tsx                # dynamic favicon
│   ├── opengraph-image.tsx     # dynamic OG
│   ├── feed.xml/route.ts       # RSS
│   ├── robots.ts
│   └── sitemap.ts              # с hreflang alternates
├── components/
│   ├── brand/logo.tsx          # SVG BaiLogo с circuit traces
│   ├── sections/               # Hero, Manifesto, Services, Products, ...
│   ├── site-header.tsx         # nav + language switcher
│   ├── site-footer.tsx
│   ├── language-switcher.tsx
│   └── ui/                     # Button, Card, Badge, motion
├── i18n/
│   ├── routing.ts              # locales, defaultLocale, localePrefix
│   ├── request.ts              # load messages
│   └── navigation.ts           # locale-aware Link, useRouter
├── lib/
│   ├── site-config.ts
│   ├── blog.ts + blog-types.ts # MDX loader
│   ├── mdx.ts                  # remark/rehype plugins
│   └── utils.ts
├── messages/
│   ├── ru.json  (default, RU без префикса: /)
│   ├── kz.json  (/kz)
│   └── en.json  (/en)
└── middleware.ts               # next-intl routing

content/
└── blog/*.mdx                  # статьи блога
```

## Env vars

Скопируй `.env.example` в `.env.local` и заполни:

```
NEXT_PUBLIC_APP_URL=https://baicore.kz
RESEND_API_KEY=...               # для контактной формы
RESEND_CONTACT_TO=info@baicore.kz
RESEND_CONTACT_FROM=BAI Core <info@baicore.kz>
```

Без `RESEND_API_KEY` форма работает в dev-режиме: пишет в лог, возвращает ok.

## Блог

Добавление новой статьи:

1. Создай `content/blog/<slug>.mdx` с frontmatter:
   ```
   ---
   title: "..."
   excerpt: "..."
   category: "Database | Automation | Security | ..."
   date: "2026-04-12"
   readMin: 8
   cover: "indigo-cyan | violet-fuchsia | emerald-cyan | amber-orange | cyan-indigo"
   tags: ["postgres", "performance"]
   ---
   ```
2. Внутри можно использовать MDX-компонент `<Callout type="info|warn|success|danger" title="...">...</Callout>`.
3. Для `<` в тексте - экранируй как `&lt;` (иначе MDX парсит как JSX).
4. RSS и sitemap обновятся автоматически.

## i18n

- RU - default локаль (корень `/`)
- KZ и EN - через префикс (`/kz`, `/en`)
- UI-строки (nav, CTA, forms, footer) переведены на все 3 языка
- Body-контент пока на RU, body перевод на KZ/EN - отдельный редакторский этап

## SEO

- Dynamic `metadata` с hreflang alternates в `[locale]/layout.tsx`
- Organization JSON-LD на каждой странице
- BlogPosting JSON-LD на страницах статей
- `sitemap.xml` с `<xhtml:link rel="alternate" hreflang=...>` для всех локалей
- `/feed.xml` RSS 2.0
- Dynamic favicon + OG image через `ImageResponse`

## Deploy

Настроен под Vercel. При push на `main` ветку Vercel автоматически собирает
и деплоит прод. Preview-деплои для feature-веток.

Домен: `baicore.kz` (подключается в Vercel → Settings → Domains).

## Связь с другими проектами

Продукт **TenderCRM** имеет собственный домен `tendercrm.com` и отдельный
репозиторий. На странице `/projects` - outbound-ссылка, не интеграция.
