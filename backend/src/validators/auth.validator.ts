import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

function validator(schema: typeof registerSchema | typeof loginSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const issues = (error as any).issues || [];
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: issues.map((issue: any) => ({ path: issue.path.join('.'), message: issue.message }))
      });
    }
  };
}

export const validateRegister = validator(registerSchema);
export const validateLogin = validator(loginSchema);
