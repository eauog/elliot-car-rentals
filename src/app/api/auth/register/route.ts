import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '@/models/User';
import { connectToDB } from '@/utils/db';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { name, email, password, role } = await request.json();
    console.log("d1:", { name, email, password, role });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // email confirmation token
    const emailConfirmationToken = crypto.randomBytes(20).toString('hex');

    // new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      emailConfirmationToken,
    });

    await newUser.save();

    // confirmation email
    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/(auth)/confirm-email?token=${emailConfirmationToken}`;
    await sendEmail({
      to: email,
      subject: 'Email Confirmation',
      html: `Please confirm your email by clicking the following link: <a href="${confirmUrl}">Confirm Email</a><br/>`,
    });

    return NextResponse.json({ message: 'Registration successful! Please confirm your email.' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
