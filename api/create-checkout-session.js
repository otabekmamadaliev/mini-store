// Vercel serverless function — creates a Stripe Checkout Session (test mode).
// The Stripe secret key stays server-side, read from the STRIPE_SECRET_KEY env var.
import Stripe from 'stripe';
import { PRODUCTS } from '../src/data/products.js';

const FREE_SHIP_THRESHOLD = 40;
const SHIPPING_FLAT_CENTS = 299;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY).' });
  }

  const stripe = new Stripe(key);

  try {
    const { items = [], customer = {}, fulfillment = {} } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }
    const isPickup = fulfillment.method === 'pickup';

    // Build line items from the SERVER-side catalog — never trust client prices.
    let subtotalCents = 0;
    const line_items = [];
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) continue;
      const qty = Math.max(1, Math.min(parseInt(item.qty, 10) || 1, 99));
      const unit_amount = Math.round(product.price * 100);
      subtotalCents += unit_amount * qty;
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount,
          product_data: {
            name: product.name,
            description: product.tagline,
            metadata: { id: product.id, category: product.category },
          },
        },
      });
    }

    if (line_items.length === 0) {
      return res.status(400).json({ error: 'No valid products in cart.' });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const freeShipping = isPickup || subtotalCents >= FREE_SHIP_THRESHOLD * 100;

    const metadata = {
      customer_name: customer.name || '',
      customer_phone: customer.phone || '',
      fulfillment: isPickup ? 'pickup' : 'delivery',
    };
    if (isPickup) {
      metadata.pickup_slot = fulfillment.pickupSlot || '';
    } else if (fulfillment.address) {
      metadata.delivery_address =
        `${fulfillment.address.street || ''}, ${fulfillment.address.city || ''} ${fulfillment.address.zip || ''}`.trim();
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_email: customer.email || undefined,
      billing_address_collection: 'auto',
      metadata,
      shipping_options: freeShipping
        ? undefined
        : [{
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: SHIPPING_FLAT_CENTS, currency: 'usd' },
              display_name: 'Standard shipping (1–3 days)',
            },
          }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error:', err);
    return res.status(500).json({ error: 'Could not create checkout session.' });
  }
}
