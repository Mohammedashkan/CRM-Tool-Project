import { Request, Response, NextFunction } from 'express';
import { DealService } from '../services/deals.service';

export async function listDeals(req: Request, res: Response, next: NextFunction) {
  try {
    const deals = await DealService.list();
    res.json({ success: true, message: 'Deals retrieved', data: deals });
  } catch (error) {
    next(error);
  }
}

export async function getDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const deal = await DealService.get(req.params.id);
    res.json({ success: true, message: 'Deal retrieved', data: deal });
  } catch (error) {
    next(error);
  }
}

export async function createDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const deal = await DealService.create(req.body);
    res.status(201).json({ success: true, message: 'Deal created', data: deal });
  } catch (error) {
    next(error);
  }
}

export async function updateDeal(req: Request, res: Response, next: NextFunction) {
  try {
    const deal = await DealService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Deal updated', data: deal });
  } catch (error) {
    next(error);
  }
}

export async function deleteDeal(req: Request, res: Response, next: NextFunction) {
  try {
    await DealService.remove(req.params.id);
    res.json({ success: true, message: 'Deal deleted', data: null });
  } catch (error) {
    next(error);
  }
}
