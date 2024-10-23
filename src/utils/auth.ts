import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
interface DecodedToken {
  id: string;
  role: string;
}
export const signToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Destructure to extract `id` and `email`
    const { id, role } = decoded;
    return { id, role };
  } catch (error) {
    return null;
  }
};
