import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Product2D from '../shared/product2d'; // Import Product2D

const CartPage = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <div className="alert alert-info" role="alert">
              Your cart is empty. Start shopping to add items!
            </div>
          ) : (
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center lh-condensed py-3">
                  <div className="d-flex align-items-center">
                    <div style={{ width: '80px', height: '80px', marginRight: '15px', flexShrink: 0 }}>
                      <Product2D product={item} />
                    </div>
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">Price: ${item.price.toFixed(2)}</small>
                      <div className="d-flex align-items-center mt-2">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item._id, parseInt(e.target.value))}
                          className="form-control form-control-sm text-center"
                          style={{ width: '60px' }}
                          min="1"
                        />
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-3"
                          onClick={() => removeItemFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
            <h4 className="mb-0">Total</h4>
            <h4 className="mb-0">${getTotalPrice()}</h4>
          </div>
          <button className="btn btn-primary btn-lg btn-block mt-4" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
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
    </div>
  );
};

export default CartPage;
