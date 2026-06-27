import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function authorize(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized', data: null });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden', data: null });
    }

    next();
  };
}
