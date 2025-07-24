import React from 'react';
import styles from './footer.module.css';

const FooterComponent = () => (
    <footer className={styles.footer}>
        <div className={styles.projectName}>StoreTeller - Online Store Concept</div>
        <p>&copy; 2025 StoreTeller</p>
        <p>All rights reserved.</p>
    </footer>
);

export default FooterComponent;
