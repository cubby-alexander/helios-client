import styles from './page.module.css';
import HeliosLogo from './components/HeliosLogo/HeliosLogo';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <HeliosLogo />
      </div>

      <div className={styles.center}>
        <span>
          unlock space economy value in our<h2>ORBITAL SERVICE MARKET</h2>
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>
            Discover <span>-&gt;</span>
          </h2>
          <p>Use AI to see how satellites can unlock value for your organization</p>
        </div>

        <div className={styles.card}>
          <h2>Order</h2>
          <p>Find satellite operators for your mission. Coming soon...</p>
        </div>
      </div>
    </main>
  );
}
