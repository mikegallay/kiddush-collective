import Link from 'next/link';
import { fonts } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'default' }),
        'inline-flex items-center justify-center',
        `${fonts.oswald} text-base`,
        'hover:bg-amber-600'
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
