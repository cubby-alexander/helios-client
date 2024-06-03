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
          <main className={`dark ${styles.main}`}>
            <div className={styles.description}>
              <HeliosLogo />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
