// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       await connectToDB();
//       const customerId = req.user.id;

//       // Fetch all payments for the logged-in customer
//       const payments = await Payment.find({ customer: customerId }).populate('booking');
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// app/api/payments/mine.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       await connectToDB();
//       const customerId = req.user.id;  // Assume user info is attached after auth

//       // Find all payments for the logged-in customer
//       const payments = await Payment.find({ customer: customerId }).populate('booking');
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import { authMiddleware } from '@/middlewares/authMiddleware';

export async function GET(request: Request) {
  try {
    await connectToDB();

    // Run authentication middleware to get the user info
    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; // Return early if user is not authenticated
    }

    const user = result; // Assuming the result contains user info after authentication
    const customerId = user.id;

    // Find all payments for the logged-in customer
    const payments = await Payment.find({ customer: customerId }).populate('booking');

    return NextResponse.json(payments, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
