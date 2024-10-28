// utils/fonts.ts
import { Roboto, Lora, Oswald } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
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

export const fonts = {
  roboto: roboto.className,
  lora: lora.className,
  oswald: oswald.className,
};


