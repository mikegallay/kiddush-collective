import { getScopedI18n } from '@/locales/server';
import UploadForm from '@/app/components/UploadForm';

export default async function UploadPage() {

  const t = await getScopedI18n('upload');
  const localeData = {
    fname: t('fname'),
    linitial: t('linitial'),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <p className="mb-6">{t('description')}</p>

      {/* Render the Upload Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <UploadForm localeData={localeData}/>
      </div>
    </div>
  );
}
