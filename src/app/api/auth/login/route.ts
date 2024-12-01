// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import User from '@/models/User';
// import { signToken } from '@/utils/auth';
// import { connectToDB } from '@/utils/db';

// export async function POST(request: Request) {
//   try {
//     await connectToDB();

//     const { email, password } = await request.json();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
//     }

//     const token = signToken(user);
//     return NextResponse.json({ token, user }, { status: 200 });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { signToken } from '@/utils/auth';
import { connectToDB } from '@/utils/db';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      // message for email not found
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // message for incorrect password
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    const token = signToken(user);
    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
