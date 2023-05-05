import 'reflect-metadata';

import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {
  createAccessToken, createRefreshToken,
  attachRefreshToken, revokeRefreshToken,
  attachAccessToken,
} from '../utils/auth';
import prisma from '../utils/db';
import logger from '../utils/logger';
import { timeToUpdateRefreshToken } from '../utils/config';
import { RequestProps } from '../types';

export const getUser = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload;
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!existingUser) {
      return res.status(404).send({ details: 'User with given id doesn\'t exist' });
    }

    return res.status(200).send(existingUser);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ details: e.message });
  }
};

type RegisterBodyProps = {
  email: string;
  password: string;
  name: string;
}
export const register = async (
  req: RequestProps<RegisterBodyProps, object>,
  res: Response,
) => {
  try {
    const { email, password, name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ details: 'User account already exists' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 12),
        name,
      },
    });

    if (!user) {
      return res.status(503).json({ details: 'Unable to register a new user' });
    }

    attachRefreshToken(res, createRefreshToken(user));
    attachAccessToken(res, createAccessToken(user.id));
    return res.status(200).send({
      email: user.email,
      name: user.name,
      id: user.id,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ details: e.message });
  }
};

type LoginBodyProps = {
  email: string;
  password: string;
}
export const login = async (
  req: RequestProps<LoginBodyProps, object>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ details: errors.array() });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(401).json({ details: 'Invalid credentials provided' });
    }

    const passwordIsValid = await compare(password, existingUser.password!);
    if (!passwordIsValid) {
      return res.status(401).json({ details: 'Invalid credentials provided' });
    }

    attachRefreshToken(res, createRefreshToken(existingUser));
    attachAccessToken(res, createAccessToken(existingUser.id));
    return res.status(200).send({
      email: existingUser.email,
      name: existingUser.name,
      id: existingUser.id,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ details: e.message });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.payload; // user id from auth middleware
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return res.status(404).json({ details: 'Invalid payload' });
    }

    const revokedStatus = await revokeRefreshToken(existingUser.id);
    if (!revokedStatus) {
      throw new Error('Tokens were not revoked');
    }

    attachRefreshToken(res, '');
    attachAccessToken(res, '');
    return res.status(200).send();
  } catch (e) {
    attachRefreshToken(res, '');
    attachAccessToken(res, '');
    logger.error(e);
    return res.status(500).send({ details: e.message });
  }
};

export const refreshTokens = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.rt;

    if (!refreshToken) {
      return res.status(401).send({ details: 'Access denied: not authorized' });
    }

    // check if refresh token is valid
    const refreshPayload: any = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (!('id' in refreshPayload) || !('tokenVersion' in refreshPayload)) { // not in
      return res.status(404).send({ details: 'Invalid payload' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: refreshPayload.id },
    });
    if (!existingUser) {
      return res.status(401).send({ details: 'Access denied: not authorized' });
    }

    if (existingUser.tokenVersion !== refreshPayload.tokenVersion) {
      return res.status(401).send({ details: 'Access denied: not authorized' });
    }

    // check if the refresh token has expired
    const expiration = new Date(refreshPayload.exp * 1000);
    const now = new Date();
    const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000;
    if (secondsUntilExpiration < timeToUpdateRefreshToken) {
      attachRefreshToken(res, createRefreshToken(existingUser));
    }
    attachAccessToken(res, createAccessToken(existingUser.id));

    return res.status(200).send();
  } catch (e) {
    attachRefreshToken(res, '');
    attachAccessToken(res, '');
    logger.error(e);
    return res.status(500).send({ details: e.message });
  }
};
