// app/api/bookings/add.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDB();
      const { vehicleId, startDate, endDate } = req.body;
      const customerId = req.user.id;  

      if (!vehicleId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }

      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle || !vehicle.availability) {
        return res.status(400).json({ message: 'Vehicle is not available.' });
      }

      // Calculate total price based on booking duration and vehicle price
      const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = days * vehicle.pricePerDay;

      // Create a new booking
      const booking = new Booking({
        customer: customerId,
        vehicle: vehicleId,
        startDate,
        endDate,
        totalPrice,
        status: 'pending',
      });

      await booking.save();

      vehicle.availability = false;
      await vehicle.save();

      res.status(201).json({ success: true, booking });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
