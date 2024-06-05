import ThemeProvider from './context/theme-provider';
import { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextUIProvider>
  );
}
