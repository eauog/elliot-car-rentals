import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';

export async function GET() {
  await connectToDB();
  const bookings = await Booking.find()
    .populate('customer', 'name email')
    .populate('vehicle', 'make model')
    .exec();
  return NextResponse.json(bookings, { status: 200 });
}
