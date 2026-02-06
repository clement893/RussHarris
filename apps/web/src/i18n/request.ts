/**
 * i18n Request Configuration
 * Configures next-intl for Next.js 16 App Router
 * Uses static imports so the bundler includes both message files (Excel EN in en.json).
 */

import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import frMessages from './messages/fr.json';
import enMessages from './messages/en.json';

const messages: Record<Locale, typeof frMessages> = {
  fr: frMessages as typeof frMessages,
  en: enMessages as typeof frMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as Locale],
  };
});

