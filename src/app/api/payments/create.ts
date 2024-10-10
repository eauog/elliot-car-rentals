// app/api/payments/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import stripe from '@/config/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDB();
      const { bookingId } = req.body;
      const customerId = req.user.id;  // Assuming user info is attached to request after auth

      // Find the booking
      const booking = await Booking.findById(bookingId);
      if (!booking || booking.customer.toString() !== customerId) {
        return res.status(400).json({ message: 'Invalid booking or unauthorized' });
      }

      // Create a payment intent in Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.totalPrice * 100, // Stripe accepts amounts in cents
        currency: 'usd',
        metadata: {
          bookingId: bookingId.toString(),
          customerId: customerId.toString(),
        },
      });

      // Create a payment record in the database
      const payment = new Payment({
        booking: bookingId,
        customer: customerId,
        amount: booking.totalPrice,
        status: 'pending',
        paymentIntentId: paymentIntent.id,
      });

      await payment.save();

      res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,  // Return client secret to client for frontend Stripe integration
        paymentId: payment._id,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
