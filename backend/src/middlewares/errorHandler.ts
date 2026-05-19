import type { NextFunction, Request, Response } from 'express';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const message = error instanceof Error ? error.message : 'Internal server error';
  const statusCode = message.startsWith('Route not found:') ? 404 : 500;

  res.status(statusCode).json({
    success: false,
    message,
  });
}
