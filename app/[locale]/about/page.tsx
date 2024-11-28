import { getScopedI18n } from '@/locales/server';

export default async function About() {

  const t = await getScopedI18n('about');

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-[1280px]">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <p className="mb-6">{t('description')}</p>
    </div>
  );
}
