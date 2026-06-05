import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../store/CartContext';
import { fetchAllProducts } from '../../api/mealApi';
import './Cart.css';

export default function CartPage() {
  const { items, total, decrement, increment, removeItem } = useCart();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const suggestionsRef = useRef(null);

  const slideSuggestions = (dir) => {
    const el = suggestionsRef.current;
    if (!el) return;
    if (window.innerWidth <= 768) {
      const cards = Array.from(el.querySelectorAll('.product-card'));
      if (!cards.length) return;
      const elLeft = el.getBoundingClientRect().left;
      const snapLeft = 16;
      let currentIndex = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - elLeft - snapLeft);
        if (dist < minDist) { minDist = dist; currentIndex = i; }
      });
      const targetIndex = Math.max(0, Math.min(currentIndex + dir, cards.length - 1));
      const targetCardLeft = cards[targetIndex].getBoundingClientRect().left - elLeft;
      el.scrollTo({ left: el.scrollLeft + targetCardLeft - snapLeft, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: dir * 820, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchAllProducts().then(setAllProducts);
  }, []);

  const suggestions = allProducts
    .filter(p => !items.find(i => i.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

    const MIN_ORDER = 1000;

  const itemWord = (n) => {
    const abs = Math.abs(n) % 100;
    const mod = abs % 10;
    if (abs >= 11 && abs <= 19) return 'товаров';
    if (mod === 1) return 'товар';
    if (mod >= 2 && mod <= 4) return 'товара';
    return 'товаров';
  };

  return (
    <>
      <Header />
      <Navigation />
      <main className="cart-page">
        <div className="container">
          <div className="cart-page__top">
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
                <span className="cart-page__count">(В корзине {items.length} {itemWord(items.length)})</span>
              )}
            </div>
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
                  <div className="cart-item__controls">
                    <div className="cart-item__counter">
                      <button onClick={() => decrement(item.id)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increment(item.id)}>+</button>
                    </div>
                    <span className="cart-item__price">{(item.price * item.qty).toLocaleString()} ₽</span>
                    <button className="cart-item__remove" onClick={() => removeItem(item.id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <section className="cart-page__suggestions">
              <div className="cart-suggestions__header">
                <h2 className="section-title">ДОБАВИТЬ К ЗАКАЗУ</h2>
                <div className="slider-nav">
                  <button className="slider-nav__btn" onClick={() => slideSuggestions(-1)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="slider-nav__btn" onClick={() => slideSuggestions(1)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
              <div className="cart-page__suggestions-grid" ref={suggestionsRef}>
                {suggestions.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {/* Summary */}
          {items.length > 0 && (
            <div className="cart-page__summary">
              <div className="cart-summary">
                <div className="cart-summary__info">
                  <div className="cart-summary__row">
                    <span>Итого:</span>
                    <span className="cart-summary__total">{total.toLocaleString()} ₽</span>
                  </div>
                  <p className="cart-summary__note">
                    {total < MIN_ORDER
                      ? <>До бесплатной доставки не хватает <span className="cart-summary__note-amount">{(MIN_ORDER - total).toLocaleString()} ₽</span></>
                      : 'Бесплатная доставка!'
                    }
                  </p>
                  <p className="cart-summary__hint">Минимальная сумма заказа 1000 ₽</p>
                </div>
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
      <Footer noMap />
    </>
  );
}
