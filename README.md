# FI Int LLC Website

Marketing website for FI Int LLC — Finance Intelligence for Your Business.

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom (shadcn/ui inspired)
- **i18n:** next-intl
- **Theme:** next-themes
- **Forms:** react-hook-form + zod
- **Email:** nodemailer

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── public/              # Static assets
│   └── images/logo/     # Logo variants
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── [locale]/   # Locale-specific pages
│   │   └── api/        # API routes
│   ├── components/
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Homepage sections
│   │   └── ui/         # UI primitives
│   ├── lib/            # Utilities
│   ├── messages/       # i18n translations
│   └── i18n.ts         # i18n configuration
├── CLAUDE.md           # AI collaboration guide
├── BRAND.md            # Brand guidelines
└── README.md           # This file
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact form
CONTACT_TO_EMAIL=contact@fiint.com
CONTACT_FROM_EMAIL=noreply@fiint.com

# Site URL (for sitemap, OpenGraph)
NEXT_PUBLIC_SITE_URL=https://fiint.com
```

## Internationalization

The site supports English (default) and Ukrainian.

**Editing content:**
```bash
# 1. Edit English content (source of truth)
# src/messages/en.json

# 2. Check for missing translations
pnpm i18n:check

# 3. Sync translations (generates placeholders)
pnpm i18n:sync
```

**Routes:**
- `/en` — English
- `/ua` — Ukrainian

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables on Vercel

Add the following in Vercel Dashboard → Settings → Environment Variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

### Domain Setup

1. In Vercel: Settings → Domains → Add
2. Add DNS records as instructed
3. Wait for SSL provisioning

## Contact Form

The contact form includes:
- Server-side validation (zod)
- Honeypot field (anti-spam)
- Submission timing check (anti-bot)
- Rate limiting (5 requests/minute/IP)
- SMTP email delivery

**Testing locally without SMTP:**
The form will log submissions to console if SMTP is not configured.

## Design System

See `BRAND.md` for complete brand guidelines.

**Key colors (RAL7033-inspired forest green palette):**
- Primary (Forest Green): `#5a7d5a`
- Secondary (Sage/Olive): `#7a8b63`
- Accent (Light Sage): `#8fa882`

**Typography:**
- Font: Inter (via next/font)
- Sizes: display, heading, body, caption

## Development Guidelines

See `CLAUDE.md` for detailed AI collaboration guidelines.

**Key principles:**
1. English is the source of truth for content
2. Never hardcode text outside message files
3. Follow the design system strictly
4. Test both locales and themes

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm i18n:check   # Check for missing translations
pnpm i18n:sync    # Sync translation files
```

## License

Proprietary — FI Int LLC
