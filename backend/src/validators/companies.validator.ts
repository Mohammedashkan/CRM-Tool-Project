import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const companyCreateSchema = z.object({
  name: z.string().min(1),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  industry: z.string().optional(),
  revenue: z.number().optional()
});

const companyUpdateSchema = companyCreateSchema.partial();

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

export const validateCompanyCreate = validate(companyCreateSchema);
export const validateCompanyUpdate = validate(companyUpdateSchema);
