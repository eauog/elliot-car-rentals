import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDB();
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },  // Checking if token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Updating the user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;  // Clearing reset token
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
