'use client';

import * as React from 'react';
import { IntlProvider } from 'next-intl';
import type { Locale } from './routing';
import { defaultLocale, locales } from './routing';

// Import messages statically
import enMessages from '@/messages/en.json';
import ukMessages from '@/messages/ua.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  ua: ukMessages,
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => { },
});

const LOCALE_STORAGE_KEY = 'fiint-locale';

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) {
      return stored as Locale;
    }
  } catch {
    // localStorage might not be available
  }

  return defaultLocale;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);
  const [mounted, setMounted] = React.useState(false);

  // Initialize locale from localStorage on mount
  React.useEffect(() => {
    const storedLocale = getStoredLocale();
    setLocaleState(storedLocale);
    document.documentElement.lang = storedLocale;
    setMounted(true);
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {
      // localStorage might not be available
    }
    document.documentElement.lang = newLocale;
  }, []);

  const value = React.useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  // Use default locale for SSR, then switch on client
  const currentLocale = mounted ? locale : defaultLocale;
  const currentMessages = messages[currentLocale];

  return (
    <LocaleContext.Provider value={value}>
      <IntlProvider
        locale={currentLocale}
        messages={currentMessages}
        timeZone="Europe/Kyiv"
        now={new Date()}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return React.useContext(LocaleContext);
}
