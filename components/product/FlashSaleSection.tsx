// components/product/FlashSaleSection.tsx
'use client';
import { useState, useEffect } from 'react';
import { FlashSaleCard } from './FlashSaleCard';
import { IProduct } from '@/types';
import { Zap } from 'lucide-react';

export function FlashSaleSection() {
  const [flashProducts, setFlashProducts] = useState<IProduct[]>([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const fetchFlashProducts = async () => {
      try {
        const res  = await fetch('/api/products/flash-sale');
        const data = await res.json();
        setFlashProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch flash sale products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-64 bg-gray-200 rounded-3xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-500 p-2 rounded-xl">
            <Zap size={24} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Flash Deals</h2>
            <p className="text-gray-500 text-sm">Limited time offers — grab them before they expire!</p>
          </div>
        </div>

        {/* Flash Sale Cards */}
        <div className="space-y-6">
          {flashProducts.map((product) => (
            <FlashSaleCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}