import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export function initPrisma() {
  prisma.$connect().catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to Prisma database:', error);
    process.exit(1);
  });
}
