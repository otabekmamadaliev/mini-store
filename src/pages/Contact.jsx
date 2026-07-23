import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Check } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">Get in touch</span>
          <h1>Contact Us</h1>
          <p className="muted">Questions about an order or a product? We usually reply within a day.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item"><span className="contact-ic"><Mail size={20} /></span><div><h4>Email</h4><p className="muted">support@ministore.example</p></div></div>
            <div className="contact-item"><span className="contact-ic"><Phone size={20} /></span><div><h4>Phone</h4><p className="muted">+1 (555) 200-4242</p></div></div>
            <div className="contact-item"><span className="contact-ic"><MapPin size={20} /></span><div><h4>Address</h4><p className="muted">12 Market Street, Springfield</p></div></div>
            <div className="contact-item"><span className="contact-ic"><Clock size={20} /></span><div><h4>Hours</h4><p className="muted">Mon–Sat, 8am–8pm</p></div></div>
          </div>

          <form className="contact-form reveal reveal-d1" onSubmit={submit}>
            {sent ? (
              <div className="contact-sent">
                <div className="contact-sent-ic"><Check size={30} strokeWidth={3} /></div>
                <h3>Message sent!</h3>
                <p className="muted">Thanks {form.name.split(' ')[0] || 'there'} — we’ll be in touch soon.</p>
              </div>
            ) : (
              <>
                <label className="field-label">Name
                  <input className="field" value={form.name} onChange={update('name')} required placeholder="Your name" />
                </label>
                <label className="field-label">Email
                  <input type="email" className="field" value={form.email} onChange={update('email')} required placeholder="you@example.com" />
                </label>
                <label className="field-label">Message
                  <textarea className="field" rows={5} value={form.message} onChange={update('message')} required placeholder="How can we help?" />
                </label>
                <button type="submit" className="btn btn-green btn-block btn-lg">Send message</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
