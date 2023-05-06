/**
 * Utility method for controllers
 */
import fs from 'fs';
import path from 'path';
import { File } from '@prisma/client';
import prisma from '../utils/db';

type FileProps = Pick<File, 'id' | 'originalname' | 'path' | 'mimetype' | 'size'>;

type UpdateUserPostWithFilesProps = {
  userId: string;
  title: string;
  body: string;
  files: Array<FileProps>;
}
/**
 * Prisma doesn't allow nested create statements (user->posts->files)
 * as a workaround, we creta posts and then find the most recent one
 * to add files to this post
 * TODO: Raw SQL should be used instead for the below operations
 * otherwise it might lead to the data lose
 */
export const updateUserPostWithFiles = async ({
  userId, title, body, files,
}: UpdateUserPostWithFilesProps) => {
  try {
    const insertData = await prisma.user.update({
      where: { id: userId },
      data: {
        posts: { create: { title, body } },
      },
      include: { posts: true },
    });

    if (files.length) {
      // looking for the most recently created post
      const lastPost = insertData.posts.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0];

      // adding files to this post
      await prisma.post.update({
        where: { id: lastPost.id },
        data: {
          files: {
            createMany: {
              data: files,
            },
          },
        },
      });
    }
  } catch (e) {
    throw new Error('Updates to the user post failed.');
  }
};

/**
 * Obtain files from the request body and put them in the necessary format.
 */
export const getFiles = (requestFiles: Express.Multer.File[] | undefined) => {
  let files: Array<FileProps> = [];
  if (requestFiles) {
    files = requestFiles.map((file) => {
      const {
        filename, originalname, path: filepath, mimetype, size,
      } = file;
      return {
        id: filename, originalname, path: filepath, mimetype, size: BigInt(size),
      };
    });
  }
  return files;
};

export const deleteSingleFileFromSystem = async (id: string) => {
  fs.rm(`${path.resolve(__dirname, '../..')}/uploads/${id}`, { recursive: true }, (err) => {
    if (err) {
      throw new Error(`Deletion of the File named ${id} failed`);
    }
  });
};

export const deleteManyFilesFromSystem = async (postId: string) => {
  const filesToDelete = await prisma.file.findMany({
    where: { postId },
  });

  if (filesToDelete.length) {
    filesToDelete.forEach(async (file) => {
      await deleteSingleFileFromSystem(file.id);
      return file;
    });
  }

  return filesToDelete;
};
