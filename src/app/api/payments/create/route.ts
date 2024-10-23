import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import { authMiddleware } from '@/middlewares/authMiddleware';

export async function POST(request: Request) {
  try {
    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; 
    }
    
    const user = result; 
    const customerId = user.id; 
    
    const { bookingId, reference, amount } = await request.json();

    if (!bookingId || !amount || !reference) {
      return NextResponse.json({ message: 'Booking ID, reference, and amount are required.' }, { status: 400 });
    }

    await connectToDB();

    const payment = new Payment({
      booking: bookingId,
      customer: customerId,
      amount,
      reference,
    });

    await payment.save();

    return NextResponse.json({ success: true, payment }, { status: 201 });

  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ message: 'Failed to create payment' }, { status: 500 });
  }
}
