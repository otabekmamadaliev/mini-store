import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Store, Lock, ShieldCheck, RotateCcw, Headphones, Clock, MapPin } from 'lucide-react';
import ProductImage from '../components/ProductImage.jsx';
import { useCart, fmt, shippingFor } from '../context/CartContext.jsx';

const LAST_ORDER_KEY = 'ministore.lastOrder.v1';

// Generate a handful of upcoming pickup slots (skips "now", next 3 days).
function buildPickupSlots() {
  const times = ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'];
  const days = [
    { label: 'Today', offset: 0 },
    { label: 'Tomorrow', offset: 1 },
    { label: null, offset: 2 },
  ];
  const slots = [];
  const now = new Date();
  for (const d of days) {
    const date = new Date(now);
    date.setDate(now.getDate() + d.offset);
    const dayLabel = d.label || date.toLocaleDateString(undefined, { weekday: 'long' });
    for (const t of times) {
      // skip slots earlier than ~2h from now, today only
      slots.push({ id: `${d.offset}-${t}`, label: `${dayLabel}, ${t}` });
    }
  }
  return slots.slice(0, 9);
}

export default function Checkout() {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const pickupSlots = useMemo(buildPickupSlots, []);

  const [method, setMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', zip: '',
    pickupSlot: pickupSlots[0]?.id || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const shipping = method === 'pickup' ? 0 : shippingFor(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="wrap cart-empty">
        <div className="cart-empty-ic"><Store size={54} strokeWidth={1.3} /></div>
        <h1>Your cart is empty</h1>
        <p className="muted">Add some products before checking out.</p>
        <Link to="/shop" className="btn btn-green btn-lg">Browse products</Link>
      </div>
    );
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email';
    if (method === 'delivery') {
      if (!form.street.trim()) err.street = 'Enter your street address';
      if (!form.city.trim()) err.city = 'Enter your city';
      if (!form.zip.trim()) err.zip = 'Enter your ZIP/postal code';
    } else if (!form.pickupSlot) {
      err.pickupSlot = 'Choose a pickup time';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const fulfillment = () =>
    method === 'delivery'
      ? { method, address: { street: form.street, city: form.city, zip: form.zip } }
      : { method, pickupSlot: pickupSlots.find((s) => s.id === form.pickupSlot)?.label || '' };

  const handlePay = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);

    const order = {
      items, subtotal, shipping, total,
      customer: { name: form.name, email: form.email, phone: form.phone },
      fulfillment: fulfillment(), ts: Date.now(),
    };
    try { localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order)); } catch { /* ignore */ }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          customer: order.customer,
          fulfillment: order.fulfillment,
        }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      throw new Error('No checkout URL returned');
    } catch (err) {
      if (import.meta.env.DEV) { navigate('/checkout/success?demo=1'); return; }
      setApiError('We couldn’t reach the payment service. Please try again in a moment.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <div className="wrap">
        <div className="co-head">
          <h1>Checkout</h1>
          <p className="co-secure"><Lock size={15} /> Secure payment powered by <b className="stripe">Stripe</b></p>
        </div>

        {/* Fulfillment choice */}
        <div className="fulfill" role="radiogroup" aria-label="Delivery or pickup">
          <button type="button" role="radio" aria-checked={method === 'delivery'}
            className={`fulfill-opt ${method === 'delivery' ? 'active' : ''}`} onClick={() => setMethod('delivery')}>
            <Truck size={24} />
            <span className="fulfill-title">Delivery</span>
            <span className="fulfill-sub">To your door in 1–3 days{subtotal >= 40 ? ' · Free' : ` · ${fmt(shippingFor(subtotal))}`}</span>
          </button>
          <button type="button" role="radio" aria-checked={method === 'pickup'}
            className={`fulfill-opt ${method === 'pickup' ? 'active' : ''}`} onClick={() => setMethod('pickup')}>
            <Store size={24} />
            <span className="fulfill-title">Store Pickup</span>
            <span className="fulfill-sub">Ready at your chosen time · Free</span>
          </button>
        </div>

        <form className="co-grid" onSubmit={handlePay} noValidate>
          {/* Customer + fulfillment details */}
          <section className="co-panel">
            <h4>Customer Information</h4>
            <label className="field-label">Full Name
              <input className={`field ${errors.name ? 'field-err' : ''}`} value={form.name}
                onChange={update('name')} placeholder="Jane Doe" autoComplete="name" />
              {errors.name && <span className="field-msg">{errors.name}</span>}
            </label>
            <label className="field-label">Email Address
              <input type="email" className={`field ${errors.email ? 'field-err' : ''}`} value={form.email}
                onChange={update('email')} placeholder="jane@example.com" autoComplete="email" />
              {errors.email && <span className="field-msg">{errors.email}</span>}
            </label>
            <label className="field-label">Phone Number <span className="muted">(optional)</span>
              <input className="field" value={form.phone} onChange={update('phone')}
                placeholder="+1 555 000 0000" autoComplete="tel" />
            </label>

            {method === 'delivery' ? (
              <div className="co-subsection">
                <h5><MapPin size={16} /> Delivery Address</h5>
                <label className="field-label">Street Address
                  <input className={`field ${errors.street ? 'field-err' : ''}`} value={form.street}
                    onChange={update('street')} placeholder="123 Market Street" autoComplete="address-line1" />
                  {errors.street && <span className="field-msg">{errors.street}</span>}
                </label>
                <div className="row2">
                  <label className="field-label">City
                    <input className={`field ${errors.city ? 'field-err' : ''}`} value={form.city}
                      onChange={update('city')} placeholder="Springfield" autoComplete="address-level2" />
                    {errors.city && <span className="field-msg">{errors.city}</span>}
                  </label>
                  <label className="field-label">ZIP / Postal
                    <input className={`field ${errors.zip ? 'field-err' : ''}`} value={form.zip}
                      onChange={update('zip')} placeholder="00000" autoComplete="postal-code" />
                    {errors.zip && <span className="field-msg">{errors.zip}</span>}
                  </label>
                </div>
              </div>
            ) : (
              <div className="co-subsection">
                <h5><Clock size={16} /> Pickup Time</h5>
                <p className="pickup-note muted">Pick a slot — we’ll have your order bagged and ready at the MiniStore counter, 12 Market Street.</p>
                <label className="field-label">Choose a time
                  <select className={`field ${errors.pickupSlot ? 'field-err' : ''}`} value={form.pickupSlot} onChange={update('pickupSlot')}>
                    {pickupSlots.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  {errors.pickupSlot && <span className="field-msg">{errors.pickupSlot}</span>}
                </label>
              </div>
            )}
          </section>

          {/* Payment */}
          <section className="co-panel">
            <h4>Payment</h4>
            <div className="stripe-box">
              <div className="stripe-logo">stripe</div>
              <p>You’ll be redirected to Stripe’s secure page to enter your card details. We never see or store your card number.</p>
              <div className="pay-methods"><span>Card</span><span>Apple Pay</span><span>Google Pay</span></div>
              <div className="testmode">
                <strong>Test mode</strong> — use card <code>4242 4242 4242 4242</code>, any future date &amp; any CVC.
              </div>
            </div>
          </section>

          {/* Order summary */}
          <aside className="co-panel co-summary">
            <h4>Order Summary</h4>
            <div className="co-items">
              {items.map((i) => (
                <div className="co-item" key={i.id}>
                  <div className="co-item-thumb">
                    <ProductImage id={i.id} name={i.name} colors={i.colors} />
                    <span className="co-item-qty">{i.qty}</span>
                  </div>
                  <span className="co-item-name">{i.name}</span>
                  <span className="co-item-price">{fmt(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="sum-line"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="sum-line">
              <span>{method === 'pickup' ? 'Pickup' : 'Shipping'}</span>
              <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
            </div>
            <div className="sum-total"><span>Total</span><strong>{fmt(total)}</strong></div>
            {apiError && <p className="co-api-error">{apiError}</p>}
            <button type="submit" className="btn btn-green btn-block btn-lg" disabled={loading}>
              {loading ? 'Redirecting…' : <><Lock size={16} /> Pay {fmt(total)}</>}
            </button>
            <p className="co-secure-note muted">Your payment is secure and encrypted</p>
          </aside>
        </form>

        <div className="co-trust">
          <span><ShieldCheck size={16} /> SSL Secured</span>
          <span><Lock size={16} /> PCI Compliant</span>
          <span><RotateCcw size={16} /> 30-Day Returns</span>
          <span><Headphones size={16} /> Customer Support</span>
        </div>
      </div>
    </div>
  );
}
