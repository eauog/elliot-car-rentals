import request from 'supertest';
// import app from '@/app';
import registerHandler from '@/app/api/auth/register/route';
import loginHandler from '@/app/api/auth/login/route';
import addvehicleHandler from '@/app/api/vehicles/add/route';
import addbookingHandler from '@/app/api/bookings/add/route';
import minebookingHandler from '@/app/api/bookings/mine/route';
import cancelbookingHandler from '@/app/api/bookings/cancel';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';
import Vehicle from '@/models/Vehicle';
import User from '@/models/User';

let customerToken: string;
let vehicleId: string;
let bookingId: string;

beforeAll(async () => {
  await connectToDB();
  await Booking.deleteMany({});
  await Vehicle.deleteMany({});
  await User.deleteMany({});

  // Register a customer
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

  // Add a vehicle
  const vehicleRes = await request(addvehicleHandler)
    .post('/api/vehicles/add')
    .send({
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      pricePerDay: 50,
    });
  vehicleId = vehicleRes.body.vehicle._id;
});

describe('Booking API', () => {
  it('should create a booking', async () => {
    const res = await request(addbookingHandler)
      .post('/api/bookings/add')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        vehicleId: vehicleId,
        startDate: '2024-10-12',
        endDate: '2024-10-15',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.booking).toHaveProperty('totalPrice');
    bookingId = res.body.booking._id;
  });

  it('should fetch customer bookings', async () => {
    const res = await request(minebookingHandler)
      .get('/api/bookings/mine')
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should cancel a booking', async () => {
    const res = await request(cancelbookingHandler)
      .put(`/api/bookings/${bookingId}/cancel`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Booking cancelled successfully');
  });
});


// Tests included:
// Customer creates a booking.
// Fetch customer bookings.
// Cancel a booking.