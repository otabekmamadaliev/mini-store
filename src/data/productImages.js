// Eagerly import all product photos and map them by filename (= product id).
const files = import.meta.glob('../assets/products/*.webp', { eager: true, import: 'default' });

const map = {};
for (const path in files) {
  const name = path.split('/').pop().replace('.webp', '');
  map[name] = files[path];
}

export const PRODUCT_IMAGES = map;
export const ABOUT_IMAGE = map['_about'];
export const imageFor = (id) => map[id];
