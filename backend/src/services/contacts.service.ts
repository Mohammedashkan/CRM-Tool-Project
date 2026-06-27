import { prisma } from '../utils/prismaClient';

export class ContactService {
  static async list(query: any) {
    const where = { deletedAt: null };
    return prisma.contact.findMany({ where, include: { company: true, owner: true } });
  }

  static async get(id: string) {
    const contact = await prisma.contact.findFirst({
      where: { id, deletedAt: null },
      include: { company: true, owner: true }
    });
    if (!contact) {
      const error = new Error('Contact not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return contact;
  }

  static async create(payload: any) {
    return prisma.contact.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.contact.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.contact.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
