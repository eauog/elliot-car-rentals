import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';
import { sendEmail } from '@/utils/sendEmail';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDB();
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; 
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      html: `Click this link to reset your password: <a href="${resetUrl}">Reset Password</a>`,
    });

    res.status(200).json({ message: 'Password reset link sent' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
