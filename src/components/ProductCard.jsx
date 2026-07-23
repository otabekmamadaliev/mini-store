import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import ProductImage from './ProductImage.jsx';
import { useCart, fmt } from '../context/CartContext.jsx';

// Card content is visible by default; the entrance reveal comes from a `.stagger`
// parent grid (CSS). Framer is used only for the tap micro-interaction.
export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="pcard">
      <Link to={`/product/${product.id}`} className="pcard-img" aria-label={product.name}>
        <span className="pcard-cat">{product.category}</span>
        <ProductImage id={product.id} name={product.name} colors={product.colors} eager />
      </Link>
      <div className="pcard-body">
        <div className="pcard-rating" aria-label={`Rated ${product.rating} out of 5`}>
          <Star size={14} fill="currentColor" strokeWidth={0} /> {product.rating.toFixed(1)}
        </div>
        <h4><Link to={`/product/${product.id}`}>{product.name}</Link></h4>
        <p className="pcard-tag">{product.tagline}</p>
        <div className="pcard-foot">
          <span className="pcard-price">{fmt(product.price)}</span>
          <motion.button
            className="btn btn-green pcard-add"
            whileTap={{ scale: 0.92 }}
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} /> Add
          </motion.button>
        </div>
      </div>
    </article>
  );
}
