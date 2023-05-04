import { Router } from 'express';
import { getUser, register, login, logout, refreshTokens } from '../controllers/auth';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/refresh-tokens', refreshTokens);

router.use(authMiddleware);
router.get('/user', getUser);
router.post('/logout', logout);

export default router;