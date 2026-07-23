# MiniStore 🛒

A small, modern e-commerce demo — everyday essentials with a full cart and **real Stripe Checkout (test mode)**. Built as a portfolio showcase.

**Live demo:** _(add Vercel URL after deploy)_

## Features

- **Multi-page storefront** — Home, Shop, Product detail, Cart, Checkout, Success, About, Contact (React Router).
- **Product catalog** in JSON with category filtering, search, and pagination.
- **Cart** — add / remove / quantity, persisted in `localStorage`, with a slide-out drawer *and* a full cart page.
- **Stripe Checkout** via a Vercel serverless function (`/api/create-checkout-session`) — the secret key never leaves the server.
- **Polished UX** — Framer Motion animations, responsive layout, accessible (keyboard, focus management, ARIA), and clean empty / loading / error states.

## Tech

React 19 · Vite · React Router · Framer Motion · plain CSS variables · Stripe · Vercel serverless functions.

## Getting started

```bash
npm install
npm run dev
```

Without a Stripe key configured, the checkout button in **local dev** shortcuts to the success page so you can preview the whole flow. To exercise real Stripe Checkout locally, use the [Vercel CLI](https://vercel.com/docs/cli) (`vercel dev`) with `STRIPE_SECRET_KEY` set.

## Stripe setup

1. Create a free [Stripe account](https://dashboard.stripe.com) and grab your **test** secret key (`sk_test_…`).
2. In Vercel → Project → **Settings → Environment Variables**, add `STRIPE_SECRET_KEY`.
3. Deploy. On the checkout page, pay with test card **4242 4242 4242 4242**, any future expiry, any CVC.

See `.env.example`. **Never commit your real key.**

## Product images

Product visuals are lightweight inline **SVG illustrations** (`src/components/ProductArt.jsx`) — no external image files, trademark-safe generic product names.
