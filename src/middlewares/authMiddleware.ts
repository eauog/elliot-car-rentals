import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/auth';

export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decoded;
  next();
}
