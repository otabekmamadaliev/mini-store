import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <div className="notfound-code">404</div>
      <h1>Page not found</h1>
      <p className="muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="notfound-cta">
        <Link to="/" className="btn btn-green btn-lg">Back to Home</Link>
        <Link to="/shop" className="btn btn-ghost btn-lg">Go to Shop</Link>
      </div>
    </div>
  );
}
