import { Request, Response, NextFunction } from 'express';
import { ContractService } from '../services/contracts.service';

export async function listContracts(req: Request, res: Response, next: NextFunction) {
  try {
    const contracts = await ContractService.list();
    res.json({ success: true, message: 'Contracts retrieved', data: contracts });
  } catch (error) {
    next(error);
  }
}

export async function getContract(req: Request, res: Response, next: NextFunction) {
  try {
    const contract = await ContractService.get(req.params.id);
    res.json({ success: true, message: 'Contract retrieved', data: contract });
  } catch (error) {
    next(error);
  }
}

export async function createContract(req: Request, res: Response, next: NextFunction) {
  try {
    const contract = await ContractService.create(req.body);
    res.status(201).json({ success: true, message: 'Contract created', data: contract });
  } catch (error) {
    next(error);
  }
}

export async function updateContract(req: Request, res: Response, next: NextFunction) {
  try {
    const contract = await ContractService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Contract updated', data: contract });
  } catch (error) {
    next(error);
  }
}

export async function deleteContract(req: Request, res: Response, next: NextFunction) {
  try {
    await ContractService.remove(req.params.id);
    res.json({ success: true, message: 'Contract deleted', data: null });
  } catch (error) {
    next(error);
  }
}
