import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUser, register, login, logout, refreshTokens,
} from '../controllers/auth';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  body('name').notEmpty().isString(),
  body('email').notEmpty().isString(),
  body('password').notEmpty().isString(),
  register,
);
router.post(
  '/login',
  body('email').notEmpty().isString(),
  body('password').notEmpty().isString(),
  login,
);
router.patch('/refresh-tokens', refreshTokens);

router.use(authMiddleware);
router.get('/user', getUser);
router.post('/logout', logout);

export default router;
