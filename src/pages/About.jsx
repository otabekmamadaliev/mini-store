import { Link } from 'react-router-dom';
import { Check, Leaf, Zap, HeartHandshake } from 'lucide-react';
import { ABOUT_IMAGE } from '../data/productImages.js';

const POINTS = ['Handpicked Quality', 'Affordable Prices', 'Fast & Reliable Delivery', 'Customer Satisfaction'];
const STATS = [
  { n: '10k+', l: 'Happy customers' },
  { n: '500+', l: 'Products stocked' },
  { n: '1–3d', l: 'Delivery time' },
  { n: '4.9★', l: 'Average rating' },
];

export default function About() {
  return (
    <div className="about-page">
      <div className="wrap">
        <section className="about-hero">
          <div className="about-copy reveal">
            <span className="eyebrow">About us</span>
            <h1>About MiniStore</h1>
            <p>MiniStore is your go-to online store for daily essentials, snacks, personal care and more — all in one convenient place. We keep the range tight, the prices fair, and the delivery fast.</p>
            <ul className="about-list">
              {POINTS.map((p) => (
                <li key={p}><span className="tick"><Check size={13} strokeWidth={3} /></span>{p}</li>
              ))}
            </ul>
            <Link to="/shop" className="btn btn-green btn-lg">Start shopping</Link>
          </div>

          <div className="about-img reveal reveal-d2">
            <img src={ABOUT_IMAGE} alt="MiniStore shelves, stocked daily" loading="lazy" />
            <span className="about-cap">Our shelves, stocked daily</span>
          </div>
        </section>

        <section className="about-stats stagger">
          {STATS.map((s) => (
            <div className="about-stat" key={s.l}>
              <b>{s.n}</b><span className="muted">{s.l}</span>
            </div>
          ))}
        </section>

        <section className="about-values">
          <div className="sec-head center">
            <span className="eyebrow">Why MiniStore</span>
            <h2>Built around your everyday</h2>
          </div>
          <div className="values-grid stagger">
            <div className="value"><span className="value-ic"><Leaf size={26} /></span><h4>Quality first</h4><p className="muted">Every product is chosen for value and reliability — nothing on the shelf we wouldn’t buy ourselves.</p></div>
            <div className="value"><span className="value-ic"><Zap size={26} /></span><h4>Fast & reliable</h4><p className="muted">Orders ship within 1–3 days, with tracking so you always know where things are.</p></div>
            <div className="value"><span className="value-ic"><HeartHandshake size={26} /></span><h4>Here to help</h4><p className="muted">A friendly support team, easy returns, and a 30-day guarantee on everything.</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}
