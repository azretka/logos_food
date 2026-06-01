import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__map-section">
        <div className="footer__map-bg">
          <iframe
            src="https://maps.google.com/maps?q=Moffett+Federal+Airfield&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title="map"
            allowFullScreen=""
            loading="lazy"
          />
          <div className="footer__map-pin">
            <img src="./wearehere.png" alt="Мы здесь" />
          </div>
        </div>

        <div className="container footer__map-content">
          <div className="footer__contacts">
            <h3 className="footer__contacts-title">КОНТАКТЫ</h3>
            <div className="footer__contacts-divider" />

            <div className="footer__contact-item">
              <img src="./Location.svg" alt="" className="footer__contact-icon" />
              <div>
                <p className="footer__contact-label">Наш адрес</p>
                <p>МО, городской округ Красногорск, село Ильинское,</p>
                <p>Экспериментальная улица, 10</p>
              </div>
            </div>
            <div className="footer__contact-item">
              <img src="./Message.svg" alt="" className="footer__contact-icon" />
              <div>
                <p className="footer__contact-label">Наша почта</p>
                <a href="mailto:auto.wash@gmail.com">auto.wash@gmail.com</a>
              </div>
            </div>

            <div className="footer__contacts-divider" />

            <div className="footer__actions">
              <button className="footer__reserve-btn">ЗАБРОНИРОВАТЬ СТОЛ</button>
              <div className="footer__phone-block">
                <a href="tel:+79175105759" className="footer__phone">+7 (917) 510-57-59</a>
                <span>Звоните или оставьте заявку</span>
              </div>
            </div>

            <div className="footer__social">
              <span>Мы в соц.сетях:</span>
              <div className="footer__social-icons">
                <a href="#" className="footer__social-icon"><img src="./facebook.svg" alt="Facebook" /></a>
                <a href="#" className="footer__social-icon"><img src="./vkontakte-logo.svg" alt="VK" /></a>
                <a href="#" className="footer__social-icon"><img src="./instagram.svg" alt="Instagram" /></a>
                <a href="#" className="footer__social-icon"><img src="./youtube-button.svg" alt="YouTube" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__bottom-left">
            <button className="footer__scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
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
          </div>
          <nav className="footer__nav">
            <Link to="#">О ресторане</Link>
            <Link to="/delivery">Условия доставки</Link>
            <Link to="#">Возврат товара</Link>
            <Link to="/promotions">Акции</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
