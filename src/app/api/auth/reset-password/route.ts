// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import User from '@/models/User';
// import { connectToDB } from '@/utils/db';

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     await connectToDB();
//     const { token, newPassword } = req.body;

//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetExpires: { $gt: Date.now() },  // Checking if token is still valid
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Updating the user's password
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.passwordResetToken = undefined;  // Clearing reset token
//     user.passwordResetExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }



import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';

// POST request handler for resetting the password
export async function POST(request: Request) {
  try {
    await connectToDB();

    const { token, newPassword } = await request.json();

    // Find user by reset token and ensure it hasn't expired
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }, // Token is still valid if expiration is in the future
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;  // Clear the reset token
    user.passwordResetExpires = undefined;  // Clear the expiration time
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
