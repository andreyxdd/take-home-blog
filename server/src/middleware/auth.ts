import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import logger from '../utils/logger';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403);
    return next(new Error('Access denied: not authorized'));
  }

  const token = authorization?.split(' ')[1];
  if (!token) {
    res.status(403);
    return next(new Error('Access denied: not authorized'));
  }

  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    res.locals.payload = payload;
    return next();
  } catch (e) {
    logger.error(e);
    res.status(403);
    return next(new Error('Access denied: not authorized'));
  }
};

export default auth;
