import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import upload from '@/middlewares/uploadMiddleware';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(authMiddleware);
handler.use(roleMiddleware(['admin', 'manager']));  

handler.use(upload.single('image'));

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    await connectToDB();

    const { make, model, year, pricePerDay } = req.body;

    if (!make || !model || !year || !pricePerDay) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const vehicle = new Vehicle({
      make,
      model,
      year,
      pricePerDay,
      availability: true,
      maintenanceSchedule: [],
      imageUrl: req.file.path,  
    });

    await vehicle.save();
    res.status(201).json({ success: true, vehicle });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default handler;
