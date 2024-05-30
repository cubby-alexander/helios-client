'use client';
import styles from './page.module.css';
import { CONTENT } from './enums';

interface LandingContentProps {
  changeContent: (content: CONTENT) => () => void;
}

export default function LandingContent({ changeContent }: LandingContentProps) {
  return (
    <div className={styles.landing}>
      <div className={styles.center}>
        <span>
          unlock space economy value in our
          <h2>ORBITAL SERVICE MARKET</h2>
        </span>
      </div>

      <div className={styles.grid}>
        <div
          className={`${styles.card} cursor-pointer`}
          onClick={() => changeContent(CONTENT.DISCOVERY_FLOW)}
        >
          <h2>
            Discover Value<span>-&gt;</span>
          </h2>
          <p>Use AI to see how satellites can unlock value for your organization</p>
        </div>

        <div className={`${styles.card}`}>
          <h2>Order Services</h2>
          <p>Find satellite operators for your mission. Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
