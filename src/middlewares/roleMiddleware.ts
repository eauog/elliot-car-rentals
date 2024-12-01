import { NextResponse } from 'next/server';

// Role-based authorization middleware
export function roleMiddleware(user, roles: string[]) {
  // Check if the user's role is in the allowed roles
  if (!roles.includes(user.role)) {
    // Return 403 Forbidden response if the user is not authorized
    return NextResponse.json(
      { message: 'You do not have permission to perform this action' },
      { status: 403 }
    );
  }

  // If the user has the correct role, return null (indicating no error)
  return null;
}
