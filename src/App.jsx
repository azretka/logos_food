import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Promotions from './pages/Promotions';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Delivery from './pages/Delivery';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
