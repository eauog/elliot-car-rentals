import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { signToken } from '@/utils/auth';
import { connectToDB } from '@/utils/db';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.status(200).json({ token, user });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
