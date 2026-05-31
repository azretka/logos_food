import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { categories } from '../../api/mealApi';
import CartModal from '../Modal/CartModal';
import './Header.css';

const addressSuggestions = [
  'Москва, Часовая улица, 11/3',
  'Москва, Часовая улица, 11/3с1',
  'Москва, Часовая улица, 11/3',
];

export default function Header({ activeCategory, onCategoryChange }) {
  const { count } = useCart();
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filtered = addressSuggestions.filter(s =>
    s.toLowerCase().includes(address.toLowerCase()) && address.length > 1
  );

  useEffect(() => {
    const handler = (e) => {
      if (!inputRef.current?.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__top container">
          <Link to="/" className="header__logo">LOGOS</Link>

          <div className="header__search-wrap" ref={inputRef}>
            <div className="header__search">
              <svg className="header__search-pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input
                type="text"
                placeholder="Введите адрес доставки"
                value={address}
                onChange={e => { setAddress(e.target.value); setShowSuggestions(true); }}
                onFocus={() => address.length > 1 && setShowSuggestions(true)}
              />
              <button className="header__search-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
            {showSuggestions && filtered.length > 0 && (
              <ul className="header__suggestions">
                {filtered.map((s, i) => (
                  <li key={i} onClick={() => { setAddress(s); setShowSuggestions(false); }}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="header__contacts">
            <div className="header__contacts-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.36 6.36l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <span className="header__contacts-label">Контакты:</span>
              <a href="tel:+79175105759" className="header__phone">+7 (917) 510-57-59</a>
            </div>
          </div>

          <div className="header__right">
            <button className="header__login">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Войти
            </button>
            <button className="header__cart" onClick={() => setCartOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              Корзина
              {count > 0 && <span className="header__cart-count">{count}</span>}
            </button>
          </div>
        </div>

        <nav className="header__nav container">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`header__nav-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange ? onCategoryChange(cat.id) : navigate(`/#${cat.id}`)}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </header>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
