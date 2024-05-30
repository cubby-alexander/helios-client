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
        <Image
          src={logoMap.logoHeli[colorScheme]}
          alt='Helios Logo'
          width={90}
          height={40}
          priority
        />
        <Image
          src={logoMap.logoOrbital[colorScheme]}
          alt='Helios Logo'
          className={styles.orbital}
          width={29}
          height={29}
          priority
        />
        <Image
          src={logoMap.logoS[colorScheme]}
          alt='Helios Logo'
          style={{ marginLeft: '-22px' }}
          width={45}
          height={44}
          priority
        />
      </a>
    </div>
  );
}
