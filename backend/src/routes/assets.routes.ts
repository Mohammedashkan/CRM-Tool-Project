import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset
} from '../controllers/assets.controller';

const router = Router();
router.use(authenticate);
router.get('/', listAssets);
router.get('/:id', getAsset);
router.post('/', createAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;
