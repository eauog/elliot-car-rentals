import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export async function authMiddleware(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const { id, role } = decoded ;
    return { id, role };
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token or authentication error' }, { status: 401 });
  }
}
