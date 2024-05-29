import Image from 'next/image';
import styles from './styles.module.css';

export default function HeliosLogo() {
  return (
    <div>
      <a href='/' rel='noopener noreferrer'>
        <Image src={'/Helios-2.png'} alt='Helios Logo' width={90} height={40} priority />
        <Image
          src={'/Helios-1.png'}
          alt='Helios Logo'
          className={styles.orbital}
          width={29}
          height={29}
          priority
        />
        <Image
          src={'/Helios-3.png'}
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
