// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       await connectToDB();

//       // Fetch all payment records
//       const payments = await Payment.find().populate('customer booking');
//       res.status(200).json(payments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// app/api/payments/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();

      // Find all payments and return them
      const payments = await Payment.find().populate('customer booking');
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
