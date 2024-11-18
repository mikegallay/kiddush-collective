// components/SkipToContent.tsx
import React from 'react';
import { getScopedI18n } from '@/locales/server';

export default async function SkipToContent() {

  const t = await getScopedI18n('header');

  return (
    <a
      href="#main-content"
      className="skip-to-content-link absolute top-0 left-0 w-full p-4 bg-black text-white text-center font-bold transform -translate-y-full transition-transform duration-300 z-50 focus:relative focus:translate-y-0"
    >
      {t('skipToMain')}
    </a>
  );
};
