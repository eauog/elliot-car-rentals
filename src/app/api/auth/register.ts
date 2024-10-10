import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';
import { sendEmail } from '@/utils/sendEmail';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDB();
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email confirmation token
    const emailConfirmationToken = crypto.randomBytes(20).toString('hex');

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      emailConfirmationToken,
    });

    await newUser.save();

    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm-email?token=${emailConfirmationToken}`;
    await sendEmail({
      to: email,
      subject: 'Email Confirmation',
      html: `Please confirm your email by clicking the following link: <a href="${confirmUrl}">Confirm Email</a>`,
    });

    res.status(201).json({ message: 'Registration successful! Please confirm your email.' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
