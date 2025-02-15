import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { iUser } from '../../interface/entity-pg-user';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: iUser): string => {
  const payload = {
    data: user
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
