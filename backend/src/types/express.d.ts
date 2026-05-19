import type { UserDocument } from '../models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<UserDocument, '_id' | 'email' | 'role' | 'name'>;
    }
  }
}

export {};
