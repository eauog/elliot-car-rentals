// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Booking from '@/models/Booking';
// import Vehicle from '@/models/Vehicle';
// import { authMiddleware } from '@/middlewares/authMiddleware';
// import { roleMiddleware } from '@/middlewares/roleMiddleware';

// export async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PUT') {
//     try {
//       await connectToDB();
//       const { id } = req.query;
//       const { status } = req.body;

//       const booking = await Booking.findById(id);
//       if (!booking) {
//         return res.status(404).json({ message: 'Booking not found' });
//       }

//       if (status === 'confirmed') {
//         booking.status = 'confirmed';
//       } else if (status === 'cancelled') {
//         booking.status = 'cancelled';

//         const vehicle = await Vehicle.findById(booking.vehicle);
//         vehicle.availability = true;
//         await vehicle.save();
//       }

//       await booking.save();
//       res.status(200).json({ success: true, booking });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed.' });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import mongoose from 'mongoose';

export async function PUT(request: Request) {
  try {
    await connectToDB();

    // Authenticate user using the authMiddleware
    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; // If unauthorized, return the response from authMiddleware
    }

    const user = result; // Extract user information from the middleware
    const customerId = user.id;

    // Get booking ID from query parameters and parse the request body
    const { id } = new URL(request.url).searchParams;
    const { status } = await request.json();

    // Validate booking ID and status
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid booking ID.' }, { status: 400 });
    }

    if (!status || !['confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status. Allowed values are "confirmed" or "cancelled".' }, { status: 400 });
    }

    // Find the booking and ensure it's owned by the user
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ message: 'Booking not found.' }, { status: 404 });
    }

    if (booking.customer.toString() !== customerId) {
      return NextResponse.json({ message: 'You are not authorized to modify this booking.' }, { status: 403 });
    }

    // Update the booking status based on the provided status
    if (status === 'confirmed') {
      booking.status = 'confirmed';
    } else if (status === 'cancelled') {
      booking.status = 'cancelled';

      // If cancelled, make the vehicle available again
      const vehicle = await Vehicle.findById(booking.vehicle);
      if (!vehicle) {
        return NextResponse.json({ message: 'Vehicle not found.' }, { status: 404 });
      }
      vehicle.availability = true;
      await vehicle.save();
    }

    // Save the updated booking
    await booking.save();

    // Return the updated booking
    return NextResponse.json({ success: true, booking }, { status: 200 });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to update booking.' }, { status: 500 });
  }
}
