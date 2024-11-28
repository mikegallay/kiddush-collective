// CookieDrawerServer.tsx (Server Component)
import { getCurrentLocale, getScopedI18n } from '@/locales/server'; 
import CookieDrawer from './CookieDrawer'; // Import the client component

export default async function CookieDrawerServer() {
  const locale = await getCurrentLocale();
  const t = await getScopedI18n('cookies');

  const localizedContent = {
    title: t('title'),
    description: t('description'),
    confirmButton: t('confirmButton'),
  };

  return <CookieDrawer locale={locale} content={localizedContent} />;
}
