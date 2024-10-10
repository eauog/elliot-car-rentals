import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await connectToDB();
    const { id } = req.query;

    try {
      const vehicle = await Vehicle.findById(id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      await vehicle.remove();
      res.status(200).json({ success: true, message: 'Vehicle deleted' });
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
