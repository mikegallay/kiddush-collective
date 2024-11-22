import Link from 'next/link';
import { fonts } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';
import { buttonVariants } from '@/components/ui/button';


const LinkButton = async ({ href, children, className }: { href: string; children: React.ReactNode; className?:string; }) => {

  const loc = await getCurrentLocale();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'default' }),
        'inline-flex items-center justify-center',
        `${loc==='il' ? fonts.heebo : fonts.roboto} text-base`,
        'hover:bg-amber-600',
        {className}
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
