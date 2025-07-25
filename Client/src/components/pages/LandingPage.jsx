import React from "react";
import styles from "./LandingPage.module.css";
import { Navbar, Footer } from "../shared";
import { FaTruck, FaHeadset, FaUndoAlt, FaCreditCard, FaUserCircle } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Left side - Welcome, tagline, CTAs */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Welcome to <span>StoreTeller</span>
          </h1>
          <p className={styles.subtitle}>
            Smart and easy shopping with a professional online store management experience.
          </p>
          <div className={styles.buttons}>
            <a href="/login" className={styles.primaryBtn}>
              Shop Now
            </a>
            <a href="#features" className={styles.secondaryBtn}>
              Learn More
            </a>
          </div>
        </div>

        {/* Right side - Image/mockup */}
        <div className={styles.right}>
          <img
            src="/assets/storeteller-mockup.png"
            alt="StoreTeller App mockup"
          />
        </div>
      </main>

      {/* Features section */}
      <section id="features" className={styles.featuresSection}>
        <h2>Why Choose StoreTeller?</h2>
        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <FaTruck className={styles.icon} />
            <span>Fast and secure delivery</span>
          </li>
          <li className={styles.featureItem}>
            <FaHeadset className={styles.icon} />
            <span>24/7 customer support</span>
          </li>
          <li className={styles.featureItem}>
            <FaUndoAlt className={styles.icon} />
            <span>Money-back guarantee</span>
          </li>
          <li className={styles.featureItem}>
            <FaCreditCard className={styles.icon} />
            <span>Multiple safe payment methods</span>
          </li>
          <li className={styles.featureItem}>
            <FaUserCircle className={styles.icon} />
            <span>Easy and intuitive user interface</span>
          </li>
        </ul>
      </section>

      <section className={styles.testimonialsSection}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonials}>
          <blockquote className={styles.testimonial}>
            <p>"StoreTeller made managing my online shop so easy! Highly recommended."</p>
            <footer>- Sarah J.</footer>
          </blockquote>
          <blockquote className={styles.testimonial}>
            <p>"Amazing support and fast delivery. Love it!"</p>
            <footer>- Ahmed M.</footer>
          </blockquote>
        </div>
      </section>




      <Footer />
    </>
  );
};

export default LandingPage;
