import request from 'supertest';
import '@/app';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import User from '@/models/User';

let adminToken: string;

beforeAll(async () => {
  await connectToDB();
  await Vehicle.deleteMany({});
  await User.deleteMany({});

  const adminRes = await request().post('/api/auth/register').send({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',  
  });
  const loginRes = await request().post('/api/auth/login').send({
    email: 'admin@example.com',
    password: 'adminpassword',
  });
  adminToken = loginRes.body.token;
});

describe('Vehicle Management API', () => {
  let vehicleId: string;

  it('should create a new vehicle', async () => {
    const res = await request()
      .post('/api/vehicles/add')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        pricePerDay: 100,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.vehicle).toHaveProperty('make', 'Toyota');
    vehicleId = res.body.vehicle._id;
  });

  it('should fetch all available vehicles', async () => {
    const res = await request().get('/api/vehicles');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a vehicle', async () => {
    const res = await request()
      .put(`/api/vehicles/${vehicleId}/update`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        model: 'Camry',  // Update the model
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.vehicle).toHaveProperty('model', 'Camry');
  });

  it('should delete a vehicle', async () => {
    const res = await request()
      .delete(`/api/vehicles/${vehicleId}/delete`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Vehicle deleted');
  });
});


// Tests included:
// Admin creates a new vehicle.
// Fetch available vehicles.
// Admin updates a vehicle.
// Admin deletes a vehicle.