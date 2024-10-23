// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';
// import axios from 'axios';

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// // POST request to initiate payment
// export async function POST(request: Request) {
//   const { bookingId, customerId, amount } = await request.json();

//   if (!bookingId || !customerId || !amount) {
//     return NextResponse.json({ message: 'Booking ID, Customer ID, and amount are required' }, { status: 400 });
//   }

//   await connectToDB();

//   // Generate a unique reference for this payment
//   const reference = `PAY_${Date.now()}`;

//   // Save a new pending payment in the database
//   const payment = new Payment({
//     booking: bookingId,
//     customer: customerId,
//     amount,
//     reference,
//     status: 'pending',
//   });

//   await payment.save();

//   try {
//     // Initiate payment using Paystack
//     const response = await axios.post(
//       'https://api.paystack.co/transaction/initialize',
//       {
//         email: 'customer@example.com', 
//         amount: amount * 100, 
//         reference: reference,
//         callback_url: 'http://localhost:3000/payments/verify', 
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return NextResponse.json({ paymentUrl: response.data.data.authorization_url }, { status: 200 });
//   } catch (error) {
//     console.error('Error initiating payment:', error);
//     return NextResponse.json({ message: 'Failed to initiate payment' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import axios from 'axios';
import { authMiddleware } from '@/middlewares/authMiddleware';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'your-default-secret-key';

// POST request to initiate payment
export async function POST(request: Request) {
  try {
    const result = await authMiddleware(request);

    if (result instanceof NextResponse) {
      return result; 
    }
    const user = result; 
    const customerId = user.id;
    
    const { bookingId, email, amount } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ message: 'Booking ID and amount are required' }, { status: 400 });
    }

    await connectToDB();

    const reference = `PAY_${Date.now()}`;
    const payment = new Payment({
      booking: bookingId,
      customer: customerId,
      amount,
      reference,
      status: 'pending',
    });

    await payment.save();

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email,
        amount: amount * 10000,
        reference,
        callback_url: 'http://localhost:3000/payments/verify',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ paymentUrl: response.data.data.authorization_url }, { status: 200 });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json({ message: 'Failed to initiate payment' }, { status: 500 });
  }
}
