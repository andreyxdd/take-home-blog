/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { User } from '@prisma/client';

import prisma from './db';
import { cookiesOptions } from './config';
import logger from './logger';

export const createAccessToken = (userId: string) => sign(
  { id: userId },
  process.env.ACCESS_TOKEN_SECRET!,
  { expiresIn: '15min' },
);

export const createRefreshToken = (user: Pick<User, 'id' | 'tokenVersion'>) => sign(
  { id: user.id, tokenVersion: user.tokenVersion },
  process.env.REFRESH_TOKEN_SECRET!,
  { expiresIn: '7d' },
);

export const attachRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('rt', refreshToken, { //
    ...cookiesOptions,
    maxAge: refreshToken ? 7 * 24 * 60 * 60 * 1000 : 0, // 7 days
  });
};

export const attachAccessToken = (res: Response, accessToken: string) => {
  res.cookie('at', accessToken, {
    ...cookiesOptions,
    maxAge: accessToken ? 15 * 1000 : 0, // 15 min
  });
};

export const revokeRefreshToken = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        tokenVersion: { increment: 1 },
      },
    });
  } catch (e) {
    logger.error(e);
    return false;
  }
  return true;
};
