import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isOwner, shopName, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">StoreTeller</Link>
            </div>

            <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                {user ? (
                    <>
                        {isOwner && shopName && (
                            <Link to={`/${shopName}`} onClick={() => setMenuOpen(false)}>Owner Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className={styles.navLinks}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                )}
                {/* ممكن تضيف لينكات زيادة هنا */}
            </div>

            <button className={styles.menuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                <div className={menuOpen ? styles.menuIconActive : styles.menuIcon}></div>
            </button>
        </nav>
    );
};

export default Navbar;
