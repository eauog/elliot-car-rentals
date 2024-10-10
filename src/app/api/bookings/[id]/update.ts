import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      await connectToDB();
      const { id } = req.query;
      const { status } = req.body;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      if (status === 'confirmed') {
        booking.status = 'confirmed';
      } else if (status === 'cancelled') {
        booking.status = 'cancelled';

        const vehicle = await Vehicle.findById(booking.vehicle);
        vehicle.availability = true;
        await vehicle.save();
      }

      await booking.save();
      res.status(200).json({ success: true, booking });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
