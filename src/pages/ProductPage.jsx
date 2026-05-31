import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../store/CartContext';
import { fetchMealById, fetchAllProducts } from '../api/mealApi';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, decrement, increment, getQty } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchMealById(id),
      fetchAllProducts(),
    ]).then(([meal, all]) => {
      setProduct(meal);
      setRelated(
        all.filter(p => p.id !== Number(id))
           .sort(() => Math.random() - 0.5)
           .slice(0, 4)
      );
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#aaa', fontSize: 18 }}>
      Загружаем блюдо...
    </div>
  );

  if (!product) return <div style={{ padding: 40, color: '#fff' }}>Товар не найден</div>;

  const qty = getQty(product.id);

  return (
    <>
      <Header />
      <main className="product-page">
        <div className="container">
          <button className="product-page__back" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Вернуться назад
          </button>

          <div className="product-page__card">
            <div className="product-page__image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-page__info">
              <h1 className="product-page__name">{product.name}</h1>
              <p className="product-page__desc">{product.fullDescription?.slice(0, 300) || product.description}</p>
              <p className="product-page__weight">Вес: {product.weight} г</p>

              <div className="product-page__price-row">
                {qty === 0 ? (
                  <>
                    <button className="product-page__add-btn" onClick={() => addItem(product)}>В корзину</button>
                    <span className="product-page__price">{product.price.toLocaleString()} ₽</span>
                  </>
                ) : (
                  <>
                    <div className="product-page__counter">
                      <button onClick={() => decrement(product.id)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => increment(product.id)}>+</button>
                    </div>
                    <span className="product-page__price">{product.price.toLocaleString()} ₽</span>
                  </>
                )}
              </div>

              <div className="product-page__nutrition">
                <div className="nutrition-item">
                  <span className="nutrition-item__val">{product.nutrition.kcal}</span>
                  <span className="nutrition-item__label">Ккал</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-item__val">{product.nutrition.carbs}</span>
                  <span className="nutrition-item__label">Углеводы</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-item__val">{product.nutrition.protein}</span>
                  <span className="nutrition-item__label">Белки</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-item__val">{product.nutrition.fat}</span>
                  <span className="nutrition-item__label">Жиры</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-item__val">{product.nutrition.weight}</span>
                  <span className="nutrition-item__label">Вес г</span>
                </div>
              </div>
            </div>
          </div>

          <section className="product-page__related">
            <h2 className="section-title">С ЭТИМ ТОВАРОМ ПОКУПАЮТ</h2>
            <div className="product-page__related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}