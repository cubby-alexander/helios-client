'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-provider';

export default function HeliosLogo() {
  const colorScheme = useContext(ThemeContext);

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
        <picture>
          <source srcSet='/logo-heli-dark.png' media='(prefers-color-scheme: light)' />
          <Image src='/logo-heli-light.png' alt='Helios Logo' width={90} height={40} priority />
        </picture>
        <picture>
          <source srcSet='/logo-orbital-dark.png' media='(prefers-color-scheme: light)' />
          <Image
            src='/logo-orbital-light.png'
            alt='Helios Logo'
            className={styles.orbital}
            width={48}
            height={45}
            priority
          />
        </picture>
        <picture style={{ marginLeft: '-36px' }}>
          <source srcSet='/logo-s-dark.png' media='(prefers-color-scheme: light)' />
          <Image src='/logo-s-light.png' alt='Helios Logo' width={52} height={50} priority />
        </picture>
      </a>
    </div>
  );
}
