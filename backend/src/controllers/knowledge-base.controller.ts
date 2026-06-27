import { Request, Response, NextFunction } from 'express';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

export async function listArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const articles = await KnowledgeBaseService.list();
    res.json({ success: true, message: 'Knowledge base articles retrieved', data: articles });
  } catch (error) {
    next(error);
  }
}

export async function getArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await KnowledgeBaseService.get(req.params.id);
    res.json({ success: true, message: 'Article retrieved', data: article });
  } catch (error) {
    next(error);
  }
}

export async function createArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await KnowledgeBaseService.create(req.body);
    res.status(201).json({ success: true, message: 'Article created', data: article });
  } catch (error) {
    next(error);
  }
}

export async function updateArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await KnowledgeBaseService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Article updated', data: article });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticle(req: Request, res: Response, next: NextFunction) {
  try {
    await KnowledgeBaseService.remove(req.params.id);
    res.json({ success: true, message: 'Article deleted', data: null });
  } catch (error) {
    next(error);
  }
}
