// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

const sampleProducts = [
  {
    name: 'Classic White Sneaker',
    slug: 'classic-white-sneaker',
    description: 'Clean, minimal white sneaker perfect for everyday wear. Crafted with premium materials for lasting comfort.',
    price: 89.99,
    compareAtPrice: 120.00,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    category: 'men',
    tags: ['sneaker', 'white', 'casual'],
    stock: 50,
    isFlashSale: false,
  },
  {
    name: 'Premium Running Shoe',
    slug: 'premium-running-shoe',
    description: 'Engineered for performance. Lightweight foam sole with breathable mesh upper.',
    price: 129.99,
    compareAtPrice: 160.00,
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
    category: 'men',
    tags: ['running', 'sport', 'performance'],
    stock: 30,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  {
    name: 'Women\'s Sport Leggings',
    slug: 'womens-sport-leggings',
    description: 'High-waist compression leggings with moisture-wicking fabric. Perfect for yoga and gym.',
    price: 59.99,
    compareAtPrice: 80.00,
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800'],
    category: 'women',
    tags: ['leggings', 'sport', 'yoga'],
    stock: 75,
    isFlashSale: false,
  },
  {
    name: 'Minimalist Watch',
    slug: 'minimalist-watch',
    description: 'Sleek stainless steel watch with a clean dial. Water resistant up to 50m.',
    price: 199.99,
    compareAtPrice: 250.00,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    category: 'accessories',
    tags: ['watch', 'minimalist', 'steel'],
    stock: 20,
    isFlashSale: false,
  },
  {
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments for organization.',
    price: 149.99,
    compareAtPrice: 200.00,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
    category: 'women',
    tags: ['bag', 'leather', 'crossbody'],
    stock: 15,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    name: 'Oversized Hoodie',
    slug: 'oversized-hoodie',
    description: 'Ultra-soft cotton blend hoodie in an oversized fit. Perfect for lounging or streetwear.',
    price: 74.99,
    compareAtPrice: 99.00,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800'],
    category: 'men',
    tags: ['hoodie', 'oversized', 'streetwear'],
    stock: 60,
    isFlashSale: false,
  },
  {
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'Light and breezy floral dress perfect for summer days. 100% organic cotton.',
    price: 69.99,
    compareAtPrice: 95.00,
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'],
    category: 'women',
    tags: ['dress', 'summer', 'floral'],
    stock: 40,
    isFlashSale: false,
  },
  {
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description: 'Premium sound quality with active noise cancellation. 24hr battery life.',
    price: 159.99,
    compareAtPrice: 220.00,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'],
    category: 'accessories',
    tags: ['earbuds', 'wireless', 'audio'],
    stock: 25,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
  },
];

export async function GET() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    return NextResponse.json({
      message: '✅ Database seeded successfully!',
      count: sampleProducts.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
