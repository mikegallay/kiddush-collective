"use client";

import { useEffect, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { setCookie, getCookie } from '@/app/utils/cookies';

interface CookieDrawerProps {
  locale: string;
  content: { title: string; description: string, confirmButton:string };
}

export default function CookieDrawer({ locale, content }: CookieDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const acknowledged = getCookie('cookieAcknowledged');
    if (acknowledged === 'true') {
      setIsOpen(false);
    }
  }, []);

  const handleAcknowledge = () => {
    setCookie('cookieAcknowledged', 'true', { path: '/', maxAge: 365 * 24 * 60 * 60 });
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => {
        // Prevent closing when clicking outside or pressing Esc
        if (!open) {
          setIsOpen(true);
        }
      }}>
      <DrawerContent className="no-drag-handle" data-vaul-no-drag>
        <DrawerHeader>
          <DrawerTitle>{content.title}</DrawerTitle>
          <DrawerDescription>{content.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button size="lg" className="w-1/2" onClick={handleAcknowledge}>
            {content.confirmButton}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
