import Link from 'next/link';
import { fonts } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { getCurrentLocale } from '@/locales/server';
import { buttonVariants } from '@/components/ui/button';


type BtnProps = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;

const LinkButton = async ({ href, children, className, vari = 'default' }: { href: string; children: React.ReactNode; className?:string; vari:BtnProps }) => {

  const loc = await getCurrentLocale();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: vari }),
        'inline-flex items-center justify-center',
        `${loc==='il' ? fonts.heebo : fonts.roboto} text-base`,
        `${vari !=='link' ? 'hover:bg-amber-600' : 'hover:text-amber-600 p-0 h-auto'}`,
        {className}
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
