// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';
// import axios from 'axios';

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// // GET request to verify payment status
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const reference = searchParams.get('reference');

//   if (!reference) {
//     return NextResponse.json({ message: 'Payment reference is required' }, { status: 400 });
//   }

//   await connectToDB();

//   // Find the payment by reference
//   const payment = await Payment.findOne({ reference });
//   if (!payment) {
//     return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
//   }

//   try {
//     // Verify the payment status using Paystack API
//     const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//       },
//     });

//     const { status } = response.data.data;

//     // Update payment status based on Paystack's response
//     if (status === 'success') {
//       payment.status = 'completed';
//     } else {
//       payment.status = 'failed';
//     }

//     await payment.save();

//     return NextResponse.json({ success: true, status: payment.status }, { status: 200 });
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     return NextResponse.json({ message: 'Failed to verify payment' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'your-default-secret-key';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ message: 'Payment reference is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const payment = await Payment.findOne({ reference });
    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const { status } = response.data.data;
    if (status === 'success') {
      payment.status = 'completed';
    } else {
      payment.status = 'failed';
    }

    await payment.save();

    return NextResponse.json({ success: true, status: payment.status }, { status: 200 });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Failed to verify payment' }, { status: 500 });
  }
}
