import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Checkout.css';

const IS_OPEN = true; // Simulate cafe open/closed

export default function Checkout() {
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [payType, setPayType] = useState('online');
  const [timeType, setTimeType] = useState('asap');
  const [persons, setPersons] = useState(1);
  const [callPref, setCallPref] = useState('no');
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', street: '', house: '', apt: '', entrance: '', floor: '', code: '', restaurant: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <Header />
      <main className="checkout-page">
        <div className="container">
          <button className="checkout-page__back" onClick={() => navigate('/cart')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            В корзину
          </button>

          <div className="checkout-page__header">
            <span className="checkout-page__title-bar" />
            <h1 className="checkout-page__title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
          </div>

          {!IS_OPEN && (
            <div className="checkout-page__closed">
              <div className="closed-icon">🌙 z Z</div>
              <div>
                <p className="closed-title">Сегодня мы уже не доставляем.</p>
                <p className="closed-sub">Заказы принимаем до 20:50, доставляем с 8:30 до 21:10</p>
              </div>
            </div>
          )}

          <div className="checkout-page__sections">
            {/* 1. Contact */}
            <div className="checkout-section">
              <h2 className="checkout-section__num">1. Контактная информация</h2>
              <div className="checkout-section__body">
                <div className="checkout-row-2">
                  <input placeholder="Имя *" value={form.name} onChange={e => set('name', e.target.value)} />
                  <input placeholder="Телефон" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
            </div>

            {/* 2. Delivery */}
            <div className="checkout-section">
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
                    <span className="checkout-delivery-time">⏱ Доставим через 1 час 30 минут</span>
                  )}
                </div>

                {deliveryType === 'delivery' ? (
                  <div className="checkout-address">
                    <p className="checkout-address-label">Адрес доставки</p>
                    <div className="checkout-row-2">
                      <input placeholder="Укажите улицу" value={form.street} onChange={e => set('street', e.target.value)} />
                      <input placeholder="Номер дома" value={form.house} onChange={e => set('house', e.target.value)} />
                    </div>
                    <div className="checkout-row-3">
                      <input placeholder="№ квартиры/офиса" value={form.apt} onChange={e => set('apt', e.target.value)} />
                      <input placeholder="Подъезд" value={form.entrance} onChange={e => set('entrance', e.target.value)} />
                      <input placeholder="Этаж" value={form.floor} onChange={e => set('floor', e.target.value)} />
                    </div>
                    <input placeholder="Код двери" value={form.code} onChange={e => set('code', e.target.value)} style={{ maxWidth: 200 }} />
                  </div>
                ) : (
                  <div className="checkout-address">
                    <p className="checkout-address-label">Выберите ресторан</p>
                    <select value={form.restaurant} onChange={e => set('restaurant', e.target.value)} className="checkout-select">
                      <option value="">Выберите ресторан</option>
                      <option value="1">МО, с. Ильинское, Экспериментальная ул., 10</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Payment */}
            <div className="checkout-section">
              <h2 className="checkout-section__num">3. Оплатить</h2>
              <div className="checkout-section__body">
                <div className="checkout-tabs">
                  {[['online', 'Оплата онлайн'], ['card', 'Курьеру картой'], ['cash', 'Наличными']].map(([k, l]) => (
                    <button key={k} className={`checkout-tab ${payType === k ? 'active' : ''}`} onClick={() => setPayType(k)}>{l}</button>
                  ))}
                </div>
                {payType === 'cash' && (
                  <input placeholder="Сдача с" style={{ marginTop: 12, maxWidth: 200 }} />
                )}
              </div>
            </div>

            {/* 4. Time */}
            <div className="checkout-section">
              <h2 className="checkout-section__num">4. Когда доставить</h2>
              <div className="checkout-section__body">
                <div className="checkout-tabs">
                  {[['asap', 'В ближайшее время'], ['time', 'Ко времени'], ['later', 'Назначить время']].map(([k, l]) => (
                    <button key={k} className={`checkout-tab ${timeType === k ? 'active' : ''}`} onClick={() => setTimeType(k)}>{l}</button>
                  ))}
                </div>

                <div className="checkout-persons">
                  <span>Кол-во персон</span>
                  <div className="checkout-counter">
                    <button onClick={() => setPersons(p => Math.max(1, p - 1))}>−</button>
                    <span>{persons}</span>
                    <button onClick={() => setPersons(p => p + 1)}>+</button>
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
          <div className="checkout-submit-row">
            <label className="checkout-agree">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <span>Я согласен на обработку моих персональных данных в соответствии с <a href="#">условиями</a></span>
            </label>
            <button className="checkout-submit" disabled={!agreed}>Оформить заказ</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
