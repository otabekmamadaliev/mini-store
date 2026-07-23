import { useState } from 'react';
import { Link } from 'react-router-dom';

const Social = {
  facebook: <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3H16V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.4v1.9H8.2V14h2.4v7h2.9Z" />,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="16.5" cy="7.5" r="1.1" /></>,
  youtube: <><rect x="3" y="6" width="18" height="12" rx="3.5" /><path d="M10 9.2v5.6l5-2.8z" fill="var(--green-d)" /></>,
  x: <path d="M17.5 4h2.6l-5.7 6.5L21 20h-5.2l-4-5.2L7 20H4.4l6.1-7-6.3-9h5.3l3.6 4.8L17.5 4Zm-.9 14.4h1.4L8.5 5.5H7l9.6 12.9Z" />,
};
function SocialIcon({ name }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{Social[name]}</svg>;
}

const SOCIALS = [
  { name: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
  { name: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  { name: 'youtube', label: 'YouTube', url: 'https://youtube.com' },
  { name: 'x', label: 'X', url: 'https://x.com' },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo foot-logo">
              <span className="logo-bag" aria-hidden="true" />
              MiniStore
            </div>
            <p>Everything you need, delivered to your door.</p>
            <div className="socials" aria-label="Social links">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="foot-col">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="foot-col">
            <h5>Customer Care</h5>
            <Link to="/faq">FAQs</Link>
            <Link to="/faq#shipping">Shipping Policy</Link>
            <Link to="/faq#returns">Returns &amp; Refunds</Link>
            <Link to="/faq#tracking">Track Order</Link>
          </div>

          <div className="foot-col foot-news">
            <h5>Stay Updated</h5>
            {subscribed ? (
              <p className="news-done">✓ Thanks — you’re subscribed!</p>
            ) : (
              <>
                <p>Subscribe to get updates and offers.</p>
                <form className="news" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                  <input type="email" placeholder="Your Email" aria-label="Email address" required />
                  <button type="submit" aria-label="Subscribe">→</button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="foot-bot">
          <span>© {new Date().getFullYear()} MiniStore. All rights reserved.</span>
          <span className="foot-links">
            <Link to="/faq#legal">Privacy</Link>
            <Link to="/faq#legal">Terms</Link>
            <Link to="/contact">Support</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
