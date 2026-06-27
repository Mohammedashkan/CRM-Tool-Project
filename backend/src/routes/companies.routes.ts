import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateCompanyCreate, validateCompanyUpdate } from '../validators/companies.validator';
import {
  createCompany,
  deleteCompany,
  getCompany,
  listCompanies,
  updateCompany
} from '../controllers/companies.controller';

const router = Router();

router.use(authenticate);
router.get('/', listCompanies);
router.get('/:id', getCompany);
router.post('/', validateCompanyCreate, createCompany);
router.put('/:id', validateCompanyUpdate, updateCompany);
router.delete('/:id', deleteCompany);

export default router;
