'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FlashSaleCard } from '@/components/product/FlashSaleCard';
import { IProduct } from '@/types';
import { Zap } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');

  // Sync URL parameters with state
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    const sortFromUrl = searchParams.get('sort') || 'newest';
    
    setCategory(categoryFromUrl);
    setSortBy(sortFromUrl);
  }, [searchParams]);

  const isFlashSaleView = category === 'sale';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // If viewing flash sales, fetch from flash-sale endpoint
        if (isFlashSaleView) {
          const res = await fetch('/api/products/flash-sale');
          const data = await res.json();
          setProducts(data.products || []);
        } else {
          // Otherwise fetch regular products with category filter
          const params = new URLSearchParams();
          
          if (category && category !== 'all') {
            params.append('category', category);
          }
          
          let sortParam = '-createdAt';
          if (sortBy === 'price-low') sortParam = 'price';
          else if (sortBy === 'price-high') sortParam = '-price';
          else if (sortBy === 'name') sortParam = 'name';
          
          params.append('sort', sortParam);
          
          const res = await fetch(`/api/products?${params.toString()}`);
          const data = await res.json();
          
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, isFlashSaleView]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            {isFlashSaleView ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <Zap size={24} className="text-white fill-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">Flash Sale</h1>
                </div>
                <p className="text-gray-600 mt-2">🔥 Limited time deals with countdown timers</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-2">Browse our collection</p>
              </>
            )}
          </div>
          
          {!isFlashSaleView && (
            <div className="flex gap-4 mt-6 md:mt-0">
              {/* Category Filter */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="accessories">Accessories</option>
                <option value="sale">Sale</option>
              </select>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold text-gray-700">
              {isFlashSaleView ? 'No flash sales available' : 'No products found'}
            </h3>
            <p className="text-gray-500 mt-2">
              {isFlashSaleView ? 'Check back soon for amazing deals!' : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600 text-sm">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            
            {/* Show Flash Sale Cards with timers for sale view */}
            {isFlashSaleView ? (
              <div className="space-y-6">
                {products.map((product) => (
                  <FlashSaleCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </>
        )}
      </div>
    </div>
  );
}