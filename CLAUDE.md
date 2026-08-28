# mini-store

Small e-commerce demo with real Stripe Checkout in test mode. Live at
**https://mini-store-olive.vercel.app**. Repo:
`github.com/otabekmamadaliev/mini-store`.

## Stack

React 19 + Vite 8, **plain JavaScript**, plain CSS split across
`src/index.css`, `src/styles/components.css` and `src/styles/pages.css`.
`react-router-dom` for routing, `framer-motion` for motion, `lucide-react` for
icons, `stripe` (server-side only).

## Stripe — the one piece of real infrastructure

`api/create-checkout-session.js` is a **Vercel serverless function**. It reads
`process.env.STRIPE_SECRET_KEY` and builds a Checkout Session from `PRODUCTS`.

- **The secret key is server-side only.** No `VITE_` prefix — that prefix is
  exactly what would compile it into the browser bundle. It belongs in
  Vercel → Settings → Environment Variables and nowhere else.
- **Never put a real key in the repo**, including `.env.example`. That file
  deliberately uses `your-stripe-test-secret-key` rather than an `sk_test_…`
  shaped string, because GitHub push-protection blocks key-shaped placeholders.
- Prices come from `src/data/products.js` on the **server**, not from the request
  body. Do not start trusting client-supplied prices.

**Outstanding:** `STRIPE_SECRET_KEY` is not yet set in Vercel, so live checkout
returns *"Stripe is not configured"*. Setting it, then running a real `4242…`
test purchase, is the remaining task.

## The bug that took the whole site down once

`src/pages/Home.jsx` maps category names to Lucide icons. A category present in
`CATEGORIES` but missing from `CAT_ICON` resolved to `undefined`, React threw
error #130 (undefined element type), and **the entire page went blank** — not
just the icon.

There is now a `FALLBACK_CAT_ICON` guard:

```js
const Ic = CAT_ICON[cat] ?? FALLBACK_CAT_ICON;
```

Keep it. The lesson generalises: in this codebase a lookup that returns a
*component* must always have a fallback, because the failure mode is a white
screen rather than a missing glyph.

## Rules

- **Branch + PR into `main`. Never commit directly to main.**
- `C:\Users\ASUS` is itself a git repo with an unborn `main` — running git from
  the wrong cwd silently operates on the home directory. Always
  `cd /c/Users/ASUS/Desktop/mini-store` first.
- Verify with `npm run build` and `npx oxlint src`. There is no test suite.
- The footer uses `.socials` — that class was checked and is **not** hidden by ad
  blockers, unlike `.social-row` / `.social-link`, which are. Leave it alone.

## Verifying visually

The Browser preview pane does not paint reliably here and freezes
`requestAnimationFrame`, so animations never advance and screenshots come back
blank. Verify in real Chrome.

Neither browser can emulate a phone viewport — the pane ignores the request and
the Chrome window will not resize below screen width. To test mobile, inject a
same-origin iframe and measure inside it; it gets its own layout viewport, so
media queries evaluate correctly:

```js
const f = document.createElement('iframe')
f.src = '/'; f.style.cssText = 'width:390px;height:800px'
document.body.appendChild(f)
// then read f.contentDocument / f.contentWindow
```
