import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';

// GET request handler for fetching available vehicles
export async function GET() {
  try {
    await connectToDB();

    // Fetch all vehicles that are available
    const vehicles = await Vehicle.find({ availability: true });

    // Send the list of vehicles as JSON
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error('Error fetching vehicles:', error);

    // Handle error safely and send a 500 response
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Generic fallback for unknown errors
    return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
  }
}
