import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { token, newPassword } = await request.json();

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }, 
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;  
    user.passwordResetExpires = undefined;  
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
