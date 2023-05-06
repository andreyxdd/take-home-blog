import { Router } from 'express';
import { query, body, param } from 'express-validator';
import { Prisma } from '@prisma/client';
import paginationMiddleware from '../middleware/pagination';
// import authMiddleware from '../middleware/auth';
import uploads from '../middleware/uploads';
import {
  getPosts, addPost, patchPost, deletePost,
} from '../controllers/blog';

const router = Router();

// router.use(authMiddleware);
router.post(
  '/posts',
  uploads.array('files'),
  body('title').notEmpty().isString(),
  body('body').notEmpty().isString(),
  addPost,
);

router.patch(
  '/post/:id',
  uploads.array('files'),
  param('id').notEmpty().isString(),
  body('title').notEmpty().isString(),
  body('body').notEmpty().isString(),
  patchPost,
);

router.delete(
  '/post/:id',
  param('id').notEmpty().isString(),
  deletePost,
);

const postSelectFields: Prisma.PostSelect = {
  id: true,
  title: true,
  body: true,
  files: {
    select: {
      id: true,
      originalname: true,
    },
  },
  createdAt: true,
  updatedAt: true,
  author: {
    select: {
      id: true,
      name: true,
    },
  },
};
const postOrderBy: {updatedAt: 'desc' | 'asc'} = {
  updatedAt: 'desc',
};
router.get(
  '/posts',
  query('page').notEmpty().isInt(),
  query('limit').notEmpty().isInt(),
  paginationMiddleware(
    'post',
    postSelectFields,
    postOrderBy,
  ),
  getPosts,
);

export default router;
