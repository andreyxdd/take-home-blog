import 'reflect-metadata';

import { Response } from 'express';
import prisma from '../utils/db';
import logger from '../utils/logger';
import { validationResult } from 'express-validator';
import { RequestProps, PaginationQuery } from '../types';


type PostBody = {
  title: string;
  content: string;
}

export const getPosts = (_req: RequestProps<{}, PaginationQuery>, res: Response) => {
  return res.status(200).send(res.locals.paginated);
};

export const addPost = async (req: RequestProps<PostBody, {}>, res: Response) => {
  try {
    const { id: userId } = res.locals.payload;
    const { title, content } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

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

export const patchPost = async (req: RequestProps<PostBody, {id: number}>, res: Response) => {
  try {
    let { id: postId } = req.query;
    postId = Number(postId);
    const { title, content } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};



export const deletePost = async (req: RequestProps<{}, { id: number }>, res: Response) => {
  try {
    let { id: postId } = req.query;
    postId = Number(postId);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    await prisma.post.delete({
      where: { id: postId }
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};
