import { Request, Response, NextFunction } from 'express';
import { InvoiceService } from '../services/invoices.service';

export async function listInvoices(req: Request, res: Response, next: NextFunction) {
  try {
    const invoices = await InvoiceService.list();
    res.json({ success: true, message: 'Invoices retrieved', data: invoices });
  } catch (error) {
    next(error);
  }
}

export async function getInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await InvoiceService.get(req.params.id);
    res.json({ success: true, message: 'Invoice retrieved', data: invoice });
  } catch (error) {
    next(error);
  }
}

export async function createInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await InvoiceService.create(req.body);
    res.status(201).json({ success: true, message: 'Invoice created', data: invoice });
  } catch (error) {
    next(error);
  }
}

export async function updateInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await InvoiceService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Invoice updated', data: invoice });
  } catch (error) {
    next(error);
  }
}

export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    await InvoiceService.remove(req.params.id);
    res.json({ success: true, message: 'Invoice deleted', data: null });
  } catch (error) {
    next(error);
  }
}
