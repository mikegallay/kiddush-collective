'use client';

import type { ReactNode } from 'react';
import { I18nProviderClient } from './client';
import { SymbolIcon } from '@radix-ui/react-icons';

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function LocaleProvider({ locale, children }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale} fallback={<div className="mt-8 w-full flex items-center"><SymbolIcon className="spin"/></div>}>
      {children}
    </I18nProviderClient>
  );
}