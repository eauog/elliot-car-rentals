import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';

// DELETE request handler for deleting a vehicle
export async function DELETE(request: Request) {
  try {
    await connectToDB();

    // Authenticate and authorize the user
    const user = await authMiddleware(request);
    if (user instanceof NextResponse) return user;  // Return error if unauthorized

    const roleCheck = roleMiddleware(user, ['admin', 'manager']);
    if (roleCheck instanceof NextResponse) return roleCheck;  // Return error if user role is invalid

    // Extract vehicle ID from the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
    }

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }

    // Remove the vehicle
    await vehicle.deleteOne();

    // Return a success response
    return NextResponse.json({ success: true, message: 'Vehicle deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting vehicle:', error);

    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}
