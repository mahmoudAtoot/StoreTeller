import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">StoreTeller</Link>
            </div>
            <div className={styles.navLinks}>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;