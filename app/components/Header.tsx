import Link from 'next/link';
// import ThemeToggle from './ThemeToggle'; // Adjust the path as necessary
import { fonts } from '@/app/fonts';
import { getScopedI18n, getCurrentLocale } from '@/locales/server';
import { LocaleSwitcher } from './LocaleSwitcher';

type NavProps = '0.title' | '0.url' //incomplete type fix

export default async function Header() {
  
  const locale = await getCurrentLocale();
  const t = await getScopedI18n('header.navItems');
  const totalNavs = 20;
  // localization doesn't really allow for nested array, so making totalNavs
  // a large number slight future proofs this for bigger navs.
  const navItems = [];
  for (let i = 0; i < totalNavs; i++) {
    const title = t(`${i}.title` as NavProps);
    if (title === `${i}.title`) break;
    navItems.push({ title, url: t(`${i}.url` as NavProps) });
  }

  return (
    <header className={`bg-gray-100 dark:bg-gray-800`}>
      <nav aria-label="Main navigation" className="flex justify-between items-center max-w-[1280px] m-auto p-4 lg:px-8">
        <ul className={`flex gap-6 lg:gap-8 ${fonts.roboto}`}>
          {navItems.map((item, index) => (
            <Link className="hover:text-amber-600" key={index} href={`/${locale}${item.url}`}>{item.title}</Link>
          ))}
        </ul>
        <div className="flex flex-row gap-3">     
          <LocaleSwitcher/>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </header>
  );
}
