import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket
} from '../controllers/tickets.controller';

const router = Router();
router.use(authenticate);
router.get('/', listTickets);
router.get('/:id', getTicket);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
