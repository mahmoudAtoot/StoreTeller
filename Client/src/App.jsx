
import { Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Footer } from './components/shared';
import { LoginPage, RegisterPage, ShopPage, OwnerPage, ProductAddPage, LandingPage, WishlistPage, CheckoutPage } from './components/pages';


function App() {
  return (

    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:storename" element={<ShopPage />} />
          <Route path="/:storename/owner" element={<OwnerPage />} />
          <Route path="/add" element={<ProductAddPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );

}

export default App;
