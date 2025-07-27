
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Footer } from './components/shared';

import { LoginPage, RegisterPage, ShopPage, ProductAddPage, LandingPage, WishlistPage, CheckoutPage, CartPage, ChatPage } from './components/pages';
import PrivateRoute from './components/shared/PrivateRoute'; // Import PrivateRoute
import ItemDisplay from './components/ui-elements/store/itemdisplay'; // Import ItemDisplay

const Layout = ({ onProductClick }) => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <main className="flex-grow-1">
      <Outlet context={{ onProductClick }} /> {/* Pass onProductClick via context */}
    </main>
    <Footer />
  </div>
);

function App() {
  const [showItemDisplay, setShowItemDisplay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowItemDisplay(true);
  };

  const handleCloseItemDisplay = () => {
    setShowItemDisplay(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />

        <Route element={<Layout onProductClick={handleProductClick} />}>
          <Route path="/:storename" element={<ShopPage />} />
          <Route path="/add" element={<ProductAddPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>

      {showItemDisplay && selectedProduct && ReactDOM.createPortal(
        <ItemDisplay product={selectedProduct} onClose={handleCloseItemDisplay} />,
        document.body
      )}
    </>
  );
}

export default App;
