import request from 'supertest';
// import app from '@/app';  
import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import registerHandler from '@/app/api/auth/register';
import loginHandler from '@/app/api/auth/login';


beforeAll(async () => {
  await connectToDB();
  await User.deleteMany({});  
});

describe('Authentication API', () => {
  let token: string;

  it('should register a new user', async () => {
    const res = await request(registerHandler).post('/api/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should not register an existing user', async () => {
    const res = await request(registerHandler).post('/api/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Email already exists');
  });

  it('should log in the registered user', async () => {
    const res = await request(loginHandler).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; 
  });

  it('should access protected route with valid token', async () => {
    const res = await request(app)
      .get('/api/protected-route')  // Replace with your protected route
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('You have access');
  });

  it('should deny access with invalid token', async () => {
    const res = await request(app)
      .get('/api/protected-route')
      .set('Authorization', `Bearer invalidtoken`);

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid token');
  });
});


// Tests included:
// Register a new user.
// Prevent duplicate registration.
// Log in the user and return a JWT token.
// Access a protected route with the token.
// Deny access to protected route with an invalid token.
