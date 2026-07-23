import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="wrap cancel">
      <div className="cancel-ic">🛒</div>
      <h1>Checkout cancelled</h1>
      <p className="muted">No payment was taken. Your cart is still saved — you can pick up right where you left off.</p>
      <div className="cancel-cta">
        <Link to="/checkout" className="btn btn-green btn-lg">Return to checkout</Link>
        <Link to="/cart" className="btn btn-ghost btn-lg">View cart</Link>
      </div>
    </div>
  );
}
