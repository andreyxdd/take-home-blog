import 'reflect-metadata';

import { Request, Response } from 'express';
import prisma from '../utils/db';
import logger from '../utils/logger';

export const getPosts = (_req: Request, res: Response) => {
  return res.status(200).send(res.locals.paginated);
};

export const addPost = async (req: Request, res: Response) => {
  try {
    // const { id: userId } = res.locals.payload;
    const userId  ="41b9ff05-be0d-4e03-83db-f66f86841fe1"
    const { title, content } = req.body;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        posts: {
          create: {
            title,
            content,
          },
        },
      },
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};

