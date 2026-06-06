import { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from '../Map/Map';
import Contacts from '../Contacts/Contacts';
import './Footer.css';

export default function Footer({ noMap = false }) {
  const [flashing, setFlashing] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFlashing(true);
    setTimeout(() => setFlashing(false), 600);
  };

  return (
    <footer className="footer">
      {!noMap && <div className="footer__map-section">
        <div className="footer__map-bg">
          <Map className="footer__map" />
        </div>

        <div className="container footer__map-content">
          <Contacts />
        </div>
      </div>}

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__brand-block">
            <div className="footer__brand">LOGOS</div>
            <div className="footer__legal">
              <p>© ООО СК «АПШЕРОН»</p>
              <p>Все права защищены. 2010–2020</p>
              <Link to="#">Пользовательское соглашение</Link>
              <Link to="#">Карта сайта</Link>
              <Link to="#">Политика конфиденциальности</Link>
            </div>
          </div>
          <nav className="footer__nav">
            <Link to="/">О ресторане</Link>
            <Link to="/delivery">Условия доставки</Link>
            <Link to="/checkout">Возврат товара</Link>
            <Link to="/promotions">Акции</Link>
          </nav>
          <button
            className={`footer__scroll-top${flashing ? ' footer__scroll-top--flash' : ''}`}
            onClick={handleScrollTop}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
