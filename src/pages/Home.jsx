import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, BadgeCheck, Headphones, Cookie, CupSoda, Bath, SprayCan } from 'lucide-react';
import HeroBasket from '../components/HeroBasket.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS, CATEGORIES } from '../data/products.js';

const FEATURES = [
  { Icon: Truck, title: 'Fast Delivery', sub: '1–3 Day Delivery' },
  { Icon: ShieldCheck, title: 'Secure Payment', sub: '100% Safe Checkout' },
  { Icon: BadgeCheck, title: 'Quality Products', sub: 'Handpicked for You' },
  { Icon: Headphones, title: 'Customer Support', sub: "We're Here to Help" },
];

const CAT_ICON = { Snacks: Cookie, Beverages: CupSoda, 'Personal Care': Bath, Household: SprayCan };

export default function Home() {
  const popular = PRODUCTS.slice(0, 4);
  const cats = CATEGORIES.filter((c) => c !== 'All');

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="pill reveal">Everyday essentials</span>
            <h1 className="reveal reveal-d1">
              Everything You Need,<br />
              <span className="hl">All in One Place</span>
            </h1>
            <p className="reveal reveal-d2">
              Your mini store for everyday essentials, delivered with care.
            </p>
            <div className="hero-cta reveal reveal-d3">
              <Link to="/shop" className="btn btn-green btn-lg">Shop Now →</Link>
              <Link to="/about" className="btn btn-ghost btn-lg">Learn more</Link>
            </div>
          </div>
          <HeroBasket />
        </div>

        {/* feature strip */}
        <div className="wrap">
          <div className="feats stagger">
            {FEATURES.map((f) => (
              <div className="feat" key={f.title}>
                <span className="feat-ic" aria-hidden="true"><f.Icon size={22} /></span>
                <div>
                  <h4>{f.title}</h4>
                  <p className="muted">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section cats-sec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Browse by category</span>
            <h2>Shop what you need</h2>
          </div>
          <div className="cat-grid stagger">
            {cats.map((cat) => {
              const Ic = CAT_ICON[cat];
              return (
                <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} className="cat-card">
                  <span className="cat-ic" aria-hidden="true"><Ic size={30} /></span>
                  <span className="cat-name">{cat}</span>
                  <span className="cat-go">Shop →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="section popular-sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Best sellers</span>
              <h2>Popular right now</h2>
            </div>
            <Link to="/shop" className="sec-more">View all products →</Link>
          </div>
          <div className="pgrid stagger">
            {popular.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap cta-in">
          <div>
            <h2>Free delivery on orders over $40</h2>
            <p>Stock up on the essentials and let us bring them to your door.</p>
          </div>
          <Link to="/shop" className="btn btn-lg cta-btn">Start shopping</Link>
        </div>
      </section>
    </div>
  );
}
