import { prisma } from '../utils/prismaClient';

export class TicketService {
  static async list() {
    return prisma.ticket.findMany({ where: { deletedAt: null }, include: { company: true, contact: true, owner: true, slaPolicy: true } });
  }

  static async get(id: string) {
    const ticket = await prisma.ticket.findFirst({ where: { id, deletedAt: null }, include: { company: true, contact: true, owner: true, slaPolicy: true } });
    if (!ticket) {
      const error = new Error('Ticket not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return ticket;
  }

  static async create(payload: any) {
    return prisma.ticket.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.ticket.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.ticket.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
