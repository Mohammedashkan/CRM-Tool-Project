import { prisma } from '../utils/prismaClient';

export class CompanyService {
  static async list(query: any) {
    return prisma.company.findMany({ where: { deletedAt: null } });
  }

  static async get(id: string) {
    const company = await prisma.company.findFirst({ where: { id, deletedAt: null } });
    if (!company) {
      const error = new Error('Company not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return company;
  }

  static async create(payload: any) {
    return prisma.company.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.company.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.company.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
