# AI Collaboration Guide for FI Int LLC Website

This document provides guidelines for AI assistants working on this codebase.

## Project Overview

This is the marketing website for FI Int LLC, a software development company specializing in financial software. The site is built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and uses next-intl for internationalization.

## Key Principles

### 1. Content Management

- **English is the source of truth** — all text originates in `src/messages/en.json`
- **Never hardcode text** — all user-facing strings must be in message files
- **Translation workflow** — update `en.json` first, then sync to `ua.json` using the provided scripts

### 2. Design System

The design system is defined in `tailwind.config.ts` and `src/app/globals.css`. **Do not deviate from it.**

**Colors (RAL7033-inspired forest green palette):**

- Primary accent: Forest Green (`primary-500` = #5a7d5a)
- Secondary accent: Sage/Olive (`secondary-500` = #7a8b63)
- Tertiary accent: Light Sage (`accent-500` = #8fa882)
- Never use more than 2 accent colors in one view

**Spacing:**

- Use `section-spacing` class for consistent vertical rhythm
- Use `Container` component for horizontal containment
- Avoid arbitrary margins/paddings

**Typography:**

- Limited font sizes (defined as `text-display-*`, `text-heading-*`, `text-body-*`)
- Strong hierarchy, clear readability
- Line length optimized with `max-w-prose`

**Motion:**

- Subtle animations only (`fade-in`, `fade-up`, `scale-in`)
- No continuous or distracting animations
- Use sparingly: section reveal, card hover, button interactions

### 3. Component Architecture

```
src/
├── app/              # Next.js App Router pages
│   ├── [locale]/     # Locale-specific pages
│   └── api/          # API routes (contact form)
├── components/
│   ├── layout/       # Container, Section, Header, Footer
│   ├── sections/     # Homepage sections (Hero, Services, etc.)
│   └── ui/           # Reusable UI primitives (Button, Card, Input)
├── lib/              # Utilities and schemas
├── messages/         # i18n translation files
└── i18n.ts          # Internationalization config
```

### 4. Before Making Changes

1. **Check mobile layout** — ensure responsive behavior is intentional
2. **Check accessibility** — verify ARIA labels, contrast, keyboard navigation
3. **Check both locales** — EN and UK must both work correctly
4. **Preserve design system** — don't add arbitrary colors, spacing, or fonts

### 5. Common Tasks

#### Updating Marketing Copy

```bash
1. Edit src/messages/en.json
2. Run: pnpm i18n:sync
3. Review changes in ua.json
4. Test both locales visually
```

#### Adding a New Section

```typescript
1. Create component in src/components/sections/
2. Use Section and SectionHeader from layout
3. Follow existing section patterns
4. Add i18n keys to messages files
5. Import and add to page.tsx
```

#### Modifying Design System

```
1. Edit tailwind.config.ts for tokens
2. Edit globals.css for CSS variables
3. Test light and dark modes
4. Document changes here
```

### 6. Environment Variables

Required for production:

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
```

See `.env.example` for full list.

### 7. Deployment

- **Platform:** Vercel (free tier)
- **Domain:** Configured via Vercel
- **No paid services** — this is a hard requirement

### 8. What NOT to Do

- Don't introduce paid third-party services
- Don't hardcode text outside message files
- Don't add complex animations or visual gimmicks
- Don't break the design system consistency
- Don't change the neutral, professional tone

## Quick Reference

| Task          | File(s)                    |
| ------------- | -------------------------- |
| Update copy   | `src/messages/en.json`     |
| Change colors | `tailwind.config.ts`       |
| Add section   | `src/components/sections/` |
| Modify layout | `src/components/layout/`   |
| API endpoints | `src/app/api/`             |

---

_This file is part of the project's AI collaboration documentation._
