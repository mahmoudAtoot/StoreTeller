import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Product2D from '../shared/product2d'; // Import Product2D
import styles from './CartPage.module.css';

const CartPage = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles.cartPageContainer}>
      <h1 className={styles.cartItemsSection}>Your Shopping Cart</h1>
      <div className={styles.mainContent}>
        <div className={styles.cartItemsSection}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartMessage}>
              Your cart is empty. Start shopping to add items!
            </div>
          ) : (
            <ul className={styles.cartItemList}>
              {cartItems.map((item) => (
                <li key={item._id} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <div className={styles.productImageWrapper}>
                      <Product2D product={item} className={styles.productImage} />
                    </div>
                    <div>
                      <h6 className={styles.itemName}>{item.name}</h6>
                      <small className={styles.itemPrice}>Price: ${item.price.toFixed(2)}</small>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item._id, parseInt(e.target.value))}
                          className={styles.quantityInput}
                          min="1"
                        />
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeItemFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className={styles.itemTotalPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.totalSection}>
            <h4 className="mb-0">Total</h4>
            <h4 className="mb-0">${getTotalPrice()}</h4>
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
        <div className={styles.orderSummarySection}>
          <div className="card-header bg-light">
            <h5 className="my-0">Order Summary / Socket Connection</h5>
          </div>
          <div className="card-body">
            {/* Your socket component will go here */}
            <p className="text-muted">This area is reserved for real-time updates or a socket-based component, such as order tracking or live chat with support.</p>
            <p className="text-muted">Feel free to integrate your socket component here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
