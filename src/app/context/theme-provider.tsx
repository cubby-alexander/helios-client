'use client';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext('light');

export default function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const updateColorScheme = (e) => {
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
