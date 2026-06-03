export default function Contacts() {
  return (
    <div className="footer__contacts">
      <h3 className="footer__contacts-title">КОНТАКТЫ</h3>
      <div className="footer__contacts-divider" />

      <div className="footer__contact-item">
        <img src="/images/Location.svg" alt="" className="footer__contact-icon" />
        <div>
          <p className="footer__contact-label">Наш адрес</p>
          <p>МО, городской округ Красногорск, село Ильинское,</p>
          <p>Экспериментальная улица, 10</p>
        </div>
      </div>
      <div className="footer__contact-item">
        <img src="/images/Message.svg" alt="" className="footer__contact-icon" />
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
          <a href="#" className="footer__social-icon"><img src="/images/facebook.svg" alt="Facebook" /></a>
          <a href="#" className="footer__social-icon"><img src="/images/vkontakte-logo.svg" alt="VK" /></a>
          <a href="#" className="footer__social-icon"><img src="/images/instagram.svg" alt="Instagram" /></a>
          <a href="#" className="footer__social-icon"><img src="/images/youtube-button.svg" alt="YouTube" /></a>
        </div>
      </div>
    </div>
  );
}
