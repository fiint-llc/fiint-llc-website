'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeLabels, type Locale } from '@/i18n/routing';
import { useLocale } from '@/i18n/LocaleContext';

interface LanguageSwitcherProps {
  variant?: 'icon' | 'full';
}

// Short labels for the compact display
const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  ua: 'UA',
};

export function LanguageSwitcher({ variant = 'icon' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (variant === 'full') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  if (variant === 'full') {
    return (
      <div className="flex flex-col gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={cn(
              'text-left px-3 py-2 rounded-md transition-colors',
              locale === loc
                ? 'bg-primary-500/10 text-primary-500 font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            {localeLabels[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-accent transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'text-sm font-medium'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground">{localeShortLabels[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-40 rounded-lg border border-border bg-card shadow-lg animate-scale-in z-50 overflow-hidden">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between',
                  locale === loc
                    ? 'bg-primary-500/10 text-primary-500 font-medium'
                    : 'text-foreground hover:bg-accent'
                )}
              >
                <span>{localeLabels[loc]}</span>
                <span className="text-xs text-muted-foreground">{localeShortLabels[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
