import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import logger from '../utils/logger';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { jid } = req.cookies;

  if (!jid) {
    res.status(401);
    return next(new Error('Access denied: not authenticated'));
  }

  if (typeof jid !== "string") {
    res.status(401);
    return next(new Error('Access denied: not authenticated'));
  }

  try {
    const payload = verify(jid, process.env.ACCESS_TOKEN_SECRET!);
    res.locals.payload = payload;
    return next();
  } catch (e) {
    logger.error(e);
    res.status(401);
    return next(new Error('Access denied: not authenticated'));
  }
};

export default auth;
