import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create companies
  const company1 = await prisma.company.create({
    data: { name: 'TechCorp', industry: 'Technology', phone: '+1-555-1111' }
  });
  console.log('✓ Created company:', company1.name);

  const company2 = await prisma.company.create({
    data: { name: 'Finance Inc', industry: 'Finance', phone: '+1-555-2222' }
  });
  console.log('✓ Created company:', company2.name);

  // Get or create admin user
  const admin = await prisma.user.findFirst({ where: { email: 'admin@ashkancrm.com' } });
  if (!admin) {
    throw new Error('Admin user not found! Please seed admin first.');
  }

  // Create contacts
  const contact1 = await prisma.contact.create({
    data: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@techcorp.com',
      companyId: company1.id,
      ownerId: admin.id
    }
  });
  console.log('✓ Created contact:', contact1.firstName);

  const contact2 = await prisma.contact.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@finance.com',
      companyId: company2.id,
      ownerId: admin.id
    }
  });
  console.log('✓ Created contact:', contact2.firstName);

  // Create pipeline
  const pipeline = await prisma.pipeline.create({
    data: {
      name: 'Sales Pipeline',
      stages: {
        create: [
          { name: 'Lead', order: 1 },
          { name: 'Qualified', order: 2 },
          { name: 'Won', order: 3, isWon: true }
        ]
      }
    },
    include: { stages: true }
  });
  console.log('✓ Created pipeline with', pipeline.stages.length, 'stages');

  // Create deals
  const stage = pipeline.stages[0];
  const deal1 = await prisma.deal.create({
    data: {
      title: 'TechCorp Deal',
      value: 100000,
      stageId: stage.id,
      contactId: contact1.id,
      ownerId: admin.id
    }
  });
  console.log('✓ Created deal:', deal1.title);

  const deal2 = await prisma.deal.create({
    data: {
      title: 'Finance Deal',
      value: 150000,
      stageId: stage.id,
      contactId: contact2.id,
      ownerId: admin.id
    }
  });
  console.log('✓ Created deal:', deal2.title);

  console.log('\n✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
