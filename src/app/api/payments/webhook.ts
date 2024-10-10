// // app/api/payments/webhook.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { connectToDB } from '@/utils/db';
// import Payment from '@/models/Payment';
// import paystack from 'paystack';

// const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY!);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const event = req.body;  // Paystack sends the event as the request body

//     try {
//       await connectToDB();

//       if (event.event === 'charge.success') {
//         const { reference } = event.data;

//         // Update payment status in the database
//         const payment = await Payment.findOne({ reference });
//         if (payment) {
//           payment.status = 'completed';
//           await payment.save();

//           // Optionally update the related booking status
//           // const booking = await Booking.findById(payment.booking);
//           // if (booking) {
//           //   booking.status = 'confirmed';
//           //   await booking.save();
//           // }
//         }
//       }

//       res.status(200).json({ received: true });
//     } catch (error) {
//       res.status(500).json({ error: 'Error handling webhook' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,  // Webhook requests need the raw body to verify the signature
//   },
// };


// app/api/payments/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const event = req.body;

    try {
      await connectToDB();

      if (event.event === 'charge.success') {
        const { reference } = event.data;

        // Find and update payment status to completed
        const payment = await Payment.findOne({ reference });
        if (payment) {
          payment.status = 'completed';
          await payment.save();
        }
      }

      res.status(200).json({ received: true });
    } catch (error) {
      res.status(500).json({ error: 'Error handling webhook' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,  // Webhook requests need raw body to verify the signature
  },
};
