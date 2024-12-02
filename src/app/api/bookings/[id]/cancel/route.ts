// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Booking from '@/models/Booking';
// import Vehicle from '@/models/Vehicle';

// export async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PUT') {
//     try {
//       await connectToDB();
//       const { id } = req.query;

//       const booking = await Booking.findById(id);
//       if (!booking) {
//         return res.status(404).json({ message: 'Booking not found' });
//       }

//       if (booking.customer.toString() !== req.user.id) {
//         return res.status(403).json({ message: 'You are not authorized to cancel this booking.' });
//       }

//       if (booking.status !== 'pending') {
//         return res.status(400).json({ message: 'Only pending bookings can be cancelled.' });
//       }

//       // Cancel the booking
//       booking.status = 'cancelled';
//       await booking.save();

//       // Make vehicle available again
//       const vehicle = await Vehicle.findById(booking.vehicle);
//       vehicle.availability = true;
//       await vehicle.save();

//       res.status(200).json({ success: true, message: 'Booking cancelled successfully.' });
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
import mongoose from 'mongoose';

export async function PUT(request: Request) {
  try {
    await connectToDB();

    // Authenticate user using the authMiddleware
    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result;  // If unauthorized, return the response from authMiddleware
    }

    const user = result;  // Extract user information from the middleware
    const customerId = user.id;

    // Get booking ID from query parameters and parse the request body
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { status } = await request.json();

    // Validate booking ID and status
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid booking ID.' }, { status: 400 });
    }

    if (!status || !['pending', 'cancelled'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status. Allowed values are "pending" or "cancelled".' }, { status: 400 });
    }

    // Find the booking and ensure it's owned by the user
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ message: 'Booking not found.' }, { status: 404 });
    }

    if (booking.customer.toString() !== customerId) {
      return NextResponse.json({ message: 'You are not authorized to modify this booking.' }, { status: 403 });
    }

    // Check if the booking is in 'pending' status before canceling
    if (status === 'cancelled' && booking.status !== 'pending') {
      return NextResponse.json({ message: 'Only pending bookings can be cancelled.' }, { status: 400 });
    }

    // Update the booking status
    booking.status = status;
    await booking.save();

    // If cancelled, make the vehicle available again
    if (status === 'cancelled') {
      const vehicle = await Vehicle.findById(booking.vehicle);
      if (!vehicle) {
        return NextResponse.json({ message: 'Vehicle not found.' }, { status: 404 });
      }
      vehicle.availability = true;
      await vehicle.save();
    }

    // Return the updated booking as a response
    return NextResponse.json({ success: true, booking }, { status: 200 });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to update booking.' }, { status: 500 });
  }
}
