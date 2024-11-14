import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SkipToContent from './components/SkipToContent';

export const metadata = {
  title: 'The Kiddush Collective',
  description: 'A global catalog of how Kiddush is said around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors">
        <ThemeProvider>
          <AudioProvider>
            <section className="wrapper flex flex-col min-h-screen">
              <SkipToContent/>
              <Header />
                <main id="main-content" role="main" className="flex-grow">{children}</main>
              <Footer />
            </section>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
