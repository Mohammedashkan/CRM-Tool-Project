import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listContracts,
  getContract,
  createContract,
  updateContract,
  deleteContract
} from '../controllers/contracts.controller';

const router = Router();
router.use(authenticate);
router.get('/', listContracts);
router.get('/:id', getContract);
router.post('/', createContract);
router.put('/:id', updateContract);
router.delete('/:id', deleteContract);

export default router;
