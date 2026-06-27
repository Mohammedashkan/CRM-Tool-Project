import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal
} from '../controllers/deals.controller';

const router = Router();
router.use(authenticate);
router.get('/', listDeals);
router.get('/:id', getDeal);
router.post('/', createDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
