import { NextApiRequest, NextApiResponse } from 'next';

export function roleMiddleware(roles: string[]) {
  return (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }

    next();
  };
}
