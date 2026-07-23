import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import ProductImage from './ProductImage.jsx';
import { useCart, fmt, shippingFor } from '../context/CartContext.jsx';

// The panel's open/close is driven by CSS transforms (compositor-reliable) rather
// than a JS animation, so the drawer always reaches its resting position. Framer
// is kept only for the non-critical item add/remove transitions.
export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, setQty } = useCart();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  const shipping = shippingFor(subtotal);

  return (
    <>
      <div
        className={`drawer-scrim ${isOpen ? 'show' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog" aria-modal="true" aria-label="Shopping cart"
        aria-hidden={!isOpen} inert={!isOpen ? true : undefined}
        tabIndex={-1} ref={panelRef}
      >
        <div className="drawer-head">
          <strong>
            Your Cart {items.length > 0 && <span className="muted">· {items.length} item{items.length > 1 ? 's' : ''}</span>}
          </strong>
          <button className="drawer-x" onClick={closeCart} aria-label="Close cart"><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <div className="drawer-empty-ic"><ShoppingCart size={40} strokeWidth={1.4} /></div>
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-green" onClick={closeCart}>Start shopping</Link>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                  <div className="drawer-item" key={item.id}>
                    <div className="drawer-thumb">
                      <ProductImage id={item.id} name={item.name} colors={item.colors} />
                    </div>
                    <div className="drawer-info">
                      <div className="drawer-name">{item.name}</div>
                      <div className="drawer-cat">{item.category}</div>
                      <QtyStepper
                        qty={item.qty}
                        onDec={() => setQty(item.id, item.qty - 1)}
                        onInc={() => setQty(item.id, item.qty + 1)}
                      />
                    </div>
                    <div className="drawer-side">
                      <div className="drawer-price">{fmt(item.price * item.qty)}</div>
                      <button className="drawer-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="drawer-foot">
              <div className="drawer-line"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="drawer-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
              </div>
              <div className="drawer-total"><span>Total</span><strong>{fmt(subtotal + shipping)}</strong></div>
              <Link to="/checkout" className="btn btn-green btn-block" onClick={closeCart}>
                Checkout →
              </Link>
              <Link to="/cart" className="drawer-viewcart" onClick={closeCart}>View full cart</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function QtyStepper({ qty, onDec, onInc }) {
  return (
    <div className="qty">
      <button onClick={onDec} aria-label="Decrease quantity" disabled={qty <= 1}>−</button>
      <span aria-live="polite">{qty}</span>
      <button onClick={onInc} aria-label="Increase quantity">+</button>
    </div>
  );
}
