import ThemeProvider from './context/theme-provider';

export default function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
