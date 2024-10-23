import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    isEmailConfirmed: false,
  });

  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}
