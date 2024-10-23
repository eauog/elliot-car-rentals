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
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();
      const customerId = req.user.id;  // Assume user info is attached after auth

      // Find all payments for the logged-in customer
      const payments = await Payment.find({ customer: customerId }).populate('booking');
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
