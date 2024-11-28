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
  const [isOpen, setIsOpen] = useState(false);
  const [allowClose, setAllowClose] = useState(false);

  useEffect(() => {
    const acknowledged = getCookie('cookieAcknowledged');
    if (!acknowledged) setIsOpen(true);
  }, []);

  useEffect(() => {
    if (allowClose) {
      setIsOpen(false);
    }
  }, [allowClose]);

  const handleAcknowledge = () => {
    console.log('acknolegde');
    
    setCookie("cookieAcknowledged", "true", { path: "/", maxAge: 365 * 24 * 60 * 60 });
    setAllowClose(true); // Allow the drawer to close
  };

  return (
    <Drawer 
        open={isOpen}
        onOpenChange={(open) => {
            if (!allowClose) {
                setIsOpen(true); // Prevent closing via drag or outside click
              } else {
                setIsOpen(open); // Allow controlled closing after "Acknowledge"
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
