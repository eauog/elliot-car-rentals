// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET!;

// const protectedRoutes = ['/dashboard', '/bookings', '/vehicles'];

// // Middleware function
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const token = req.cookies.get('token')?.value; 

//     if (!token) {
//       // If no token, redirect to login
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     try {
//       // Verify the token using JWT
//       jwt.verify(token, JWT_SECRET);
//       // Token is valid, allow the user to continue
//       return NextResponse.next();
//     } catch (error) {
//       // Invalid token, redirect to login
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   // Allow request to proceed if it's not a protected route
//   return NextResponse.next();
// }

// // Specify the paths the middleware should run on
// export const config = {
//   matcher: ['/dashboard/:path*', '/bookings/:path*', '/vehicles/:path*'],
// };
