import styles from './styles.module.css';

export default function AppContentBox({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.content}>{children}</div>;
}
