import { Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/shared/navbar';
import Footer from './components/shared/footer';
import LoginPage from './components/pages/LoginPage';
import Register from './components/pages/Register';
import ShopPage from './components/pages/ShopPage';
import OwnerPage from './components/pages/OwnerPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<ShopPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
            <Route path="owner" element={<OwnerPage />} />
            <Route path="add-product" element={<ProductAddPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
