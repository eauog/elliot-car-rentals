import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDB();
      const vehicles = await Vehicle.find({ availability: true });

      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
