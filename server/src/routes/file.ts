import { Router } from 'express';
import { query } from 'express-validator';
import { downloadFile, deleteFile } from '../controllers/file';
import authMiddleware from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get(
  '/',
  query('filename').notEmpty().isString(),
  downloadFile,
);
router.post(
  '/',
  query('filename').notEmpty().isString(),
  deleteFile,
);

export default router;
