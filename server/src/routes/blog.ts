import { Router } from 'express';
import { query } from 'express-validator';
import paginationMiddleware from '../middleware/pagination';
// import authMiddleware from '../middleware/auth';
import { getPosts, addPost } from '../controllers/blog';

const router = Router();

// router.use(authMiddleware);
router.post('/posts', addPost);

router.use(
  query('page').isInt(),
  query('limit').isInt()
)
router.use(paginationMiddleware("post"));
router.get('/posts', getPosts);

export default router;