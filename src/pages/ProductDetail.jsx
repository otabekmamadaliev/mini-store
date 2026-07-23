import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Truck, Lock, RotateCcw } from 'lucide-react';
import ProductImage from '../components/ProductImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { QtyStepper } from '../components/CartDrawer.jsx';
import { getProduct, PRODUCTS } from '../data/products.js';
import { useCart, fmt } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="wrap notfound">
        <h1>Product not found</h1>
        <p className="muted">The product you’re looking for doesn’t exist or was removed.</p>
        <Link to="/shop" className="btn btn-green">Back to shop</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pd">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/shop">Shop</Link><span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pd-main">
          <div className="pd-media reveal">
            <span className="pd-cat pill">{product.category}</span>
            <ProductImage id={product.id} name={product.name} colors={product.colors} eager />
          </div>

          <div className="pd-info reveal reveal-d1">
            <div className="pd-rating"><Star size={15} fill="currentColor" strokeWidth={0} /> {product.rating.toFixed(1)} <span className="muted">· In stock</span></div>
            <h1>{product.name}</h1>
            <p className="pd-tag">{product.tagline}</p>
            <div className="pd-price">{fmt(product.price)}</div>
            <p className="pd-desc">{product.description}</p>

            <ul className="pd-meta">
              <li><span className="muted">Size</span><strong>{product.weight}</strong></li>
              <li><span className="muted">Category</span><strong>{product.category}</strong></li>
              <li><span className="muted">Delivery</span><strong>1–3 days</strong></li>
            </ul>

            <div className="pd-buy">
              <QtyStepper qty={qty} onDec={() => setQty((q) => Math.max(1, q - 1))} onInc={() => setQty((q) => Math.min(99, q + 1))} />
              <button className="btn btn-green btn-lg pd-add" onClick={() => addItem(product, qty)}>
                Add to Cart · {fmt(product.price * qty)}
              </button>
            </div>

            <div className="pd-trust">
              <span><Truck size={15} /> Free over $40</span><span><Lock size={15} /> Secure checkout</span><span><RotateCcw size={15} /> 30-day returns</span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pd-related">
            <div className="sec-head">
              <h2>You might also like</h2>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="sec-more">More in {product.category} →</Link>
            </div>
            <div className="pgrid stagger">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
