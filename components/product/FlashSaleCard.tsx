// components/product/FlashSaleCard.tsx
'use client';
import { useFlashSale } from '@/hooks/useFlashSale';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { IProduct } from '@/types';
import toast from 'react-hot-toast';

interface Props {
  product: IProduct;
}

export function FlashSaleCard({ product }: Props) {
  const { timeLeft, isActive, isLastHour, discountRate } =
    useFlashSale(product.flashSaleEndsAt || null);

  const { addItem, openCart } = useCartStore();

  const discountedPrice = isLastHour
    ? product.price * (1 - discountRate)
    : product.price;

  const handleAddToCart = () => {
    addItem({
      id:       product._id,
      name:     product.name,
      price:    Number(discountedPrice.toFixed(2)),
      image:    product.images[0],
      quantity: 1,
    });
    openCart();
    toast.success('Added to cart!');
  };

  if (!isActive) return null;

  return (
    <div className={`relative rounded-3xl overflow-hidden ${isLastHour ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-orange-400 to-orange-600'} text-white p-6`}>

      {/* Flash Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Zap size={20} className="fill-white" />
        <span className="font-bold uppercase tracking-wider text-sm">
          Flash Sale
        </span>
        {isLastHour && (
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold">
            LAST HOUR — {Math.round(discountRate * 100)}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="flex-shrink-0">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-white/10">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 text-center md:text-left">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-2xl font-bold hover:opacity-80 transition-opacity">
              {product.name}
            </h3>
          </Link>
          <p className="opacity-80 mt-2 text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
            <span className="text-3xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {isLastHour && (
              <span className="text-lg opacity-60 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
            <p className="text-sm opacity-80">Ends in:</p>
            <div className="flex items-center gap-1">
              {timeLeft.split(':').map((unit, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[44px] text-center">
                    <p className="text-xl font-bold leading-none">{unit}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {i === 0 ? 'HRS' : i === 1 ? 'MIN' : 'SEC'}
                    </p>
                  </div>
                  {i < 2 && (
                    <span className="text-xl font-bold opacity-75">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-white text-orange-600 font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-orange-50 transition-colors mx-auto md:mx-0"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}