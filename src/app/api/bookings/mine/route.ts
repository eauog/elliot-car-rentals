import { NextResponse } from "next/server";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { connectToDB } from "@/utils/db";
import Booking from "@/models/Booking";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result;
    }

    const user = result;
    const customerId = user.id;

    const bookings = await Booking.find({ customer: customerId }).populate(
      "vehicle"
    );

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Faild to finding bookings : ${error}` },
      { status: 500 }
    );
  }
}
