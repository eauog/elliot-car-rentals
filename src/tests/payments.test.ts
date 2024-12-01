import request from 'supertest';
// import app from '@/app';
import registerHandler from '@/app/api/auth/register/route';
import loginHandler from '@/app/api/auth/login/route';
import addvehicleHandler from '@/app/api/vehicles/add/route';
import addbookingHandler from '@/app/api/bookings/add/route';
import { connectToDB } from '@/utils/db';
import Payment from '@/models/Payment';
import User from '@/models/User';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';

let customerToken: string;
let bookingId: string;
let paymentId: string;

beforeAll(async () => {
  await connectToDB();
  await Payment.deleteMany({});
  await User.deleteMany({});
  await Booking.deleteMany({});
  await Vehicle.deleteMany({});

  // Register a customer and log in
  const customerRes = await request(registerHandler).post('/api/auth/register').send({
    name: 'Customer',
    email: 'customer@example.com',
    password: 'password123',
  });
  customerRes;
  const loginRes = await request(loginHandler).post('/api/auth/login').send({
    email: 'customer@example.com',
    password: 'password123',
  });
  customerToken = loginRes.body.token;

  // Add a vehicle and create a booking
  const vehicleRes = await request(addvehicleHandler)
    .post('/api/vehicles/add')
    .send({
      make: 'Toyota',
      model: 'Corolla',
      year: 2021,
      pricePerDay: 100,
    });
  const vehicleId = vehicleRes.body.vehicle._id;

  const bookingRes = await request(addbookingHandler)
    .post('/api/bookings/add')
    .set('Authorization', `Bearer ${customerToken}`)
    .send({
      vehicleId: vehicleId,
      startDate: '2024-10-15',
      endDate: '2024-10-18',
    });
  bookingId = bookingRes.body.booking._id;
});

describe('Payment API (Paystack)', () => {
  it('should initiate a payment', async () => {
    const res = await request(app)
      .post('/api/payments/create')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ bookingId });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('clientSecret');
    paymentId = res.body.paymentId;
  });

  it('should verify the payment', async () => {
    const res = await request(app)
      .post('/api/payments/verify')
      .send({
        reference: 'test_reference',
        paymentId,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Payment verified successfully');
  });
});
