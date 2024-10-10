// // app/api/payments/verify.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';
// import Booking from '@/models/Booking';
// import paystack from 'paystack';

// const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY!);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { reference, bookingId } = req.body;

//     try {
//       await connectToDB();

//       // Verify the payment with Paystack
//       const result = await paystackClient.transaction.verify(reference);

//       if (result.status && result.data.status === 'success') {
//         // Payment succeeded
//         const payment = await Payment.findOne({ reference });
//         if (payment) {
//           payment.status = 'completed';
//           await payment.save();

//           // Update booking status (e.g., mark booking as paid)
//           const booking = await Booking.findById(bookingId);
//           if (booking) {
//             booking.status = 'confirmed';
//             await booking.save();
//           }

//           return res.status(200).json({ success: true, message: 'Payment verified successfully' });
//         }
//       }

//       // If payment failed or reference is invalid
//       res.status(400).json({ success: false, message: 'Payment verification failed' });
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// app/api/payments/verify.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import paystack from 'paystack';

const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { reference, bookingId } = req.body;

    try {
      await connectToDB();

      // Verify the payment with Paystack
      const result = await paystackClient.transaction.verify(reference);

      if (result.status && result.data.status === 'success') {
        // Payment succeeded
        const payment = await Payment.findOne({ reference });
        if (payment) {
          payment.status = 'completed';
          await payment.save();

          // Optionally, update booking status
          const booking = await Booking.findById(bookingId);
          if (booking) {
            booking.status = 'confirmed';
            await booking.save();
          }

          return res.status(200).json({ success: true, message: 'Payment verified successfully' });
        }
      }

      // If verification failed or reference is invalid
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
