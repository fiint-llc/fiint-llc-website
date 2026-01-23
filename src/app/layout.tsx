import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toast';
import '@/app/globals.css';

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL env variable is not set');
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'FI Int LLC - Finance Intelligence for Your Business',
    template: '%s | FI Int LLC',
  },
  description:
    'We build software that helps businesses understand their finances and make smarter decisions. Custom financial tools, integrations, and analytics platforms.',
  keywords: [
    'financial software development',
    'fintech',
    'custom software',
    'financial analytics',
    'business intelligence',
    'data integration',
    'DIIA City',
    'Ukraine IT',
  ],
  authors: [{ name: 'FI Int LLC' }],
  creator: 'FI Int LLC',
  publisher: 'FI Int LLC',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'FI Int LLC',
    title: 'FI Int LLC - Finance Intelligence for Your Business',
    description:
      'We build software that helps businesses understand their finances and make smarter decisions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FI Int LLC - Finance Intelligence for Your Business',
    description:
      'We build software that helps businesses understand their finances and make smarter decisions.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            {/* Skip to content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
