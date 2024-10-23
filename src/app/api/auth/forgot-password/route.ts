// import { NextApiRequest, NextApiResponse } from 'next';
// import crypto from 'crypto';
// import User from '@/models/User';
// import { connectToDB } from '@/utils/db';
// import { sendEmail } from '@/utils/sendEmail';

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     await connectToDB();
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const resetToken = crypto.randomBytes(20).toString('hex');
//     user.passwordResetToken = resetToken;
//     user.passwordResetExpires = Date.now() + 3600000; 
//     await user.save();

//     const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;
//     await sendEmail({
//       to: email,
//       subject: 'Password Reset',
//       html: `Click this link to reset your password: <a href="${resetUrl}">Reset Password</a>`,
//     });

//     res.status(200).json({ message: 'Password reset link sent' });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';
import { sendEmail } from '@/utils/sendEmail';

// POST request handler for password reset
export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send password reset email
    const resetUrl = `${process.env.BASE_URL}/auth/reset-password?token=${resetToken}`;
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
