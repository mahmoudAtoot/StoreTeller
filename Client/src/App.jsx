
import { Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Footer } from './components/shared';
import { LoginPage, RegisterPage, ShopPage, OwnerPage, ProductAddPage } from './components/pages';


function App() {
  return (

    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<ShopPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
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
