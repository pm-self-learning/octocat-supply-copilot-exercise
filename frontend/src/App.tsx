import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';
import Products from './components/entity/product/Products';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import AdminProducts from './components/admin/AdminProducts';
import CartPage from './components/entity/cart/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-dark">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
