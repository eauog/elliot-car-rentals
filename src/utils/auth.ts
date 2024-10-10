import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const signToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
