import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';

export async function DELETE({ params }: { params: { id: string } }) {
  await connectToDB();
  const { id } = params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const { id } = params;
  const { name, email, role } = await request.json();

  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();
  return NextResponse.json(user, { status: 200 });
}
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import User from '@/models/User';

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
