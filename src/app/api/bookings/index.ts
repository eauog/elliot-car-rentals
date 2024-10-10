import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();

      // Find all bookings
      const bookings = await Booking.find().populate('vehicle customer');

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
