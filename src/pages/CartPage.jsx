import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import { useCart } from '../store/CartContext';
import { fetchAllProducts } from '../api/mealApi';
import './CartPage.css';

export default function CartPage() {
  const { items, total, decrement, increment, removeItem } = useCart();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts().then(setAllProducts);
  }, []);

  const suggestions = allProducts
    .filter(p => !items.find(i => i.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

    const MIN_ORDER = 500;

  return (
    <>
      <Header />
      <main className="cart-page">
        <div className="container">
          <button className="cart-page__back" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            К выбору блюда
          </button>

          <div className="cart-page__header">
            <h1 className="cart-page__title">
              <span className="cart-page__title-bar" />
              КОРЗИНА
            </h1>
            {items.length > 0 && (
              <span className="cart-page__count">В корзине {items.length} товара</span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="cart-page__empty">
              <p>Корзина пуста</p>
              <button onClick={() => navigate('/')}>Перейти в меню</button>
            </div>
          ) : (
            <div className="cart-page__list">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.name}</span>
                    <span className="cart-item__desc">{item.description}</span>
                  </div>
                  <div className="cart-item__counter">
                    <button onClick={() => decrement(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <span className="cart-item__price">{(item.price * item.qty).toLocaleString()} ₽</span>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <section className="cart-page__suggestions">
              <h2 className="section-title">ДОБАВИТЬ К ЗАКАЗУ</h2>
              <div className="cart-page__suggestions-grid">
                {suggestions.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {/* Summary */}
          {items.length > 0 && (
            <div className="cart-page__summary">
              <div className="cart-summary">
                <div className="cart-summary__row">
                  <span>Итого:</span>
                  <span className="cart-summary__total">{total.toLocaleString()} ₽</span>
                </div>
                <p className="cart-summary__note">
                  {total < MIN_ORDER
                    ? `До бесплатной доставки не хватает ${(MIN_ORDER - total).toLocaleString()} ₽`
                    : 'Бесплатная доставка!'
                  }
                </p>
                <p className="cart-summary__hint">Минимальная сумма заказа 500 ₽</p>
                <button
                  className="cart-summary__checkout"
                  onClick={() => navigate('/checkout')}
                  disabled={total < MIN_ORDER}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
