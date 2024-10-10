import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await connectToDB();
    const { id } = req.query;
    const { make, model, year, pricePerDay, availability } = req.body;

    try {
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      vehicle.make = make || vehicle.make;
      vehicle.model = model || vehicle.model;
      vehicle.year = year || vehicle.year;
      vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
      vehicle.availability = availability !== undefined ? availability : vehicle.availability;

      await vehicle.save();
      res.status(200).json({ success: true, vehicle });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
