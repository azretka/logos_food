import { useEffect } from 'react';
import './CartModal.css';

export default function CartModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <button className="cart-modal__close" onClick={onClose}>✕</button>
        <div className="cart-modal__empty">
          <img src="./cart.svg" alt="cart" className="cart-modal__icon" />
          <h3>КОРЗИНА ПУСТАЯ</h3>
          <button className="cart-modal__menu-btn" onClick={onClose}>Посмотреть меню</button>
        </div>
      </div>
    </div>
  );
}
