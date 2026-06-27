import { prisma } from '../utils/prismaClient';

export class AssetService {
  static async list() {
    return prisma.asset.findMany({ where: { deletedAt: null }, include: { assignedTo: true } });
  }

  static async get(id: string) {
    const asset = await prisma.asset.findFirst({ where: { id, deletedAt: null }, include: { assignedTo: true } });
    if (!asset) {
      const error = new Error('Asset not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return asset;
  }

  static async create(payload: any) {
    return prisma.asset.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.asset.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.asset.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
