
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: '✅ MongoDB connected successfully!' });
  } catch (error) {
    return NextResponse.json({ status: '❌ Connection failed', error: String(error) }, { status: 500 });
  }
}
