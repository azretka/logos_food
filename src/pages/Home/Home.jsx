import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import Navigation from '../../components/Navigation/Navigation';
import { fetchAllProducts, categories } from '../../api/mealApi';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cold');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef({});
  const sliderRefs = useRef({});

  const slide = (catId, dir) => {
    const el = sliderRefs.current[catId];
    if (el) el.scrollBy({ left: dir * 820, behavior: 'smooth' });
  };

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
      <Header />

      <main className="home">
        <section className="hero">
          <div className="hero__overlay" />
          <div className="hero__content">
            <img src="/images/taste.svg" alt="taste" className="hero__taste" />
          </div>
        </section>

        <Navigation
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="menu-sections container">
          {groupedProducts.map(group => (
            <section
              key={group.id}
              data-cat={group.id}
              ref={el => sectionRefs.current[group.id] = el}
              className="menu-section"
            >
              <div className="menu-section__header">
                <h2 className="section-title">{group.label.toUpperCase()}</h2>
                <div className="slider-nav">
                  <button className="slider-nav__btn" onClick={() => slide(group.id, -1)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="slider-nav__btn" onClick={() => slide(group.id, 1)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
              <div className="menu-slider" ref={el => sliderRefs.current[group.id] = el}>
                {group.items.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          ))}
        </div>

        <section className="about-cafe">
          <div className="about-cafe__card">
              <div className="about-cafe__overlay" />
              <div className="about-cafe__content">
                <div className="about-cafe__left">
                  <h2 className="about-cafe__title">НАШЕ КАФЕ</h2>
                  <p>Мы расположены в одном из самых живописных мест города — на берегу реки, это ваш оазис в черте города, куда можно сбежать от шумного и пыльного мегаполиса. Мы, действительно уникальны, ведь всё продумано до мелочей: проект построен из дикого закарпатского сруба, камин в основном зале ресторана и панорамные окна с видом на реку, уютные беседки на берегу реки и лучшая видовая терраса, шатер с посадкой на 200 человек, сказочный детский домик и бассейн.</p>
                  <button className="about-cafe__btn">ПОСМОТРЕТЬ МЕНЮ</button>
                </div>
                <div className="about-cafe__features">
                  {[
                    ['/images/onion.png', '/images/onion_green.png'],
                    ['/images/flash.png', '/images/flash_green.png'],
                    ['/images/chief.png', '/images/chief_green.png'],
                    ['/images/onion.png', '/images/onion_green.png'],
                  ].map(([normal, hover], i) => (
                    <div key={i} className="feature-icon-wrap">
                      <img src={normal} alt="" className="feature-icon feature-icon--normal" />
                      <img src={hover}  alt="" className="feature-icon feature-icon--hover" />
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}