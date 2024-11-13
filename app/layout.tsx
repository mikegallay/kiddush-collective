import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
            <Header />
              <main>{children}</main>
            <Footer />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
