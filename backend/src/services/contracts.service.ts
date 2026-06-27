import { prisma } from '../utils/prismaClient';

export class ContractService {
  static async list() {
    return prisma.contract.findMany({ where: { deletedAt: null }, include: { company: true, slaPolicy: true } });
  }

  static async get(id: string) {
    const contract = await prisma.contract.findFirst({ where: { id, deletedAt: null }, include: { company: true, slaPolicy: true } });
    if (!contract) {
      const error = new Error('Contract not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return contract;
  }

  static async create(payload: any) {
    return prisma.contract.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.contract.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.contract.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
