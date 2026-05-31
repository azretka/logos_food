import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import { fetchAllProducts, categories } from '../api/mealApi';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cold');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef({});

  useEffect(() => {
    fetchAllProducts()
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    sectionRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.cat);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#aaa', fontSize: 18 }}>
      Загружаем меню...
    </div>
  );

  const groupedProducts = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.category === cat.id),
  })).filter(g => g.items.length > 0);

  return (
    <>
      <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <main className="home">
        <section className="hero">
          <div className="hero__overlay" />
          <div className="hero__content">
            <h1 className="hero__title">ДОСТАВКА ВКУСНЕЙШИХ<br />БЛЮД ЗА 60 МИНУТ</h1>
            <button className="hero__cta">ЕЩЁ НЕ ПРОБОВАЛ?</button>
          </div>
        </section>

        <div className="menu-sections container">
          {groupedProducts.map(group => (
            <section
              key={group.id}
              data-cat={group.id}
              ref={el => sectionRefs.current[group.id] = el}
              className="menu-section"
            >
              <h2 className="section-title">{group.label.toUpperCase()}</h2>
              <div className="menu-grid">
                {group.items.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          ))}
        </div>

        <section className="about-cafe">
          <div className="about-cafe__overlay" />
          <div className="container about-cafe__content">
            <div className="about-cafe__left">
              <h2 className="about-cafe__title">НАШЕ КАФЕ</h2>
              <p>Мы расположены в одном из самых живописных мест города — на берегу реки, это ваш оазис в черте города, куда можно сбежать от шумного и пыльного мегаполиса.</p>
              <p>Мы, действительно уникальны, ведь всё продумано до мелочей: проект построен из дикого закарпатского сруба, казни в основном зале ресторана и панорамные окна с видом на реку, уютные беседки на берегу реки и лучшая видовая терраса, шатер с посадкой на 200 человек, сказочный детский домик и бассейн.</p>
              <button className="about-cafe__btn">ПОСМОТРЕТЬ МЕНЮ</button>
            </div>
            <div className="about-cafe__features">
              <div className="about-cafe__feature">
                <div className="feature-icon">🧅</div>
                <span>Свежайшие продукты</span>
              </div>
              <div className="about-cafe__feature about-cafe__feature--green">
                <div className="feature-icon">⚡</div>
                <span>Быстрая доставка</span>
              </div>
              <div className="about-cafe__feature">
                <div className="feature-icon">👨‍🍳</div>
                <span>Лучшие повара</span>
              </div>
              <div className="about-cafe__feature">
                <div className="feature-icon">🧅</div>
                <span>Свежайшие продукты</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}