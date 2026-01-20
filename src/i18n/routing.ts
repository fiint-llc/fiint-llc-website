// Locale configuration for client-side localStorage-based i18n

export const locales = ['en', 'ua'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ua: 'Українська',
};
