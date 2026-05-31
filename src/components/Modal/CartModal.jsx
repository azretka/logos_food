import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import './CartModal.css';

export default function CartModal({ isOpen, onClose }) {
  const { items, count, total, decrement, increment, removeItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const goToCart = () => { onClose(); navigate('/cart'); };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <button className="cart-modal__close" onClick={onClose}>✕</button>

        {count === 0 ? (
          <div className="cart-modal__empty">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <h3>КОРЗИНА ПУСТАЯ</h3>
            <button className="cart-modal__menu-btn" onClick={onClose}>Посмотреть меню</button>
          </div>
        ) : (
          <>
            <h3 className="cart-modal__title">Корзина</h3>
            <ul className="cart-modal__list">
              {items.map(item => (
                <li key={item.id} className="cart-modal__item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-modal__item-info">
                    <span className="cart-modal__item-name">{item.name}</span>
                    <span className="cart-modal__item-price">{(item.price * item.qty).toLocaleString()} ₽</span>
                  </div>
                  <div className="cart-modal__item-counter">
                    <button onClick={() => decrement(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <button className="cart-modal__item-remove" onClick={() => removeItem(item.id)}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-modal__footer">
              <div className="cart-modal__total">
                <span>Итого:</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <button className="cart-modal__checkout" onClick={goToCart}>Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
