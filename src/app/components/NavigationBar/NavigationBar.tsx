'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar';
import HeliosLogo from '../HeliosLogo/HeliosLogo';
import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Link from 'next/link';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Navbar
      classNames={{
        item: [
          'cursor-pointer',
          'font-light',
          'hover:text-purple-300',
          'data-[active=true]:text-primary',
          'data-[active=true]:font-medium'
        ]
      }}
      maxWidth='lg'
      position='static'
      isBlurred
      isBordered
    >
      <NavbarBrand>
        <HeliosLogo />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='end'>
        <NavbarItem isActive={pathname === '/discover'}>
          <div onClick={() => router.push('/discover')}>Discover</div>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/marketplace'}>
          <div onClick={() => router.push('/marketplace')}>Marketplace</div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
