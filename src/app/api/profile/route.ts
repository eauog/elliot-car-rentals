import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { authMiddleware } from "@/middlewares/authMiddleware";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  try {
    await connectToDB();

    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; // User not authenticated
    }

    const user = result; // Authenticated user
    const { name, email, password } = await request.json();

    const existingUser = await User.findById(user.id);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update fields
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    return NextResponse.json(
      { success: true, user: existingUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDB();

    const result = await authMiddleware(request);
    if (result instanceof NextResponse) {
      return result; // User not authenticated
    }

    const user = result; // Authenticated user
    const existingUser = await User.findById(user.id);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete user
    await existingUser.deleteOne();

    return NextResponse.json(
      { success: true, message: "Account deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
