import { PrismaClient, Role, AssetType, InvoiceStatus, ContractStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ashkancrm.com' },
    update: {},
    create: {
      name: 'Admin Ashkan',
      email: 'admin@ashkancrm.com',
      password: passwordHash,
      role: Role.ADMIN
    }
  });

  await prisma.setting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'Ashkan CRM',
      description: 'Application display name'
    }
  });

  // Create or get SLA Policy
  let slaPolicy = await prisma.sLAPolicy.findFirst({
    where: { name: 'Standard Support' }
  });
  
  if (!slaPolicy) {
    slaPolicy = await prisma.sLAPolicy.create({
      data: {
        name: 'Standard Support',
        responseMinutes: 60,
        resolutionMinutes: 240,
        businessHours: true,
        description: 'Standard IT support SLA for response and resolution targets.'
      }
    });
  }

  // Create sample companies
  const techCorp = await prisma.company.create({
    data: {
      name: 'TechCorp Solutions',
      industry: 'Technology',
      website: 'https://techcorp.example.com',
      phone: '+1-555-0101',
      address: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94105',
      revenue: 50000000
    }
  });

  const financeInc = await prisma.company.create({
    data: {
      name: 'Finance Inc',
      industry: 'Financial Services',
      website: 'https://financeinc.example.com',
      phone: '+1-555-0102',
      address: '456 Finance Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      revenue: 100000000
    }
  });

  const retailPlus = await prisma.company.create({
    data: {
      name: 'RetailPlus Group',
      industry: 'Retail',
      website: 'https://retailplus.example.com',
      phone: '+1-555-0103',
      address: '789 Commerce Blvd',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601',
      revenue: 75000000
    }
  });

  // Create sample contacts
  const contact1 = await prisma.contact.create({
    data: {
      companyId: techCorp.id,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techcorp.example.com',
      phone: '+1-555-1001',
      jobTitle: 'CTO',
      role: 'Decision Maker',
      ownerId: admin.id
    }
  });

  const contact2 = await prisma.contact.create({
    data: {
      companyId: techCorp.id,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@techcorp.example.com',
      phone: '+1-555-1002',
      jobTitle: 'Project Manager',
      role: 'Project Manager',
      ownerId: admin.id
    }
  });

  const contact3 = await prisma.contact.create({
    data: {
      companyId: financeInc.id,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@financeinc.example.com',
      phone: '+1-555-1003',
      jobTitle: 'VP Sales',
      role: 'Decision Maker',
      ownerId: admin.id
    }
  });

  const contact4 = await prisma.contact.create({
    data: {
      companyId: retailPlus.id,
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@retailplus.example.com',
      phone: '+1-555-1004',
      jobTitle: 'Operations Manager',
      role: 'Operations',
      ownerId: admin.id
    }
  });

  // Create pipeline and stages
  const pipeline = await prisma.pipeline.create({
    data: {
      name: 'Sales Pipeline',
      description: 'Standard sales pipeline for new opportunities',
      stages: {
        create: [
          { name: 'Lead', order: 1, isWon: false, isLost: false },
          { name: 'Qualified', order: 2, isWon: false, isLost: false },
          { name: 'Proposal', order: 3, isWon: false, isLost: false },
          { name: 'Negotiation', order: 4, isWon: false, isLost: false },
          { name: 'Won', order: 5, isWon: true, isLost: false },
          { name: 'Lost', order: 6, isWon: false, isLost: true }
        ]
      }
    },
    include: { stages: true }
  });

  // Create sample deals
  const stage1 = pipeline.stages.find(s => s.name === 'Qualified')!;
  const stage2 = pipeline.stages.find(s => s.name === 'Proposal')!;
  const stage3 = pipeline.stages.find(s => s.name === 'Won')!;

  const deal1 = await prisma.deal.create({
    data: {
      title: 'TechCorp Cloud Migration',
      description: 'Cloud infrastructure migration project',
      value: 250000,
      probability: 75,
      stageId: stage2.id,
      contactId: contact1.id,
      ownerId: admin.id
    }
  });

  const deal2 = await prisma.deal.create({
    data: {
      title: 'Finance Inc Security Audit',
      description: 'Comprehensive security audit and compliance review',
      value: 150000,
      probability: 90,
      stageId: stage3.id,
      contactId: contact3.id,
      ownerId: admin.id
    }
  });

  const deal3 = await prisma.deal.create({
    data: {
      title: 'RetailPlus POS System Upgrade',
      description: 'Point of sale system upgrade and integration',
      value: 180000,
      probability: 60,
      stageId: stage1.id,
      contactId: contact4.id,
      ownerId: admin.id
    }
  });

  // Create sample invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      reference: 'INV-2026-001',
      companyId: techCorp.id,
      contactId: contact1.id,
      issueDate: new Date('2026-04-01'),
      dueDate: new Date('2026-05-01'),
      status: InvoiceStatus.SENT,
      subtotal: 50000,
      taxTotal: 5000,
      discountTotal: 0,
      total: 55000,
      amountPaid: 55000,
      amountDue: 0,
      items: {
        create: [
          {
            description: 'Consulting Services',
            quantity: 100,
            unitPrice: 500,
            discount: 0,
            tax: 5000,
            total: 55000
          }
        ]
      },
      payments: {
        create: [
          {
            amount: 55000,
            method: 'BANK_TRANSFER',
            reference: 'TRANSFER-001',
            receivedAt: new Date('2026-04-15')
          }
        ]
      }
    }
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      reference: 'INV-2026-002',
      companyId: financeInc.id,
      contactId: contact3.id,
      issueDate: new Date('2026-05-01'),
      dueDate: new Date('2026-06-01'),
      status: InvoiceStatus.SENT,
      subtotal: 75000,
      taxTotal: 7500,
      discountTotal: 0,
      total: 82500,
      amountPaid: 0,
      amountDue: 82500,
      items: {
        create: [
          {
            description: 'Security Audit Services',
            quantity: 1,
            unitPrice: 75000,
            discount: 0,
            tax: 7500,
            total: 82500
          }
        ]
      }
    }
  });

  // Create sample contracts
  const contract1 = await prisma.contract.create({
    data: {
      reference: 'CONTRACT-001',
      title: 'Cloud Services Agreement',
      description: 'Annual cloud hosting and support services',
      companyId: techCorp.id,
      slaPolicyId: slaPolicy.id,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      value: 120000,
      status: ContractStatus.ACTIVE
    }
  });

  const contract2 = await prisma.contract.create({
    data: {
      reference: 'CONTRACT-002',
      title: 'Maintenance Support',
      description: 'Software maintenance and support contract',
      companyId: retailPlus.id,
      slaPolicyId: slaPolicy.id,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2027-01-31'),
      value: 50000,
      status: ContractStatus.ACTIVE
    }
  });

  // Create sample assets
  const asset1 = await prisma.asset.create({
    data: {
      name: 'Dell Server - DB01',
      type: AssetType.HARDWARE,
      serialNumber: 'DEL-12345-678',
      manufacturer: 'Dell',
      model: 'PowerEdge R750',
      companyId: techCorp.id,
      assignedAt: new Date('2025-06-01'),
      warrantyEndsAt: new Date('2028-06-01'),
      notes: 'Primary database server'
    }
  });

  const asset2 = await prisma.asset.create({
    data: {
      name: 'Microsoft Office 365',
      type: AssetType.SOFTWARE,
      manufacturer: 'Microsoft',
      model: 'Office 365 Business Premium',
      companyId: financeInc.id,
      assignedAt: new Date('2026-01-01'),
      warrantyEndsAt: new Date('2027-01-01'),
      notes: '100 licenses'
    }
  });

  const asset3 = await prisma.asset.create({
    data: {
      name: 'Adobe Creative Suite License',
      type: AssetType.LICENSE,
      manufacturer: 'Adobe',
      model: 'CC 2026',
      companyId: retailPlus.id,
      assignedAt: new Date('2026-03-15'),
      warrantyEndsAt: new Date('2027-03-15'),
      notes: '10 seats'
    }
  });

  // Create knowledge base category and articles
  const kbCategory = await prisma.knowledgeBaseCategory.create({
    data: {
      name: 'Getting Started',
      description: 'Introduction and setup guides',
      articles: {
        create: [
          {
            title: 'How to Use the CRM Dashboard',
            content: 'The CRM dashboard provides a quick overview of your contacts, deals, and activities. Learn how to navigate and customize your view.',
            isPublic: true,
            createdById: admin.id,
            views: 45,
            helpful: 38
          },
          {
            title: 'Managing Your Contacts',
            content: 'Learn how to add, edit, and organize your contacts in the CRM system. You can assign contacts to specific companies and team members.',
            isPublic: true,
            createdById: admin.id,
            views: 62,
            helpful: 55
          },
          {
            title: 'Creating and Tracking Deals',
            content: 'Deals represent business opportunities. Learn how to create deals, move them through your sales pipeline, and track their progress.',
            isPublic: true,
            createdById: admin.id,
            views: 38,
            helpful: 32
          }
        ]
      }
    }
  });

  console.log('✓ Admin user created');
  console.log('✓ Settings created');
  console.log('✓ SLA Policy created');
  console.log('✓ 3 Companies created with sample data');
  console.log('✓ 4 Contacts created');
  console.log('✓ Sales Pipeline with 6 stages created');
  console.log('✓ 3 Deals created');
  console.log('✓ 2 Invoices created with items and payments');
  console.log('✓ 2 Contracts created');
  console.log('✓ 3 Assets created');
  console.log('✓ Knowledge Base with 3 articles created');
  console.log('\nSeed data completed successfully!');
}

main()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
