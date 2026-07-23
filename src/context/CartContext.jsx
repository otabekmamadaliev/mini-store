import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'ministore.cart.v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, qty = 1 } = action;
      const existing = state.find((i) => i.id === product.id);
      if (existing) {
        return state.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
        );
      }
      return [
        ...state,
        {
          id: product.id, name: product.name, price: product.price,
          category: product.category, shape: product.shape, colors: product.colors,
          qty: Math.min(qty, 99),
        },
      ];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'setQty': {
      const qty = Math.max(1, Math.min(action.qty, 99));
      return state.map((i) => (i.id === action.id ? { ...i, qty } : i));
    }
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart still works in-memory */
    }
  }, [items]);

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.count += i.qty;
        acc.subtotal += i.qty * i.price;
        return acc;
      },
      { count: 0, subtotal: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items, count, subtotal, isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      toggleCart: () => setOpen((o) => !o),
      addItem: (product, qty = 1) => {
        dispatch({ type: 'add', product, qty });
        setOpen(true);
      },
      removeItem: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clearCart: () => dispatch({ type: 'clear' }),
    }),
    [items, count, subtotal, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export const SHIPPING_FLAT = 2.99;
export const FREE_SHIP_THRESHOLD = 40;

export function shippingFor(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export const fmt = (n) => `$${n.toFixed(2)}`;
