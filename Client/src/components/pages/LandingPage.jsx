import React from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to StoreTeller</h1>
      <p className={styles.subtitle}>Your one-stop shop for everything.</p>
    </div>
  );
}

export default LandingPage;
