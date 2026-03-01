// components/product/ProductGrid.tsx
import { IProduct } from '@/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: IProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🔍</p>
        <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}