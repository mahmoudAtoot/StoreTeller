import React from 'react';
import styles from './LandingPage.module.css';
import { Footer, Navbar } from '../shared';

function LandingPage() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>Welcome to StoreTeller</h1>
          <p className={styles.subtitle}>The natural shopping experience</p>
          <p>explore shops who transformed their shopping experience</p>
          {/* 4 store logos here that redirect to a shop */}
          <a href="/login" className={styles.ctaButton}>Try us, it's free.</a>
        </div>
      </div>
      <Footer />  
    </>
  );
}

export default LandingPage;
