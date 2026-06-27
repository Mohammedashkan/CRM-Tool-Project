import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/knowledge-base.controller';

const router = Router();
router.use(authenticate);
router.get('/', listArticles);
router.get('/:id', getArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
