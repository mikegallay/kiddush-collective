import Link from 'next/link';
import {data} from '@/app/data/dummydata';
import {UserProps} from '@/app/data/globalProps'
import { getScopedI18n } from '@/locales/server';

export default async function HomePage() {
  
  const t = await getScopedI18n('home');
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {t('title')}
      </h1>
      <p className="text-lg text-center mb-8">
        {t('description')}
      </p>

      {/* Placeholder for map component */}
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Map will be displayed here</span>
      </div>

      <div className='flex flex-col'>
        {data && (data as UserProps[]).map((item:UserProps) => {
          return (
            <div className="mb-4" key={item.id}>
              <Link href={`users/${item.id}`} className="text-lg font-bold mb-2 decoration-solid">{item.id} - {item.first_name}</Link>
            </div>
          );
        })

        }
      </div>
    </main>
  );
}
