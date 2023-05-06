import { Router } from 'express';
import { param } from 'express-validator';
import { downloadFile, deleteFile } from '../controllers/files';
import authMiddleware from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get(
  '/:id',
  param('id').notEmpty().isString(),
  downloadFile,
);
router.delete(
  '/:id',
  param('id').notEmpty().isString(),
  deleteFile,
);

export default router;
