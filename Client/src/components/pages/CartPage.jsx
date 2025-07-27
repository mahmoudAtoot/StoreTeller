// No change in imports
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Product2D from '../shared/product2d';
import styles from './CartPage.module.css';
import Chat from '../chat/Chat';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { user, isOwner } = useAuth();
  console.log("CartPage Auth Context:", { user, isOwner });
  const { cartItems, removeItemFromCart, updateItemQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  // Dynamically set CURRENT_USER_ID and CURRENT_USER_MODEL from AuthContext
  const CURRENT_USER_ID = user ? user._id : null;
  const CURRENT_USER_MODEL = user ? user.model : null; // Assuming user object has a 'model' field

  // OWNER_ID should ideally come from the product/shop context, not hardcoded.
  // For now, if the current user is an owner, they are the OWNER_ID.
  // Otherwise, this needs to be dynamically fetched (e.g., from the product's shop ID).
  const OWNER_ID = isOwner && user ? user._id : (user ? "60c72b2f9b1e8c001c8e4d1a" : null); // TEMPORARY: Placeholder if not owner, needs dynamic fetch
  const OWNER_MODEL = "Shop"; // Assuming the owner is always a 'Shop' model for chat purposes

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
                    otherUser={OWNER_ID}
                    otherUserModel={OWNER_MODEL}
                    otherUserName="Owner"
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
