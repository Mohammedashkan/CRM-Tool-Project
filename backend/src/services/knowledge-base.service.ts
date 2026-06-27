import { prisma } from '../utils/prismaClient';

export class KnowledgeBaseService {
  static async list() {
    return prisma.knowledgeBaseArticle.findMany({ where: { }, include: { category: true, createdBy: true } });
  }

  static async get(id: string) {
    const article = await prisma.knowledgeBaseArticle.findUnique({ where: { id }, include: { category: true, createdBy: true } });
    if (!article) {
      const error = new Error('Article not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return article;
  }

  static async create(payload: any) {
    return prisma.knowledgeBaseArticle.create({ data: payload });
  }

  static async update(id: string, payload: any) {
    await this.get(id);
    return prisma.knowledgeBaseArticle.update({ where: { id }, data: payload });
  }

  static async remove(id: string) {
    await this.get(id);
    return prisma.knowledgeBaseArticle.delete({ where: { id } });
  }
}
