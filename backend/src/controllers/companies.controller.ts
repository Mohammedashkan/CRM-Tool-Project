import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/companies.service';

export async function listCompanies(req: Request, res: Response, next: NextFunction) {
  try {
    const companies = await CompanyService.list(req.query);
    res.json({ success: true, message: 'Companies retrieved', data: companies });
  } catch (error) {
    next(error);
  }
}

export async function getCompany(req: Request, res: Response, next: NextFunction) {
  try {
    const company = await CompanyService.get(req.params.id);
    res.json({ success: true, message: 'Company retrieved', data: company });
  } catch (error) {
    next(error);
  }
}

export async function createCompany(req: Request, res: Response, next: NextFunction) {
  try {
    const company = await CompanyService.create(req.body);
    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error) {
    next(error);
  }
}

export async function updateCompany(req: Request, res: Response, next: NextFunction) {
  try {
    const company = await CompanyService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Company updated', data: company });
  } catch (error) {
    next(error);
  }
}

export async function deleteCompany(req: Request, res: Response, next: NextFunction) {
  try {
    await CompanyService.remove(req.params.id);
    res.json({ success: true, message: 'Company deleted', data: null });
  } catch (error) {
    next(error);
  }
}
