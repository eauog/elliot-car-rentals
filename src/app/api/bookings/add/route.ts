import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectToDB();

    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; 
    }

    const user = result; 
    const customerId = user.id;

    const { vehicleId, startDate, endDate, totalPrice } = await request.json();

    if (!vehicleId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ message: 'Please provide all required fields: vehicleId, startDate, endDate, and totalPrice.' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return NextResponse.json({ message: 'Invalid vehicle ID.' }, { status: 400 });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.availability) {
      return NextResponse.json({ message: 'Vehicle is not available for booking.' }, { status: 400 });
    }

    const booking = new Booking({
      customer: customerId,
      vehicle: vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice, 
    });

    await booking.save();

    vehicle.availability = false;
    await vehicle.save();

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Error adding booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to create booking.' }, { status: 500 });
  }
}
