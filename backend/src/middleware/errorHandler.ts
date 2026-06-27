import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
}
