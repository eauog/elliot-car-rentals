import { NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/(auth)/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      html: `Click this link to reset your password: <a href="${resetUrl}">Reset Password</a>`,
    });

    return NextResponse.json({ message: 'Password reset link sent' }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
