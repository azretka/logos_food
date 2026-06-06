import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import './Checkout.css';

const RESTAURANTS = [
  { value: '1', label: 'МО, с. Ильинское, Экспериментальная ул., 10' },
];

function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className={`custom-select__trigger${open ? ' custom-select__trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={selected ? '' : 'custom-select__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="custom-select__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#72A479" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="custom-select__list">
          {!value && (
            <li className="custom-select__item custom-select__item--placeholder" onClick={() => { onChange(''); setOpen(false); }}>
              {placeholder}
            </li>
          )}
          {options.map(o => (
            <li
              key={o.value}
              className={`custom-select__item${value === o.value ? ' custom-select__item--active' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const isOpen = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const total = h * 60 + m;
  return total >= 8 * 60 + 30 && total < 20 * 60;
};

export default function Checkout() {
  const navigate = useNavigate();
  const open = isOpen();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [payType, setPayType] = useState('online');
  const [timeType, setTimeType] = useState('asap');
  const [persons, setPersons] = useState(1);
  const [callPref, setCallPref] = useState('no');
  const [agreed, setAgreed] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', street: '', house: '', apt: '', entrance: '', floor: '', code: '', restaurant: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onName = e => set('name', e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, ''));

  const onPhone = e => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 11);
    let r = '+7';
    if (d.length > 1) r += ' (' + d.slice(1, 4);
    if (d.length >= 4) r += ') ' + d.slice(4, 7);
    if (d.length >= 7) r += '-' + d.slice(7, 9);
    if (d.length >= 9) r += '-' + d.slice(9, 11);
    set('phone', r);
  };

  const onNum = k => e => set(k, e.target.value.replace(/\D/g, ''));

  const onTime = e => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 4);
    let r = d.slice(0, 2);
    if (d.length > 2) r += ':' + d.slice(2, 4);
    setTimeVal(r);
  };

  const [timeVal, setTimeVal] = useState('');

  return (
    <>
      <Header />
      <Navigation />
      <main className="checkout-page">
        <div className="container">
          <div className="checkout-page__top">
            <button className="checkout-page__back" onClick={() => navigate('/cart')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              В корзину
            </button>

            <div className="checkout-page__header">
              <span className="checkout-page__title-bar" />
              <h1 className="checkout-page__title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
            </div>
          </div>

          {!open && (
            <div className="checkout-closed-banner">
              <div className="checkout-closed-banner__text">
                <p className="checkout-closed-banner__title">Сегодня мы уже не доставляем.</p>
                <p className="checkout-closed-banner__sub">Заказы принимаем до 20:00, доставляем с 8:30 до 21:30</p>
              </div>
              <img src="./images/night.png" alt="" className="checkout-closed-banner__img" />
            </div>
          )}

          <div className="checkout-page__sections">
            {/* 1. Contact */}
            <div className="checkout-section">
              <h2 className="checkout-section__num">1. Контактная информация</h2>
              <div className="checkout-section__body">
                <div className="checkout-row-2">
                  <div className="req"><input placeholder="Имя" value={form.name} onChange={onName} /></div>
                  <div className="req"><input placeholder="+7 (___) ___-__-__" value={form.phone} onChange={onPhone} /></div>
                </div>
              </div>
            </div>

            {/* 2. Delivery */}
            <div className={`checkout-section ${deliveryType === 'pickup' ? 'checkout-section--short' : ''}`}>
              <h2 className="checkout-section__num">2. Доставка</h2>
              <div className="checkout-section__body">
                <div className="checkout-tabs">
                  <button
                    className={`checkout-tab ${deliveryType === 'delivery' ? 'active' : ''}`}
                    onClick={() => setDeliveryType('delivery')}
                  >Доставка</button>
                  <button
                    className={`checkout-tab ${deliveryType === 'pickup' ? 'active' : ''}`}
                    onClick={() => setDeliveryType('pickup')}
                  >Самовывоз</button>
                  {deliveryType === 'delivery' && (
                    <span className="checkout-delivery-time"><img src="./images/clock.svg" alt="" className="checkout-delivery-time__icon" />Доставим через 1 час 30 минут</span>
                  )}
                </div>

                {deliveryType === 'delivery' ? (
                  <div className="checkout-address">
                    <p className="checkout-address-label">Адрес доставки</p>
                    <div className="checkout-row-2">
                      <div className="req"><input placeholder="Укажите улицу" value={form.street} onChange={e => set('street', e.target.value)} /></div>
                      <div className="req"><input placeholder="Номер дома" value={form.house} onChange={e => set('house', e.target.value)} /></div>
                    </div>
                    <div className="checkout-row-3">
                      <input placeholder="№ квартиры/офиса" value={form.apt} onChange={onNum('apt')} />
                      <input placeholder="Подъезд" value={form.entrance} onChange={onNum('entrance')} />
                      <input placeholder="Этаж" value={form.floor} onChange={onNum('floor')} />
                    </div>
                    <input placeholder="Комментарий" value={form.code} onChange={e => set('code', e.target.value)} />
                  </div>
                ) : (
                  <div className="checkout-address">
                    <CustomSelect
                      value={form.restaurant}
                      onChange={v => set('restaurant', v)}
                      options={RESTAURANTS}
                      placeholder="Выберите ресторан"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3. Payment */}
            <div className={`checkout-section ${payType === 'cash' ? 'checkout-section--tall' : ''}`}>
              <h2 className="checkout-section__num">3. Оплатить</h2>
              <div className="checkout-section__body">
                <div className="checkout-tabs">
                  {[['online', 'Оплата онлайн'], ['card', 'Курьеру картой'], ['cash', 'Наличными']].map(([k, l]) => (
                    <button key={k} className={`checkout-tab ${payType === k ? 'active' : ''}`} onClick={() => setPayType(k)}>{l}</button>
                  ))}
                </div>
                {payType === 'cash' && (
                  <input placeholder="Сдача с (₽)" style={{ marginTop: 12, maxWidth: 200 }} onChange={e => e.target.value = e.target.value.replace(/\D/g, '')} />
                )}
              </div>
            </div>

            {/* 4. Time */}
            <div className="checkout-section">
              <h2 className="checkout-section__num">4. Когда доставить</h2>
              <div className="checkout-section__body">
                <div className="checkout-time-group">
                  <div className="checkout-tabs">
                    {[['asap', 'В ближайшее время'], ['time', 'Ко времени']].map(([k, l]) => (
                      <button key={k} className={`checkout-tab ${timeType === k ? 'active' : ''}`} onClick={() => setTimeType(k)}>{l}</button>
                    ))}
                    {timeType === 'time' && (
                      <input type="text" placeholder="ЧЧ:ММ" className="checkout-time-input" value={timeVal} onChange={onTime} />
                    )}
                  </div>

                  <div className="checkout-persons">
                    <span>Кол-во персон</span>
                    <div className="checkout-counter">
                      <button onClick={() => setPersons(p => Math.max(1, p - 1))}>−</button>
                      <span>{persons}</span>
                      <button onClick={() => setPersons(p => p + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="checkout-call">
                  <p className="checkout-call-label">Хотите мы позвоним?</p>
                  <label className="checkout-radio">
                    <input type="radio" value="no" checked={callPref === 'no'} onChange={() => setCallPref('no')} />
                    Не перезванивать
                  </label>
                  <label className="checkout-radio">
                    <input type="radio" value="yes" checked={callPref === 'yes'} onChange={() => setCallPref('yes')} />
                    Перезвонить перед отправкой
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="checkout-submit-wrap">
            <div className="checkout-submit-row">
              <label className="checkout-agree">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span>Я согласен на обработку моих персональных данных в соответствии с <a href="#">Условиями</a></span>
              </label>
              <button className="checkout-submit" disabled={!agreed} onClick={() => setOrderDone(true)}>Оформить заказ</button>
            </div>
          </div>
        </div>
      </main>
      {orderDone && (
        <div className="cart-modal-overlay" onClick={() => setOrderDone(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <button className="cart-modal__close" onClick={() => setOrderDone(false)}>✕</button>
            <div className="cart-modal__empty">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="36" fill="rgba(114,164,121,0.15)" />
                <circle cx="36" cy="36" r="28" fill="rgba(114,164,121,0.2)" />
                <polyline points="22,37 32,47 50,27" stroke="#72A479" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <h3>ЗАКАЗ ОФОРМЛЕН</h3>
              <p style={{ color: '#aaa', fontSize: 14, textAlign: 'center', lineHeight: 1.6 }}>
                Мы свяжемся с вами в ближайшее время
              </p>
              <button className="cart-modal__menu-btn" onClick={() => { setOrderDone(false); navigate('/'); }}>
                На главную
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer noMap />
    </>
  );
}
