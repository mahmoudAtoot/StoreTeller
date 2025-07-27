// No change in imports
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Product2D from '../shared/product2d';
import styles from './CartPage.module.css';
import Chat from '../chat/Chat';

// Placeholder for current user's ID and model - in a real app, this would come from auth context
const CURRENT_USER_ID = "60c72b2f9b1e8c001c8e4d1b"; // Example User ID
const CURRENT_USER_MODEL = "User";

// Placeholder for owner's ID and model - must match the one used in ChatPage.jsx
const OWNER_ID = "60c72b2f9b1e8c001c8e4d1a"; // Example Shop ID
const OWNER_MODEL = "Shop";

const CartPage = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.mainContent}>
        {/* Cart Items Section */}
        <div className={styles.cartItemsSection}>
          <h1>Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className={styles.emptyCartMessage}>
              Your cart is empty. Start shopping to add items!
            </div>
          ) : (
            <>
              <ul className={styles.cartItemList}>
                {cartItems.map((item) => (
                  <li key={item._id} className={styles.cartItem}>
                    <div className={styles.itemDetails}>
                      <div className={styles.productImageWrapper}>
                        <Product2D product={item} className={styles.productImage} />
                      </div>
                      <div>
                        <h6 className={styles.itemName}>{item.name}</h6>
                        <small className={styles.itemPrice}>
                          Price: ${item.price.toFixed(2)}
                        </small>
                        <div className={styles.quantityControls}>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateItemQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(
                                item._id,
                                parseInt(e.target.value)
                              )
                            }
                            className={styles.quantityInput}
                            min="1"
                          />
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateItemQuantity(item._id, item.quantity + 1)
                            }
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
                    <span className={styles.itemTotalPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.totalSection}>
                <h4 className="mb-0">Total</h4>
                <h4 className="mb-0">${getTotalPrice()}</h4>
              </div>

              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <button className={styles.chatButton} onClick={toggleChat}>
                {showChat ? 'Close Chat' : 'Chat with Owner'}
              </button>
            </>
          )}
        </div>

        {/* Chat / Order Summary Section */}
        <div className={styles.orderSummarySection}>
          <div className={styles.chatWrapper}>
            {showChat ? (
              <>
                <h3 className={styles.chatTitle}>Live Chat with Owner</h3>
                <Chat 
                    currentUser={CURRENT_USER_ID}
                    currentUserModel={CURRENT_USER_MODEL}
                    otherUser={OWNER_ID}
                    otherUserModel={OWNER_MODEL}
                />
              </>
            ) : (
              <div className={styles.placeholderText}>
                <p>This space is reserved for real-time updates or chat.</p>
                <p>You can enable chat by clicking the button above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
