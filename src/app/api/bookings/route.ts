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
    });

    await booking.save();

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Faild to create booking" }, { status: 500 });
  }
}
