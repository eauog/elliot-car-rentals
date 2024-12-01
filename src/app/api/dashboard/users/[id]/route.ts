// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import User from '@/models/User';

// export async function DELETE({ params }: { params: { id: string } }) {
//   await connectToDB();
//   const { id } = params;

//   const user = await User.findByIdAndDelete(id);
//   if (!user) {
//     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   }

//   return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
// }


// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   await connectToDB();
//   const { id } = params;
//   const { name, email, role } = await request.json();

//   const user = await User.findById(id);
//   if (!user) {
//     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   }

//   user.name = name || user.name;
//   user.email = email || user.email;
//   user.role = role || user.role;

//   await user.save();
//   return NextResponse.json(user, { status: 200 });
// }
// // import { NextResponse } from 'next/server';
// // import { connectToDB } from '@/utils/db';
// // import User from '@/models/User';

// // export async function DELETE(request: Request, { params }: { params: { id: string } }) {
// //   await connectToDB();
// //   const { id } = params;

// //   const user = await User.findByIdAndDelete(id);
// //   if (!user) {
// //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
// //   }

// //   return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
// // }


// // export async function PUT(request: Request, { params }: { params: { id: string } }) {
// //   await connectToDB();
// //   const { id } = params;
// //   const { name, email, role } = await request.json();

// //   const user = await User.findById(id);
// //   if (!user) {
// //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
// //   }

// //   user.name = name || user.name;
// //   user.email = email || user.email;
// //   user.role = role || user.role;

// //   await user.save();
// //   return NextResponse.json(user, { status: 200 });
// // }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';

export async function DELETE(request: Request) {
  try {
    await connectToDB();
    
    // Extract the ID from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Extract the dynamic ID from the URL

    if (!id) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'An error occurred while deleting the user.', error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDB();
    
    // Extract the ID from the URL path
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Extract the dynamic ID from the URL

    if (!id) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    const { name, email, role } = await request.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user fields with provided values or keep the existing ones
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'An error occurred while updating the user.', error: error.message }, { status: 500 });
  }
}
