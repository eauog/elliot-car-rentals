import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';

export async function GET() {
  await connectToDB();
  const users = await User.find().select('name email role isEmailConfirmed');
  return NextResponse.json(users, { status: 200 });
}
