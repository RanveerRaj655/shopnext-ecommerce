// app/page.tsx
import { FlashSaleSection } from '@/components/product/FlashSaleSection';

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-black text-white min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-4">
              New Collection 2025
            </p>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              Style That <br />
              <span className="text-blue-500">Speaks.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Discover premium products crafted for those who demand the best.
              Free shipping on orders over $50.
            </p>
            <div className="flex gap-4">
              <a
                href="/products"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Shop Now
              </a>
              <a
                href="/products?category=sale"
                className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
              >
                View Sale
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <FlashSaleSection />

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Men', 'Women', 'Accessories', 'Sale'].map((cat) => (
              <a
                key={cat}
                href={`/products?category=${cat.toLowerCase()}`}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="text-4xl mb-3">
                  {cat === 'Men'
                    ? '👔'
                    : cat === 'Women'
                    ? '👗'
                    : cat === 'Accessories'
                    ? '👟'
                    : '🔥'}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
