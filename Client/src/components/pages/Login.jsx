import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import { Footer, Navbar } from '../shared';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // Get the previous path, default to /
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.user.isOwner, data.user.shop);
                // Redirect to the previous page or default to home
                navigate(from, { replace: true });
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.loginContainer}>
                <div className={styles.loginFormWrapper}>
                    <div className={styles.loginHeader}>
                        <h1>StoreTrello</h1>
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.loginButton}
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className={styles.loginFooter}>
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        <p><Link to="/forgot-password">Forgot your password?</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;   