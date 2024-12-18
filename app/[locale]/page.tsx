import Link from 'next/link';
import Image from 'next/image';
import {data} from '@/app/data/dummydata';
import { fonts } from '@/app/fonts';
import dynamic from 'next/dynamic';
import {UserProps} from '@/app/data/globalProps'
import { getScopedI18n, getCurrentLocale } from '@/locales/server';
import  LinkButton  from '@/app/components/ui/LinkButton';
import { TriangleRightIcon, TriangleLeftIcon, SymbolIcon } from '@radix-ui/react-icons';
// import MapHome from '@/app/components/MapHome'

export default async function HomePage() {
  
  const t = await getScopedI18n('home');
  const loc = await getCurrentLocale();
  const u = await getScopedI18n('upload');

  const DynamicMap = dynamic(() => import('@/app/components/MapHome'), { 
    ssr: false,
    loading: () => (
      <div className="mt-8 w-full flex items-center justify-center">
        <SymbolIcon className="spin" />
      </div>
    ), });

  const ArrowIcon = loc === "il" ? TriangleLeftIcon : TriangleRightIcon
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4">
      <section className='px-5 pt-2 pb-8 lg:px-8 lg:pt-6 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start max-w-[1280px]'>
        <div className="flex-1 w-full lg:w-3/5 flex flex-col text-center items-center lg:items-start lg:text-start">
          <h1 className={`${fonts.roboto} text-xl lg:text-lg mb-3 font-semibold tracking-wide upppercase text-black`}>{t('prehead')}</h1>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-3 text-[var(--accent)] text-nowrap`} dangerouslySetInnerHTML={{ __html: t('title') }} />
          <p className="text-base mb-4 md:max-w-[600px]">
            {t('description')}
          </p>
          <LinkButton href="upload" className="hover:bg-[var(--accent)]">
            {t('button')} <ArrowIcon className="scale-150"/>
          </LinkButton>
        </div>
        <div className='w-full h-auto mb-3 lg:mb-0 lg:w-2/5'>
          {/* <Image className="m-auto" src="/images/shabbat.svg" alt="Kiddush Collective homepage hero" width={500} height={500}/> */}
          <Image priority className="m-auto max-h-60 w-auto lg:max-h-none" src="/images/home_hero.jpg" alt="Kiddush Collective homepage hero" width={500} height={500}/>
        </div>
      </section>
      

      {/* map component */}
      <section className="w-full h-96 bg-gray-200 flex items-center justify-center">
        {/* <span className="text-gray-500">Map will be displayed here</span> */}
        <DynamicMap loc={loc} tooltip={t('mapTooltip')}/>
      </section>

      {/* <section className='flex flex-col'>
        {data && (data as UserProps[]).map((item:UserProps) => {
          return (
            <div className="mb-4" key={item.slug}>
              <Link href={`${loc}/users/${item.slug}`} className="text-lg font-bold mb-2 decoration-solid">{item.slug} - {item.first_name}</Link>
            </div>
          );
        })

        }
      </section> */}
    </div>
  );
}
