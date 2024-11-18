import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getScopedI18n } from '@/locales/server';

export default async function ThankYouPage() {

    const t = await getScopedI18n('thankyou');

    return (
      <div className="container mx-auto px-4 py-8 max-w-[1280px]">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
        <p>{t('subhead')}</p>
        <p>{t('content')}</p>
        <div className="mt-4">
          <Link href="/">
            <Button variant="default">{t('backhome')}</Button>
          </Link>
        </div>
      </div>
    );
  }
  