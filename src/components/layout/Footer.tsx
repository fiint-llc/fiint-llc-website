'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MapPin, Mail, Building2, ArrowUpRight } from 'lucide-react';
import { Container } from './Container';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/70 via-neutral-950 to-secondary-950/40 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 blob blob-primary opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 blob blob-secondary opacity-8" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <Container>
        <div className="relative py-16 lg:py-20">
          {/* Main grid */}
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Logo variant="mono" className="text-white" />
              <p className="mt-6 text-neutral-400 max-w-md text-base leading-relaxed">
                {t('tagline')}
              </p>

              {/* Made in Ukraine badge */}
              <a
                href="https://u24.gov.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all group"
              >
                <span className="text-2xl">🇺🇦</span>
                <span className="text-neutral-300 text-sm font-medium group-hover:text-white transition-colors">{t('legal.ukraine')}</span>
                <ArrowUpRight className="h-3 w-3 text-neutral-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Company Info Column */}
            <div className="lg:col-span-3">
              <h3 className="font-display font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                {t('companyInfo.title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    <Building2 className="h-4 w-4 text-primary-400" />
                  </div>
                  <div className="text-sm pt-0.5">
                    <span className="text-neutral-500 block text-xs uppercase tracking-wide mb-0.5">{t('companyInfo.registrationLabel')}</span>
                    <span className="text-white font-medium">{t('companyInfo.registrationNumber')}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-secondary-500/10 flex items-center justify-center shrink-0 group-hover:bg-secondary-500/20 transition-colors">
                    <MapPin className="h-4 w-4 text-secondary-400" />
                  </div>
                  <div className="text-sm pt-0.5">
                    <span className="text-neutral-500 block text-xs uppercase tracking-wide mb-0.5">{t('companyInfo.addressLabel')}</span>
                    <a
                      href="https://maps.google.com/?q=Chornovola+ave,+Lviv,+Ukraine"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-secondary-400 transition-colors flex items-center gap-1"
                    >
                      {t('companyInfo.address')}
                      <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                    <Mail className="h-4 w-4 text-accent-400" />
                  </div>
                  <a
                    href={`mailto:${t('companyInfo.email')}`}
                    className="text-white font-medium hover:text-primary-400 transition-colors flex items-center gap-1 text-sm pt-2"
                  >
                    {t('companyInfo.email')}
                    <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links Column */}
            <div className="lg:col-span-2">
              <h3 className="font-display font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                {t('legal.title')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {t('links.privacy')}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {t('links.terms')}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Language Column */}
            <div className="lg:col-span-2">
              <h3 className="font-display font-semibold text-white mb-6 text-sm uppercase tracking-wider">{t('language')}</h3>
              <LanguageSwitcher variant="full" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="text-sm text-neutral-400">
              Software Development •{' '}
              <a
                href="https://maps.google.com/?q=Lviv,+Ukraine"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Lviv, Ukraine
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
