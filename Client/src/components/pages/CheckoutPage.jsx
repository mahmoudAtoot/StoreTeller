import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutPage.module.css';

function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real application, you would send the order to the server here.
    // For this demo, we'll just clear the cart and navigate to a confirmation.
    clearCart();
    alert('Order Placed Successfully! (Demo)');
    navigate('/'); // Navigate to home or a confirmation page
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <div className={styles.checkoutContent}>
        <div className={styles.shippingAddressSection}>
          <h4>Shipping Address</h4>
          <form className={styles.checkoutForm} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First name</label>
                <input type="text" className={styles.formControl} id="firstName" placeholder="" value="" required />
                <div className={styles.invalidFeedback}>
                  Valid first name is required.
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last name</label>
                <input type="text" className={styles.formControl} id="lastName" placeholder="" value="" required />
                <div className={styles.invalidFeedback}>
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input type="text" className={styles.formControl} id="address" placeholder="1234 Main St" required />
              <div className={styles.invalidFeedback}>
                Please enter your shipping address.
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address2">Address 2 <span className={styles.textMuted}>(Optional)</span></label>
              <input type="text" className={styles.formControl} id="address2" placeholder="Apartment or suite" />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <select className={`${styles.formControl} ${styles.dBlock} ${styles.w100}`} id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className={styles.invalidFeedback}>
                  Please select a valid country.
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <select className={`${styles.formControl} ${styles.dBlock} ${styles.w100}`} id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className={styles.invalidFeedback}>
                  Please provide a valid state.
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zip">Zip</label>
                <input type="text" className={styles.formControl} id="zip" placeholder="" required />
                <div className={styles.invalidFeedback}>
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className={styles.divider} />

            <h4>Payment</h4>
            <div className={`${styles.paymentMethods} ${styles.my3}`}>
              <div className={styles.formCheck}>
                <input id="credit" name="paymentMethod" type="radio" className={styles.formCheckInput} checked required />
                <label className={styles.formCheckLabel} htmlFor="credit">Credit card</label>
              </div>
              <div className={styles.formCheck}>
                <input id="debit" name="paymentMethod" type="radio" className={styles.formCheckInput} required />
                <label className={styles.formCheckLabel} htmlFor="debit">Debit card</label>
              </div>
              <div className={styles.formCheck}>
                <input id="paypal" name="paymentMethod" type="radio" className={styles.formCheckInput} required />
                <label className={styles.formCheckLabel} htmlFor="paypal">PayPal</label>
              </div>
            </div>
            <div className={styles.formRow}> {/* Added g-3 for gutter */}
              <div className={styles.formGroup}>
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className={styles['form-control']} id="cc-name" placeholder="" required />
                <small className={styles.textMuted}>Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" className={styles['form-control']} id="cc-number" placeholder="" required />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" className={styles.formControl} id="cc-expiration" placeholder="" required />
                <div className={styles.invalidFeedback}>
                  Expiration date required
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cc-cvv">CVV</label>
                <input type="text" className={styles.formControl} id="cc-cvv" placeholder="" required />
                <div className={styles.invalidFeedback}>
                  Security code required
                </div>
              </div>
            </div>
            <hr className={styles.divider} />
            <button className={styles.btnPrimary} type="submit" onClick={handlePlaceOrder}>Place Order</button>
          </form>
        </div>
        <div className={styles.orderSummarySection}>
          <h4 className={`${styles.dFlex} ${styles.justifyContentBetween} ${styles.alignItemsCenter} ${styles.mb3}`}>
            <span className={styles.textMuted}>Your cart</span>
            <span className={`${styles.badge} ${styles.bgPrimary} ${styles.roundedPill}`}>{cartItems.length}</span>
          </h4>
          <ul className={styles.listGroup}>
            {cartItems.map((item) => (
              <li key={item._id} className={`${styles.listGroupItem} ${styles.dFlex} ${styles.justifyContentBetween} ${styles.lhCondensed}`}>
                <div>
                  <h6>{item.name}</h6>
                  <small className={styles.textMuted}>Quantity: {item.quantity}</small>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className={`${styles.listGroupItem} ${styles.dFlex} ${styles.justifyContentBetween}`}>
              <span>Total (USD)</span>
              <strong>${getTotalPrice()}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
