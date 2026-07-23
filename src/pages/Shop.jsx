import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS, CATEGORIES } from '../data/products.js';

const PAGE_SIZE = 8;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const urlCat = params.get('category');
  const initialCat = CATEGORIES.includes(urlCat) ? urlCat : 'All';

  const [category, setCategory] = useState(initialCat);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // keep state in sync if the URL category changes (e.g. from Home links)
  useEffect(() => {
    const c = params.get('category');
    setCategory(CATEGORIES.includes(c) ? c : 'All');
    setPage(1);
  }, [params]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCat = category === 'All' || p.category === category;
      const inQuery = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const pickCategory = (cat) => {
    setCategory(cat);
    setPage(1);
    setParams(cat === 'All' ? {} : { category: cat }, { replace: true });
  };

  return (
    <div className="shop">
      <div className="wrap">
        <div className="shop-head center">
          <span className="eyebrow">Our products</span>
          <h1>Shop Our Products</h1>
          <p className="muted">Quality products, great prices, delivered fast.</p>
        </div>

        <div className="shop-controls">
          <div className="chips" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                className={`chip ${category === cat ? 'active' : ''}`}
                onClick={() => pickCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="shop-search">
            <input
              type="search"
              placeholder="Search products…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              aria-label="Search products"
            />
          </div>
        </div>

        <p className="shop-count muted">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' ? ` in ${category}` : ''}
        </p>

        {pageItems.length === 0 ? (
          <div className="shop-empty">
            <div className="shop-empty-ic">🔍</div>
            <h3>No products found</h3>
            <p className="muted">Try a different category or search term.</p>
            <button className="btn btn-green" onClick={() => { setQuery(''); pickCategory('All'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="pgrid stagger" key={`${category}-${current}-${query}`}>
            {pageItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pager">
            <button className="pg" onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={current === 1} aria-label="Previous page">‹</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i}
                className={`pg ${current === i + 1 ? 'active' : ''}`}
                onClick={() => setPage(i + 1)} aria-label={`Page ${i + 1}`}
                aria-current={current === i + 1}>
                {i + 1}
              </button>
            ))}
            <button className="pg" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={current === totalPages} aria-label="Next page">›</button>
          </div>
        )}
      </div>
    </div>
  );
}
