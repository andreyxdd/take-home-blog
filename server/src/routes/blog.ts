import { Router } from 'express';
import { query, body } from 'express-validator';
import paginationMiddleware from '../middleware/pagination';
import authMiddleware from '../middleware/auth';
import uploads from '../middleware/uploads';
import { getPosts, addPost, patchPost, deletePost } from '../controllers/blog';

const router = Router();

router.use(authMiddleware);
router.post(
  '/posts',
  uploads.array("files"),
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
  addPost
);

router.patch(
  '/post',
  query('id').notEmpty().isInt(),
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
  patchPost
);

router.delete(
  '/post',
  query('id').notEmpty().isInt(),
  deletePost
);

const postSelectFields = {
  id: true,
  title: true,
  content: true,
  updatedAt: true,
  author: {
    select: {
      name: true,
      id: true,
    }
  },
};
const postOrderBy = {
  updatedAt: 'desc'
}
router.get(
  '/posts',
  query('page').notEmpty().isInt(),
  query('limit').notEmpty().isInt(),
  paginationMiddleware(
    "post",
    postSelectFields,
    postOrderBy,
  ),
  getPosts
);

export default router;