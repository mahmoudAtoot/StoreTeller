
import { Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Footer } from './components/shared';
import { LoginPage, RegisterPage, ShopPage, OwnerPage, ProductAddPage, LandingPage, WishlistPage, CheckoutPage } from './components/pages';

const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />

      <Route element={<Layout />}>
        <Route path="/:storename" element={<ShopPage />} />
        <Route path="/:storename/owner" element={<OwnerPage />} />
        <Route path="/add" element={<ProductAddPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
