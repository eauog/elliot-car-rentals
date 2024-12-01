// import { NextResponse } from "next/server";
// import { connectToDB } from "@/utils/db";
// import Booking from "@/models/Booking";

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDB();
//   const { id } = params;
//   const { status } = await request.json();

//   // Validate status
//   if (!["pending", "confirmed", "cancelled"].includes(status)) {
//     return NextResponse.json({ message: "Invalid status" }, { status: 400 });
//   }

//   const booking = await Booking.findById(id);
//   if (!booking) {
//     return NextResponse.json({ message: "Booking not found" }, { status: 404 });
//   }

//   booking.status = status;
//   await booking.save();

//   return NextResponse.json(booking, { status: 200 });
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDB();
//   const { id } = params;

//   const booking = await Booking.findByIdAndDelete(id);
//   if (!booking) {
//     return NextResponse.json({ message: "Booking not found" }, { status: 404 });
//   }

//   return NextResponse.json(
//     { message: "Booking deleted successfully" },
//     { status: 200 }
//   );
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Booking from '@/models/Booking';

export async function PUT(request: Request) {
  try {
    await connectToDB();
    
    // Extract id from the URL using request.url
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming dynamic route [id]

    if (!id) {
      return NextResponse.json({ message: 'Booking ID is required.' }, { status: 400 });
    }

    const { status } = await request.json();

    // Validate status
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ message: 'An error occurred while updating the booking.', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDB();

    // Extract id from the URL using request.url
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Assuming dynamic route [id]

    if (!id) {
      return NextResponse.json({ message: 'Booking ID is required.' }, { status: 400 });
    }

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the booking.', error: error.message }, { status: 500 });
  }
}
