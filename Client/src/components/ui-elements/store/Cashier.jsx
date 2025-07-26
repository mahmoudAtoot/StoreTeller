import React from 'react';
import styles from './Cashier.module.css';

const Cashier = ({ hoveredProduct }) => {
  return (
    <div className={styles.cashierContainer}>
      <h2 className={styles.cashierTitle}>Cashier</h2>

      <div className={styles.displaySection}>
        {hoveredProduct ? (
          <div className={styles.hoveredProductInfo}>
            <img src={hoveredProduct.image || 'https://placehold.co/600x400'} alt={hoveredProduct.name} className={styles.hoveredProductImage} />
            <h3>{hoveredProduct.name}</h3>
            <p className={styles.productPrice}>${hoveredProduct.price}</p>
          </div>
        ) : (
          <p className={styles.welcomeMessage}>Hover over an item to see details</p>
        )}
      </div>

      <div className={styles.cartSummary}>
        <h4>Cart Summary</h4>
        {/* Placeholder for cart items */}
        <p>No items in cart yet.</p>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.cartButton}>View Cart</button>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
};

export default Cashier;