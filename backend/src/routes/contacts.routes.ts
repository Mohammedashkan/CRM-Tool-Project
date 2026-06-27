import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateContactCreate, validateContactUpdate } from '../validators/contacts.validator';
import {
  createContact,
  deleteContact,
  getContact,
  listContacts,
  updateContact
} from '../controllers/contacts.controller';

const router = Router();

router.use(authenticate);
router.get('/', listContacts);
router.get('/:id', getContact);
router.post('/', validateContactCreate, createContact);
router.put('/:id', validateContactUpdate, updateContact);
router.delete('/:id', deleteContact);

export default router;
