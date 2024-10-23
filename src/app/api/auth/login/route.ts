import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { signToken } from '@/utils/auth';
import { connectToDB } from '@/utils/db';

// POST request handler for login
export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Sign and return token
    const token = signToken(user);
    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
