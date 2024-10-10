import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      await connectToDB();
      const { id } = req.query;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      if (booking.customer.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to cancel this booking.' });
      }

      if (booking.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending bookings can be cancelled.' });
      }

      // Cancel the booking
      booking.status = 'cancelled';
      await booking.save();

      // Make vehicle available again
      const vehicle = await Vehicle.findById(booking.vehicle);
      vehicle.availability = true;
      await vehicle.save();

      res.status(200).json({ success: true, message: 'Booking cancelled successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
