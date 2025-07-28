import styles from "./LandingPage.module.css";
import { Navbar, Footer } from "../shared";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck, FaHeadset, FaUndoAlt, FaCreditCard, FaUserCircle } from "react-icons/fa";

const LandingPage = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/shops")
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        console.error("Error fetching shops:", err);
      });
  }, []);
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
            <a href="/shop" className={styles.primaryBtn}>
              Shop Now
            </a>
            <a href="#features" className={styles.secondaryBtn}>
              Learn More
            </a>
          </div>
        </div>

        {/* Right side - Image/mockup */}
        {/* <div className={styles.right}>
          <img
            // src="https://imgur.com/UaMgBsQ.jpg"
            // alt="StoreTeller App mockup"
          />
        </div> */}
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

      <section className={styles.shopSection}>
        <h2>Explore stores enhanced by StoreTeller</h2>
        <div className={styles.shopList}>
          {shops.slice(0, 4).map((shop) => (
            <div key={shop._id} className={styles.shopCard}>
              <h3>{shop.name}</h3>
              <p>{shop.description}</p>
              <a href={`/${shop.name}`} className={styles.shopLink}>
                Visit Store
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        <div className={styles.testimonials}>
          <blockquote className={styles.testimonial}>
            <p>"StoreTeller made my webstore much more interactive and appealing to customers."</p>
            <footer>- Lina M.</footer>
          </blockquote>
          <blockquote className={styles.testimonial}>
            <p>"StoreTeller provided a unique style to my online store that I couldn't find anywhere else."</p>
            <footer>- Jamal K.</footer>
          </blockquote>
          <blockquote className={styles.testimonial}>
            <p>"With StoreTeller, I made my hobby business a real store with engaging customer experience."</p>
            <footer>- Sarah B.</footer>
          </blockquote>
        </div>
      </section>

      {/* How It Works section */}
      <section className={styles.howItWorks}>
        <h2>How StoreTeller Works</h2>
        <div className={styles.steps}>
          <div className={styles.stepCard}>
            <h3>1. Sign Up</h3>
            <p>Create your free account in seconds</p>
          </div>
          <div className={styles.stepCard}>
            <h3>2. Customize</h3>
            <p>Choose your store theme & settings</p>
          </div>
          <div className={styles.stepCard}>
            <h3>3. Start Selling</h3>
            <p>Launch your store and start receiving orders</p>
          </div>
        </div>
      </section>

      

      <Footer />
    </>
  );
};

export default LandingPage;
