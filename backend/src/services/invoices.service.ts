import { prisma } from '../utils/prismaClient';

export class InvoiceService {
  static async list() {
    return prisma.invoice.findMany({ where: { deletedAt: null }, include: { company: true, contact: true, items: true, payments: true } });
  }

  static async get(id: string) {
    const invoice = await prisma.invoice.findFirst({ where: { id, deletedAt: null }, include: { company: true, contact: true, items: true, payments: true } });
    if (!invoice) {
      const error = new Error('Invoice not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return invoice;
  }

  static async create(payload: any) {
    return prisma.invoice.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.invoice.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.invoice.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
