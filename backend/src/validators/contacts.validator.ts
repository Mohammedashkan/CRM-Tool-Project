import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const contactCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  companyId: z.string().uuid(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  role: z.string().optional()
});

const contactUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  companyId: z.string().uuid().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  role: z.string().optional()
});

function validate(schema: any) {
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

export const validateContactCreate = validate(contactCreateSchema);
export const validateContactUpdate = validate(contactUpdateSchema);
