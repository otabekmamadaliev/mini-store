import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Truck, RotateCcw, Search, ShieldCheck, FileText, HelpCircle } from 'lucide-react';

const FAQS = [
  { q: 'How long does delivery take?', a: 'Orders are delivered within 1–3 business days. You’ll get a tracking link by email as soon as your order ships.' },
  { q: 'Is shipping really free?', a: 'Shipping is free on all orders over $40. Below that, a flat $2.99 rate applies. Store pickup is always free.' },
  { q: 'Can I pick up my order in store?', a: 'Yes — choose “Store Pickup” at checkout and pick a time slot. We’ll have your order bagged and ready at the counter, 12 Market Street.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major cards, plus Apple Pay and Google Pay, through Stripe’s secure checkout. We never see or store your card details.' },
  { q: 'How do I return something?', a: 'You have 30 days to return any unopened item for a full refund. Start a return from the Track Order section below or contact support.' },
];

function Accordion({ q, a, open, onToggle }) {
  return (
    <div className={`acc ${open ? 'open' : ''}`}>
      <button className="acc-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={18} className="acc-chev" />
      </button>
      <div className="acc-a" hidden={!open}><p>{a}</p></div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);

  const track = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setStatus({
      id: orderId.trim().toUpperCase(),
      steps: ['Order received', 'Packed', 'Out for delivery'],
      current: 2,
    });
  };

  return (
    <div className="faq-page">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">Help Center</span>
          <h1>How can we help?</h1>
          <p className="muted">Answers to common questions, plus shipping, returns, and order tracking.</p>
        </div>

        {/* quick nav */}
        <div className="faq-nav">
          <a href="#faq"><HelpCircle size={18} /> FAQs</a>
          <a href="#shipping"><Truck size={18} /> Shipping</a>
          <a href="#returns"><RotateCcw size={18} /> Returns</a>
          <a href="#tracking"><Search size={18} /> Track Order</a>
          <a href="#legal"><ShieldCheck size={18} /> Privacy &amp; Terms</a>
        </div>

        <section id="faq" className="faq-section reveal">
          <h2>Frequently asked questions</h2>
          <div className="acc-list">
            {FAQS.map((f, i) => (
              <Accordion key={i} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </section>

        <div className="faq-cards">
          <section id="shipping" className="faq-card">
            <div className="faq-card-ic"><Truck size={22} /></div>
            <h3>Shipping Policy</h3>
            <p className="muted">Free delivery on orders over $40, otherwise a flat $2.99. Orders ship within 1–3 business days with tracking. Store pickup is always free — choose a time slot at checkout.</p>
          </section>
          <section id="returns" className="faq-card">
            <div className="faq-card-ic"><RotateCcw size={22} /></div>
            <h3>Returns &amp; Refunds</h3>
            <p className="muted">Not happy? Return any unopened item within 30 days for a full refund to your original payment method. Perishable goods are non-returnable for safety reasons.</p>
          </section>
        </div>

        <section id="tracking" className="faq-track reveal">
          <h2>Track your order</h2>
          <p className="muted">Enter your order number (e.g. from your confirmation email) to see its status.</p>
          <form className="track-form" onSubmit={track}>
            <input className="field" placeholder="e.g. MS-12345678" value={orderId} onChange={(e) => setOrderId(e.target.value)} aria-label="Order number" />
            <button className="btn btn-green" type="submit"><Search size={16} /> Track</button>
          </form>
          {status && (
            <div className="track-result">
              <div className="track-head">Order <strong>{status.id}</strong> — <span className="pill">On its way</span></div>
              <div className="track-steps">
                {status.steps.map((s, i) => (
                  <div key={i} className={`track-step ${i <= status.current ? 'done' : ''}`}>
                    <span className="track-dot" />{s}
                  </div>
                ))}
              </div>
              <p className="muted track-eta">Estimated delivery: within 1–2 days.</p>
            </div>
          )}
        </section>

        <section id="legal" className="faq-cards">
          <section className="faq-card">
            <div className="faq-card-ic"><ShieldCheck size={22} /></div>
            <h3>Privacy</h3>
            <p className="muted">We only collect what we need to fulfil your order (name, email, address) and never sell your data. Payments are handled securely by Stripe — we never see your card number.</p>
          </section>
          <section className="faq-card">
            <div className="faq-card-ic"><FileText size={22} /></div>
            <h3>Terms</h3>
            <p className="muted">MiniStore is a demo storefront built for a portfolio. Orders placed here in test mode are not real purchases and no goods are shipped. Prices and availability are illustrative.</p>
          </section>
        </section>

        <div className="faq-contact-cta">
          <p>Still need a hand?</p>
          <Link to="/contact" className="btn btn-green btn-lg">Contact support</Link>
        </div>
      </div>
    </div>
  );
}
