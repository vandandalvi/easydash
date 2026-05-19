import type { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    const user = await UserModel.findById(payload.userId).select('_id name email role');
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    req.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(...roles: Array<'admin' | 'sales'>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
}
