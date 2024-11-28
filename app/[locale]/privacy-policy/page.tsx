import { getScopedI18n } from '@/locales/server';

export default async function Privacy
() {

  const t = await getScopedI18n('privacy');

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-[1280px]">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <div dangerouslySetInnerHTML={{ __html: t('description') }} />
    </div>
  );
}
