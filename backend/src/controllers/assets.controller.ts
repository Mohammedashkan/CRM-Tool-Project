import { Request, Response, NextFunction } from 'express';
import { AssetService } from '../services/assets.service';

export async function listAssets(req: Request, res: Response, next: NextFunction) {
  try {
    const assets = await AssetService.list();
    res.json({ success: true, message: 'Assets retrieved', data: assets });
  } catch (error) {
    next(error);
  }
}

export async function getAsset(req: Request, res: Response, next: NextFunction) {
  try {
    const asset = await AssetService.get(req.params.id);
    res.json({ success: true, message: 'Asset retrieved', data: asset });
  } catch (error) {
    next(error);
  }
}

export async function createAsset(req: Request, res: Response, next: NextFunction) {
  try {
    const asset = await AssetService.create(req.body);
    res.status(201).json({ success: true, message: 'Asset created', data: asset });
  } catch (error) {
    next(error);
  }
}

export async function updateAsset(req: Request, res: Response, next: NextFunction) {
  try {
    const asset = await AssetService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Asset updated', data: asset });
  } catch (error) {
    next(error);
  }
}

export async function deleteAsset(req: Request, res: Response, next: NextFunction) {
  try {
    await AssetService.remove(req.params.id);
    res.json({ success: true, message: 'Asset deleted', data: null });
  } catch (error) {
    next(error);
  }
}
