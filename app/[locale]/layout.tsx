import '@/app/globals.css';
// import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import { LocaleProvider } from '@/locales/provider';
import { getCurrentLocale } from '@/locales/server';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SkipToContent from '../components/SkipToContent';
import { fonts } from '@/app/fonts';

export const metadata = {
  title: 'The Kiddush Collective',
  description: 'A global catalog of how Kiddush is said around the world.',
};


export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>

}) {

  const { locale } = await params;
  
  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'il' ? 'rtl' : 'ltr'}>
      <body className={`${locale === 'il' && fonts.heebo} bg-white text-black dark:bg-black dark:text-white transition-colors`}>
        <LocaleProvider locale={locale}>
          {/* <ThemeProvider> */}
            <AudioProvider>
              <section className="wrapper flex flex-col min-h-screen">
                <SkipToContent/>
                <Header />
                  <main id="main-content" role="main" className="flex-grow">{children}</main>
                <Footer />
              </section>
            </AudioProvider>
          {/* </ThemeProvider> */}
        </LocaleProvider>
      </body>
    </html>
  );
}
