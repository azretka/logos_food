import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__map-section">
        <div className="container footer__map-content">
          <div className="footer__contacts">
            <h3 className="footer__contacts-title">КОНТАКТЫ</h3>
            <div className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <p className="footer__contact-label">Наш адрес</p>
                <p>МО, городской округ Красногорск, село Ильинское,</p>
                <p>Экспериментальная улица, 10</p>
              </div>
            </div>
            <div className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <p className="footer__contact-label">Наша почта</p>
                <a href="mailto:auto.wash@gmail.com">auto.wash@gmail.com</a>
              </div>
            </div>
            <div className="footer__actions">
              <button className="footer__reserve-btn">ЗАБРОНИРОВАТЬ СТОЛ</button>
              <div className="footer__phone-block">
                <a href="tel:+79175105759" className="footer__phone">+7 (917) 510-57-59</a>
                <span>Звоните в любое время</span>
              </div>
            </div>
            <div className="footer__social">
              <span>Мы в соц.сетях:</span>
              <div className="footer__social-icons">
                {['fb', 'vk', 'ok', 'yt'].map(s => (
                  <a key={s} href="#" className="footer__social-icon">{s[0].toUpperCase()}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer__map">
            <iframe
              src="https://maps.google.com/maps?q=Moffett+Federal+Airfield&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="map"
              allowFullScreen=""
              loading="lazy"
            />
            <div className="footer__map-pin">
              <span>Мы здесь!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__bottom-left">
            <div className="footer__brand">LOGOS</div>
            <div className="footer__legal">
              <p>© 2003 ОФ «МЭДРОН»</p>
              <p>Все права защищены 2010-2020</p>
              <Link to="#">Пользовательское соглашение</Link>
              <Link to="#">Карта сайта</Link>
              <Link to="#">Политика конфиденциальности</Link>
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
