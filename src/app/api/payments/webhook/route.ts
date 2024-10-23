import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';

export async function POST(request: Request) {
  const body = await request.json();
  const signature = request.headers.get('x-paystack-signature'); 
  const { event, data } = body;

  await connectToDB();

  if (event === 'charge.success') {
    // Find the payment by reference
    const payment = await Payment.findOne({ reference: data.reference });
    if (payment) {
      payment.status = 'completed';
      await payment.save();
      // Optionally update booking status to "confirmed" here
    }
  } else if (event === 'charge.failed') {
    const payment = await Payment.findOne({ reference: data.reference });
    if (payment) {
      payment.status = 'failed';
      await payment.save();
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}
