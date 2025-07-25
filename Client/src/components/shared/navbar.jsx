import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">StoreTeller</Link>
            </div>

            <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                {/* ممكن تضيف لينكات زيادة هنا */}
            </div>

            <button className={styles.menuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                <div className={menuOpen ? styles.menuIconActive : styles.menuIcon}></div>
            </button>
        </nav>
    );
};

export default Navbar;
