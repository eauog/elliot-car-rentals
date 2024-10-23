// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Booking from '@/models/Booking';

// export async function GET() {
//   try {
//     await connectToDB();
//     const bookings = await Booking.find().populate('vehicle customer');
//     return NextResponse.json(bookings, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  try {
    const { vehicleId, startDate, endDate, totalPrice } = await request.json();

    await connectToDB();

    const booking = new Booking({
      vehicle: vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: 'pending',
    });

    await booking.save();

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
