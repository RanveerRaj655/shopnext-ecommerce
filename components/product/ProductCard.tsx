// components/product/ProductCard.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { IProduct } from '@/types';

export function ProductCard({ product }: { product: IProduct }) {
  const handleAddToCart = () => {
    toast.success('Added to cart!');
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isFlashSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                ⚡ FLASH SALE
              </span>
            )}
            {discount && (
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
            <Heart size={16} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mt-1 truncate">{product.category}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Stock warning */}
        {product.stock < 10 && (
          <p className="text-red-500 text-xs mt-2 font-medium">
            Only {product.stock} left!
          </p>
        )}
      </div>
    </div>
  );
}