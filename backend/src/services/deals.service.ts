import { prisma } from '../utils/prismaClient';

export class DealService {
  static async list() {
    return prisma.deal.findMany({ where: { deletedAt: null }, include: { stage: true, contact: true, owner: true } });
  }

  static async get(id: string) {
    const deal = await prisma.deal.findFirst({ where: { id, deletedAt: null }, include: { stage: true, contact: true, owner: true } });
    if (!deal) {
      const error = new Error('Deal not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return deal;
  }

  static async create(payload: any) {
    return prisma.deal.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.deal.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.deal.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
