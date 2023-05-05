import { Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/db';
import { RequestProps } from '../types';
import logger from '../utils/logger';

export const downloadFile = async (
  req: RequestProps<object, { filename: string }>,
  res: Response,
) => {
  try {
    const { filename } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }
    const fileInfo = await prisma.file.findUnique({
      where: { filename },
    });

    if (!fileInfo) {
      return res.status(404).send({ details: 'File with given id doesn\'t exist' });
    }

    res.setHeader('Content-Disposition', `inline; filename*="${fileInfo.originalname}"`);
    return res.status(200).type(fileInfo.mimetype).sendFile(fileInfo.path);
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};

export const deleteFile = async (req: RequestProps<object, {filename?: string}>, res: Response) => {
  try {
    const { filename } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    await prisma.file.delete({
      where: { filename },
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};
