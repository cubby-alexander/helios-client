'use client';
import Image from 'next/image';
import styles from './styles.module.css';

export default function HeliosLogo() {
  const logoMap = {
    logoHeli: {
      light: '/logo-heli-dark.png',
      dark: '/logo-heli-light.png'
    },
    logoOrbital: {
      light: '/logo-orbital-dark.png',
      dark: '/logo-orbital-light.png'
    },
    logoS: {
      light: '/logo-s-dark.png',
      dark: '/logo-s-light.png'
    }
  };

  return (
    <div>
      <a href='/' rel='noopener noreferrer'>
        <Image src='/logo-heli-light.png' alt='Helios Logo' width={90} height={40} priority />
        <Image
          src='/logo-orbital-light.png'
          alt='Helios Logo'
          className={styles.orbital}
          width={34}
          height={34}
          priority
        />
        <Image
          src='/logo-s-light.png'
          alt='Helios Logo'
          style={{ marginLeft: '-22px' }}
          width={50}
          height={50}
          priority
        />
      </a>
    </div>
  );
}
