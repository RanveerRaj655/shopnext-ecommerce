// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    console.log('=== REGISTER API HIT ===');

    await connectDB();
    console.log('✅ DB Connected');

    const body = await req.json();
    console.log('📦 Body received:', body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    console.log('👤 Existing user check:', existingUser ? 'EXISTS' : 'NEW USER');

    if (existingUser) {
      return NextResponse.json(
        { error: 'Account already exists with this email' },
        { status: 409 }
      );
    }

    const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    console.log('🔑 Role assigned:', role);

    const user = await User.create({ name, email, password, role });
    console.log('✅ User created:', user._id);

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ REGISTER ERROR FULL:', error);
    console.error('❌ ERROR MESSAGE:', error.message);
    console.error('❌ ERROR STACK:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}