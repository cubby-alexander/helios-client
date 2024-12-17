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

  const rowContainer = 'flex flex-row items-start';

  return (
    <a href='/' rel='noopener noreferrer' className={rowContainer}>
      <Image
        src='/logo-heli-light.png'
        alt='Helios Logo'
        width={70}
        height={40}
        style={{ marginLeft: '-8px' }}
        priority
        draggable={false}
      />
      <Image
        src='/logo-orbital-light.png'
        alt='Helios Logo'
        className={styles.orbital}
        width={26}
        height={34}
        priority
        draggable={false}
      />
      <Image
        src='/logo-s-light.png'
        alt='Helios Logo'
        style={{ marginLeft: '-12.5px', marginTop: '-2px' }}
        width={40}
        height={50}
        priority
        draggable={false}
      />
    </a>
  );
}
