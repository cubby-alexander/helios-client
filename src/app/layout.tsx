import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import styles from './page.module.css';
import HeliosLogo from './components/HeliosLogo/HeliosLogo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Helios',
  description: 'Orbital service marketplace'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className={`relative z-15 dark bg-background ${styles.main}`}>
            <div className={styles.description}>
              <HeliosLogo />
            </div>
            {children}
          </main>
          <div
            aria-hidden='true'
            className='fixed dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0'
          >
            <img
              data-loaded='true'
              className='relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large'
              src={'/gradient-left.png'}
              alt={'Background Gradient'}
            />
          </div>
          <div
            aria-hidden='true'
            className='fixed dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12'
          >
            <img
              data-loaded='true'
              className='relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large'
              src={'/gradient-right.png'}
              alt={'Background Gradient'}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
