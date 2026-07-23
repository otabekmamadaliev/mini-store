import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useCart, fmt } from '../context/CartContext.jsx';

const LAST_ORDER_KEY = 'ministore.lastOrder.v1';

export default function Success() {
  const { clearCart } = useCart();
  const [params] = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw));
    } catch { /* ignore */ }
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderRef = 'MS-' + String(order?.ts || Date.now()).slice(-8);

  return (
    <div className="success">
      <div className="wrap success-in">
        <div className="success-ok pop"><Check size={44} strokeWidth={3} /></div>
        <h1 className="reveal reveal-d1">Payment Successful!</h1>
        <p className="muted reveal reveal-d2">
          Thank you for your order{order?.customer?.name ? `, ${order.customer.name.split(' ')[0]}` : ''}.
          {order?.customer?.email ? <> We’ve sent your order details to <strong>{order.customer.email}</strong>.</> : ' We’ve sent your order details to your email.'}
        </p>

        {params.get('demo') && (
          <p className="success-demo">Demo checkout (local dev) — no real payment was processed.</p>
        )}

        {order && (
          <div className="success-card reveal reveal-d3">
            <div className="success-card-head">
              <span>Order <strong>{orderRef}</strong></span>
              <span className="pill">Confirmed</span>
            </div>
            {order.fulfillment && (
              <div className="success-fulfill">
                {order.fulfillment.method === 'pickup' ? (
                  <>🏬 <strong>Store pickup</strong> — ready {order.fulfillment.pickupSlot} at 12 Market Street</>
                ) : (
                  <>🚚 <strong>Delivery</strong> to {order.fulfillment.address?.street}, {order.fulfillment.address?.city} {order.fulfillment.address?.zip}</>
                )}
              </div>
            )}
            <div className="success-lines">
              {order.items.map((i) => (
                <div className="success-line" key={i.id}>
                  <span>{i.qty} × {i.name}</span>
                  <span>{fmt(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="sum-line"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
            <div className="sum-line"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : fmt(order.shipping)}</span></div>
            <div className="sum-total"><span>Total paid</span><strong>{fmt(order.total)}</strong></div>
          </div>
        )}

        <div className="success-cta">
          <Link to="/" className="btn btn-green btn-lg">Back to Home</Link>
          <Link to="/shop" className="btn btn-ghost btn-lg">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
