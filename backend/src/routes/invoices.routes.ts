import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
} from '../controllers/invoices.controller';

const router = Router();
router.use(authenticate);
router.get('/', listInvoices);
router.get('/:id', getInvoice);
router.post('/', createInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

export default router;
