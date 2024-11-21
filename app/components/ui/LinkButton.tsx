import Link from 'next/link';
import { cn } from '@/lib/utils'; // ShadCN utility for combining classNames
import { buttonVariants } from '@/components/ui/button'; // ShadCN button styles

const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'default' }), // Apply the button styles
        'inline-flex items-center justify-center'
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
