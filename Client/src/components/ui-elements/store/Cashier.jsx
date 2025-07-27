import React from 'react';
import styles from './Cashier.module.css';

const Cashier = ({ hoveredProduct }) => {
  return (
    <div className={styles.cashierContainer}>
      <h2 className={styles.cashierTitle}>Cashier</h2>

      <div className={styles.displaySection}>
        {hoveredProduct ? (
          <div className={styles.hoveredProductInfo}>
            {hoveredProduct.image && <img src={`http://localhost:8000${hoveredProduct.image}`} alt={hoveredProduct.name} className={styles.hoveredProductImage} />}
            <h3>{hoveredProduct.name}</h3>
            <p className={styles.productPrice}>${hoveredProduct.price}</p>
          </div>
        ) : (
          null
        )}
      </div>

      <div className={styles.cartSummary}>
        <h4>Cart Summary</h4>
        {/* Placeholder for cart items */}
        {null}
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.cartButton}>View Cart</button>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
};

export default Cashier;