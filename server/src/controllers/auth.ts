import 'reflect-metadata';

import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import {
  createAccessToken, createRefreshToken, attachRefreshToken, revokeRefreshToken, attachAccessToken
} from '../utils/auth';
import prisma from '../utils/db';
import logger from '../utils/logger';
import { timeToUpdateRefreshToken } from '../utils/config';


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({where: { email }});
    if (existingUser) {
      return res.status(400).json({ details: 'User account already exists' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 12),
        name,
      }
    });

    if (!user) {
      return res.status(503).json({ details: 'Unable to register a new user' });
    }

    attachRefreshToken(res, createRefreshToken(user));
    attachAccessToken(res, createAccessToken(user.id));
    return res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({where: { email }});

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
    });
  } catch (e) {
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};


export const logout = async (_req: Request, res: Response) => {
  try {
    const id = res.locals.payload.id; // user id from auth middleware
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return res.status(404).json({ details: 'Invalid payload' });
    }

    const revokedStatus = await revokeRefreshToken(existingUser.id);
    if (!revokedStatus) {
      throw new Error('Tokens were not revoked')
    }

    attachRefreshToken(res, '');
    attachAccessToken(res, '');
    return res.status(200).send();
  } catch (e) {
    attachRefreshToken(res, '');
    attachAccessToken(res, '');
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
}


export const refreshTokens = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.rtjid;

    if (!refreshToken) {
      return res.status(401).json({ details: 'Access denied: not authenticated' });
    }

    // check if refresh token is valid
    const refreshPayload: any  = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (!('id' in refreshPayload) || !('tokenVersion' in refreshPayload)) { // not in
      return res.status(404).json({ details: 'Invalid payload' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: refreshPayload.id },
    });
    if (!existingUser) {
      return res.status(401).json({ details: 'Access denied: not authenticated' });
    }

    if (existingUser.tokenVersion !== refreshPayload.tokenVersion) {
      return res.status(401).json({ details: 'Access denied: not authenticated' });
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
    logger.info(e);
    return res.status(500).send({ details: e.message });
  }
};
