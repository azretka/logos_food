import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../store/CartContext';
import { fetchMealById, fetchAllProducts } from '../../api/mealApi';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, decrement, increment, getQty } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const slide = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    if (window.innerWidth <= 768) {
      const cards = Array.from(el.querySelectorAll('.product-card'));
      if (!cards.length) return;
      const elLeft = el.getBoundingClientRect().left;
      const snapLeft = 16;
      let currentIndex = 0;
      let minDist = Infinity;
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
    setLoading(true);
    Promise.all([
      fetchMealById(id),
      fetchAllProducts(),
    ]).then(([meal, all]) => {
      setProduct(meal);
      setRelated(
        all.filter(p => p.id !== Number(id))
           .sort(() => Math.random() - 0.5)
           .slice(0, 8)
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
      <Navigation />
      <main className="product-page">
        <div className="container">

          <div className="product-page__back-wrap">
            <button className="product-page__back" onClick={() => navigate(-1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <span className="product-page__back-label">Вернуться назад</span>
          </div>

          <div className="product-page__card">
            <div className="product-page__image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-page__info">
              <h1 className="product-page__name">{product.name}</h1>
              <p className="product-page__desc">{product.fullDescription?.slice(0, 300) || product.description}</p>

              <div className="product-page__bottom">
                <p className="product-page__weight">Вес: {product.weight} г</p>

                <div className="product-page__price-row">
                  {qty === 0 ? (
                    <>
                      <button className="product-page__add-btn" onClick={() => addItem(product)}>
                        Корзина
                        <span className="product-page__add-divider" />
                        <img src="./images/shopping_bag.svg" alt="" className="product-page__add-icon" />
                      </button>
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
              </div>
            </div>

            {/* Nutrition spans full card width */}
            <div className="product-page__nutrition">
              <div className="nutrition-row nutrition-row--labels">
                <span>Белки</span>
                <span>Жиры</span>
                <span>Углеводы</span>
                <span>Ккал</span>
                <span>Вес</span>
              </div>
              <div className="nutrition-divider" />
              <div className="nutrition-row nutrition-row--values">
                <span>{product.nutrition.protein}</span>
                <span>{product.nutrition.fat}</span>
                <span>{product.nutrition.carbs}</span>
                <span>{product.nutrition.kcal}</span>
                <span>{product.nutrition.weight}</span>
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          <section className="product-page__related">
            <div className="menu-section__header">
              <h2 className="section-title">С ЭТИМ ТОВАРОМ ПОКУПАЮТ</h2>
              <div className="slider-nav">
                <button className="slider-nav__btn" onClick={() => slide(-1)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="slider-nav__btn" onClick={() => slide(1)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
            <div className="product-page__related-slider" ref={sliderRef}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
