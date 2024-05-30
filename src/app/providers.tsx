import ThemeProvider from './context/theme-provider';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
