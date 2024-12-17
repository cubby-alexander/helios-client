'use client';
import { createContext, PropsWithChildren, useState } from 'react';

export const ThemeContext = createContext<'light' | 'dark'>('light');

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [colorScheme] = useState<'light' | 'dark'>('dark');

  return <ThemeContext.Provider value={colorScheme}>{children}</ThemeContext.Provider>;
}
