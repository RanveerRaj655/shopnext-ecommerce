// app/api/products/flash-sale/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    // Find products where flash sale is active and not expired
    const products = await Product.find({
      isFlashSale:     true,
      flashSaleEndsAt: { $gt: now },
    })
      .limit(3)
      .lean();

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}