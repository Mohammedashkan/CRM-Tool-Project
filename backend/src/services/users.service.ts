import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prismaClient';

export class UserService {
  static async list() {
    return prisma.user.findMany({ where: { deletedAt: null } });
  }

  static async get(id: string) {
    const user = await prisma.user.findFirst({ where: { id, deletedAt: null } });
    if (!user) {
      const error = new Error('User not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return user;
  }

  static async create(payload: any) {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    return prisma.user.create({ data: { ...payload, password: hashedPassword } });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 12);
    }
    return prisma.user.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
