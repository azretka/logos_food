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

export default function Header() {
  const { count } = useCart();
  const [address, setAddress] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (count > 0) navigate('/cart');
    else setCartOpen(true);
  };

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleMenuCategory = (catId) => {
    setMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleMenuNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="header">
        <div className="header__top container">
          <button className="header__hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/>
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="0" y1="1" x2="20" y2="1"/><line x1="0" y1="7" x2="20" y2="7"/><line x1="0" y1="13" x2="20" y2="13"/>
              </svg>
            )}
            <span>МЕНЮ</span>
          </button>
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
              <img src="./images/ring.svg" alt="phone" />
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
            <button className="header__cart" onClick={handleCartClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              <span className="header__cart-mobile-line" />
              Корзина
              {count > 0 && <span className="header__cart-divider" />}
              {count > 0 && <span className="header__cart-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu__section-title">Навигация</div>
            <button className="mobile-menu__item" onClick={() => handleMenuNav('/')}>Домашняя страница</button>
            <button className="mobile-menu__item" onClick={() => handleMenuNav('/promotions')}>Акции</button>
            <button className="mobile-menu__item" onClick={() => handleMenuNav('/delivery')}>Условия доставки</button>
            <button className="mobile-menu__item" onClick={() => handleMenuNav('/cart')}>Корзина</button>
            <div className="mobile-menu__divider" />
            <div className="mobile-menu__section-title">Разделы меню</div>
            {categories.map(cat => (
              <button key={cat.id} className="mobile-menu__item mobile-menu__item--sub" onClick={() => handleMenuCategory(cat.id)}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
