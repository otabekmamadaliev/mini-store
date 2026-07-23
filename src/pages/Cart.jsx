import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Lock, X } from 'lucide-react';
import ProductImage from '../components/ProductImage.jsx';
import { QtyStepper } from '../components/CartDrawer.jsx';
import { useCart, fmt, shippingFor, FREE_SHIP_THRESHOLD } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, subtotal, setQty, removeItem, clearCart } = useCart();
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="wrap cart-empty">
        <div className="cart-empty-ic"><ShoppingCart size={54} strokeWidth={1.3} /></div>
        <h1>Your cart is empty</h1>
        <p className="muted">Looks like you haven’t added anything yet.</p>
        <Link to="/shop" className="btn btn-green btn-lg">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="wrap">
        <div className="cart-head">
          <h1>Your Cart</h1>
          <button className="cart-clear" onClick={clearCart}>Clear cart</button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {remaining > 0 && (
              <div className="ship-nudge">
                <span className="ship-nudge-top"><Truck size={17} /> You’re <strong>{fmt(remaining)}</strong> away from free shipping!</span>
                <div className="ship-bar"><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)}%` }} /></div>
              </div>
            )}
            <div className="stagger">
              {items.map((item) => (
                <div className="cart-row" key={item.id}>
                  <Link to={`/product/${item.id}`} className="cart-thumb">
                    <ProductImage id={item.id} name={item.name} colors={item.colors} />
                  </Link>
                  <div className="cart-detail">
                    <Link to={`/product/${item.id}`} className="cart-name">{item.name}</Link>
                    <div className="cart-cat muted">{item.category}</div>
                    <div className="cart-unit muted">{fmt(item.price)} each</div>
                  </div>
                  <QtyStepper qty={item.qty}
                    onDec={() => setQty(item.id, item.qty - 1)}
                    onInc={() => setQty(item.id, item.qty + 1)} />
                  <div className="cart-line-price">{fmt(item.price * item.qty)}</div>
                  <button className="cart-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><X size={15} /></button>
                </div>
              ))}
            </div>
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="sum-line"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="sum-line"><span>Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
            <div className="sum-total"><span>Total</span><strong>{fmt(subtotal + shipping)}</strong></div>
            <Link to="/checkout" className="btn btn-green btn-block btn-lg">Proceed to Checkout</Link>
            <Link to="/shop" className="cart-continue">← Continue shopping</Link>
            <div className="sum-trust muted"><Lock size={13} /> Secure checkout powered by Stripe</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
