import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();
      const customerId = req.user.id; 

      const bookings = await Booking.find({ customer: customerId }).populate('vehicle');

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
