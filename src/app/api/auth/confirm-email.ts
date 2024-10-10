import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';

export default async function confirmEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDB();
    const { token } = req.body;

    const user = await User.findOne({ emailConfirmationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isEmailConfirmed = true;
    user.emailConfirmationToken = undefined;  
    await user.save();

    res.status(200).json({ message: 'Email confirmed successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
