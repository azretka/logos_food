import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { promotions } from '../data/mockData';
import './Promotions.css';

export default function Promotions() {
  return (
    <>
      <Header />
      <main className="promotions-page">
        <div className="container">
          <h1 className="section-title">АКЦИИ</h1>
          <div className="promotions-grid">
            {promotions.map(promo => (
              <div key={promo.id} className="promo-card">
                <div className="promo-card__img-wrap">
                  <img src={promo.image} alt={promo.title} />
                  <span className="promo-card__tag" style={{ background: promo.tagColor }}>
                    {promo.tag}
                  </span>
                </div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">{promo.title}</h3>
                  <p className="promo-card__desc">{promo.description}</p>
                  <span className="promo-card__expires">до {promo.expires}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
