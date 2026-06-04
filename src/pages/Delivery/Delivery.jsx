import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Map from '../../components/Map/Map';
import { deliveryFAQ } from '../../data/mockData';
import './Delivery.css';

export default function Delivery() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <>
      <Header />
      <Navigation />
      <main className="delivery-page">
        <div className="container">
          <div className="delivery-page__header">
            <span className="delivery-page__title-bar" />
            <h1 className="delivery-page__title">УСЛОВИЯ ДОСТАВКИ</h1>
          </div>

          <div className="delivery-page__content">
            <div className="delivery-faq">
              {deliveryFAQ.map(item => (
                <div key={item.id} className={`faq-item ${openId === item.id ? 'open' : ''}`}>
                  <button className="faq-item__question" onClick={() => toggle(item.id)}>
                    <span>{item.question}</span>
                    <svg className="faq-item__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openId === item.id && (
                    <div className="faq-item__answer">{item.answer}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="delivery-page__map">
              <Map />
            </div>
          </div>

          <div className="delivery-info">
            <div className="delivery-info__block">
              <p className="delivery-info__label">График работы доставки:</p>
              <p className="delivery-info__value">с 10:00–21:00</p>
            </div>
            <div className="delivery-info__block">
              <p className="delivery-info__label">График работы кафе:</p>
              <p className="delivery-info__value">с 08:00–21:00</p>
            </div>
          </div>

          <div className="delivery-min">
            <p className="delivery-min__title">Минимальный заказ:</p>
            <p>Бесплатная доставка пешим курьером при сумме заказа от 1000 ₽</p>
            <p>Доставка оператором такси от любой суммы заказа — по тарифам перевозчика.</p>
          </div>
        </div>
      </main>
      <Footer noMap />
    </>
  );
}
