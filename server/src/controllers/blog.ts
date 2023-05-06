import 'reflect-metadata';

import { Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/db';
import logger from '../utils/logger';
import { RequestProps, PaginationQuery } from '../types';
import { getFiles, updateUserPostWithFiles, deleteFilesFromSystem } from './utils';

type PostBody = {
  title: string;
  body: string;
}

export const getPosts = (
  _req: RequestProps<object, object, PaginationQuery>,
  res: Response,
) => {
  res.status(200).send(res.locals.paginated);
};

export const addPost = async (
  req: RequestProps<object, PostBody, object>,
  res: Response,
) => {
  try {
    // const { id: userId } = res.locals.payload;
    const userId = '8b5eabe6-b5d6-4ebc-9b25-c7a0090af7fa';
    const { title, body } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    const files = getFiles(req.files as Express.Multer.File[] | undefined);
    await updateUserPostWithFiles({
      userId, title, body, files,
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};

/**
 * Controller to patch post data.
 * Since post may have some attached media files,
 * to update the psot all the related files are deleted first.
 * If the patch body have newly attached files, these are added to the post.
 */
export const patchPost = async (
  req: RequestProps<{ id: string }, PostBody, object>,
  res: Response,
) => {
  try {
    const { id: postId } = req.params;
    const { title, body } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    const filesToDelete = await deleteFilesFromSystem(postId);
    const files = getFiles(req.files as Express.Multer.File[] | undefined);
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        body,
        files: {
          // update = delete old + create new
          deleteMany: {
            id: { in: filesToDelete.map((f) => f.id) },
          },
          createMany: {
            data: files,
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

export const deletePost = async (
  req: RequestProps<{ id: string }, object, object >,
  res: Response,
) => {
  try {
    const { id: postId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.status(200).send();
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};
