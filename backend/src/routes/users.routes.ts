import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller';

const router = Router();
router.use(authenticate);
router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
