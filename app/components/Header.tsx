import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Adjust the path as necessary
import { getScopedI18n, getCurrentLocale } from '@/locales/server';
import { LocaleSwitcher } from './LocaleSwitcher';

type NavProps = '0.title' | '0.url' //incomplete type fix

export default async function Header() {
  
  const locale = await getCurrentLocale();
  const t = await getScopedI18n('header.navItems');
  const totalNavs = 4;
  const navItems = Array.from({ length: totalNavs }, (_, index) => ({
    title: t(`${index}.title` as NavProps),
    url: t(`${index}.url` as NavProps),
  }));

  console.log('locale',locale);
  

  return (
    <header className={`bg-gray-100 dark:bg-gray-800 p-4`}>
      <nav aria-label="Main navigation" className="flex justify-between items-center max-w-[1024px] m-auto px-6">
        <ul className="flex gap-6 lg:gap-8">
          {navItems.map((item, index) => (
            <Link key={index} href={`/${locale}${item.url}`}>{item.title}</Link>
          ))}
        </ul>
        <div className="flex flex-row gap-3">     
          <LocaleSwitcher/>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
