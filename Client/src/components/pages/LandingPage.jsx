import React from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome to StoreTeller</h1>
        <p className={styles.subtitle}>The natural shopping experience</p>
        <p>explore shops who transformed their shopping experience</p>
        {/* 4 store logos here that redirect to a shop */}
        <button className={styles.ctaButton}>Try us, it's free.</button>
      </div>
    </div>
  );
}

export default LandingPage;
