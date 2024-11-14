import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Adjust the path as necessary
import { getI18n, getScopedI18n } from '@/locales/server';
import { LocaleSwitcher } from './LocaleSwitcher';

export default async function Header() {

  const t = await getScopedI18n('header.navItems');
  const totalNavs = 4;
  const navItems = Array.from({ length: totalNavs }, (_, index) => ({
    title: t(`${index}.title`),
    url: t(`${index}.url`),
  }));

  return (
    <header className={`bg-gray-100 dark:bg-gray-800 p-4`}>
      <nav aria-label="Main navigation" className="flex justify-between items-center max-w-[1024px] m-auto px-6">
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.url}>{item.title}</Link>
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
