import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import Promotions from './pages/Promotions/Promotions';
import CartPage from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Delivery from './pages/Delivery/Delivery';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
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
