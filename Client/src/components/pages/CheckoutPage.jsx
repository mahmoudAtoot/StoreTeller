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
      <div className="row">
        <div className="col-md-8 order-md-1">
          <h4>Shipping Address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className={styles['form-control']} id="firstName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className={styles['form-control']} id="lastName" placeholder="" value="" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className={styles['form-control']} id="address" placeholder="1234 Main St" required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className={styles['form-control']} id="address2" placeholder="Apartment or suite" />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className={`d-block w-100 ${styles['form-control']}`} id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className={`d-block w-100 ${styles['form-control']}`} id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className={styles['form-control']} id="zip" placeholder="" required />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            <hr className="mb-4" />

            <h4>Payment</h4>
            <div className={`${styles['payment-methods']} my-3`}>
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className={styles['form-check-input']} checked required />
                <label className={styles['form-check-label']} htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" className={styles['form-check-input']} required />
                <label className={styles['form-check-label']} htmlFor="debit">Debit card</label>
              </div>
              <div className="form-check">
                <input id="paypal" name="paymentMethod" type="radio" className={styles['form-check-input']} required />
                <label className={styles['form-check-label']} htmlFor="paypal">PayPal</label>
              </div>
            </div>
            <div className="row g-3"> {/* Added g-3 for gutter */}
              <div className="col-md-6">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className={styles['form-control']} id="cc-name" placeholder="" required />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" className={styles['form-control']} id="cc-number" placeholder="" required />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" className={styles['form-control']} id="cc-expiration" placeholder="" required />
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input type="text" className={styles['form-control']} id="cc-cvv" placeholder="" required />
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className={styles['btn-primary']} type="submit" onClick={handlePlaceOrder}>Place Order</button>
          </form>
        </div>
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>
          <ul className={styles['list-group']}>
            {cartItems.map((item) => (
              <li key={item._id} className={`${styles['list-group-item']} d-flex justify-content-between lh-condensed`}>
                <div>
                  <h6>{item.name}</h6>
                  <small className="text-muted">Quantity: {item.quantity}</small>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className={`${styles['list-group-item']} d-flex justify-content-between`}>
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
