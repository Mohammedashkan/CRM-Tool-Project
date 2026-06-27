import { Router } from 'express';
import authRoutes from './auth.routes';
import contactsRoutes from './contacts.routes';
import companiesRoutes from './companies.routes';
import usersRoutes from './users.routes';
import dealsRoutes from './deals.routes';
import ticketsRoutes from './tickets.routes';
import invoicesRoutes from './invoices.routes';
import contractsRoutes from './contracts.routes';
import assetsRoutes from './assets.routes';
import knowledgeBaseRoutes from './knowledge-base.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactsRoutes);
router.use('/companies', companiesRoutes);
router.use('/users', usersRoutes);
router.use('/deals', dealsRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/contracts', contractsRoutes);
router.use('/assets', assetsRoutes);
router.use('/knowledge-base', knowledgeBaseRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK', data: { uptime: process.uptime() } });
});

export default router;
