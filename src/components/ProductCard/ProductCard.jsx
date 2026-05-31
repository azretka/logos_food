import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem, decrement, increment, getQty } = useCart();
  const navigate = useNavigate();
  const qty = getQty(product.id);

  return (
    <div className="product-card">
      <div className="product-card__img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.image} alt={product.name} className="product-card__img" />
        {qty > 0 && <span className="product-card__badge">{qty}</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__name">{product.name}</span>
          <span className="product-card__weight">Вес: {product.weight} г</span>
        </div>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__footer">
          {qty === 0 ? (
            <>
              <span className="product-card__price">{product.price.toLocaleString()} ₽</span>
              <button className="product-card__add" onClick={() => addItem(product)}>
                В корзину
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              </button>
            </>
          ) : (
            <>
              <span className="product-card__price">{product.price.toLocaleString()} ₽</span>
              <div className="product-card__counter">
                <button onClick={() => decrement(product.id)}>−</button>
                <span>{qty}</span>
                <button onClick={() => increment(product.id)}>+</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
