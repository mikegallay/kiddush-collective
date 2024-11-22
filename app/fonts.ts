// utils/fonts.ts
import { Roboto_Condensed, Lora, Oswald, Heebo  } from 'next/font/google'

const roboto = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

const lora = Lora({
  weight: ['400'],
  subsets: ['latin'],
});

const oswald = Oswald({
    weight: ['500'],
    subsets: ['latin'],
  });

const heebo = Heebo({
  weight: ['500'],
  subsets: ['latin'],
});

export const fonts = {
  roboto: roboto.className,
  lora: lora.className,
  oswald: oswald.className,
  heebo: heebo.className
};


