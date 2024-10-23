import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { token } = await request.json();

    const user = await User.findOne({ emailConfirmationToken: token });
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    user.isEmailConfirmed = true;
    user.emailConfirmationToken = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email confirmed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during email confirmation:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
