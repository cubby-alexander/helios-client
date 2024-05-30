'use client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const ThemeContext = createContext<'light' | 'dark'>('light');

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateColorScheme = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQueryList.matches ? 'dark' : 'light');
    mediaQueryList.addListener(updateColorScheme);
    return () => {
      mediaQueryList.removeListener(updateColorScheme);
    };
  }, []);

  return <ThemeContext.Provider value={colorScheme}>{children}</ThemeContext.Provider>;
}
