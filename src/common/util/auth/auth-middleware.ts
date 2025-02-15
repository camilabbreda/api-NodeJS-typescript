import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth';
import { UnauthorizedException } from '../../error/unauthorized-exception';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Access denied. No token provided.');
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedException('Invalid token.');
  }
};
