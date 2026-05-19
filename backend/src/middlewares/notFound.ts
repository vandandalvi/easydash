import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
}
