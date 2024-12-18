import { createI18nClient } from 'next-international/client';
// import en from './en';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, defineLocale, useCurrentLocale } =
  createI18nClient(
    {
      en: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return import('./en');
      },
      es: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return import('./es');
      },

      il: async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return import('./il');
      },
    },
    {
      // Uncomment to set base path
      // basePath: '/base',
      // Uncomment to use custom segment name
      // segmentName: 'locale',
      // Uncomment to set fallback locale
      // fallbackLocale: en,
    },
  );