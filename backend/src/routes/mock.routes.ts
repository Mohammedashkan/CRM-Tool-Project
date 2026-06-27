import { Router } from 'express';

const router = Router();

const sampleContacts = [
  { id: 'c1', firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phone: '555-0101', company: { id: 'co1', name: 'Acme Corp' }, owner: { id: 'u1', name: 'Agent One' }, deletedAt: null },
  { id: 'c2', firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com', phone: '555-0102', company: { id: 'co2', name: 'Beta LLC' }, owner: { id: 'u2', name: 'Agent Two' }, deletedAt: null }
];

const sampleCompanies = [
  { id: 'co1', name: 'Acme Corp', industry: 'Manufacturing', website: 'https://acme.example' },
  { id: 'co2', name: 'Beta LLC', industry: 'Software', website: 'https://beta.example' }
];

const sampleDeals = [
  { id: 'd1', name: 'Deal A', amount: 12000, stage: { name: 'Qualification' }, contact: { name: 'Alice Smith' }, owner: { name: 'Agent One' }, deletedAt: null },
  { id: 'd2', name: 'Deal B', amount: 4500, stage: { name: 'Proposal' }, contact: { name: 'Bob Jones' }, owner: { name: 'Agent Two' }, deletedAt: null }
];

const sampleTickets = [
  { id: 't1', title: 'Login issue', priority: 'HIGH', status: 'OPEN', company: { name: 'Acme Corp' }, contact: { name: 'Alice Smith' }, owner: { name: 'Agent One' } },
  { id: 't2', title: 'Billing question', priority: 'MEDIUM', status: 'PENDING', company: { name: 'Beta LLC' }, contact: { name: 'Bob Jones' }, owner: { name: 'Agent Two' } }
];

const sampleContracts = [
  { id: 'ct1', reference: 'CTR-001', title: 'Support Agreement', company: { name: 'Acme Corp' }, slaPolicy: { name: 'Standard' }, startDate: '2024-01-01', endDate: '2025-01-01', status: 'ACTIVE' }
];

router.get('/contacts', (req, res) => res.json({ success: true, message: 'OK', data: sampleContacts }));
router.get('/companies', (req, res) => res.json({ success: true, message: 'OK', data: sampleCompanies }));
router.get('/deals', (req, res) => res.json({ success: true, message: 'OK', data: sampleDeals }));
router.get('/tickets', (req, res) => res.json({ success: true, message: 'OK', data: sampleTickets }));
router.get('/contracts', (req, res) => res.json({ success: true, message: 'OK', data: sampleContracts }));

// Basic health route
router.get('/health', (req, res) => res.json({ success: true, message: 'Mock API OK', data: { uptime: process.uptime() } }));

export default router;
