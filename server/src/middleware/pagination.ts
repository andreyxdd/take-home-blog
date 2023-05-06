/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {
  PrismaModelName, PrismaSelectUnion, PrismaOrderBy, RequestProps, PaginationQuery,
} from '../types';
import prisma from '../utils/db';
import logger from '../utils/logger';

type PaginationResults<T> = {
  data?: T;
  totalPages: number;
}

function pagination(
  modelName: PrismaModelName,
  select: PrismaSelectUnion, // select query for prisma
  orderBy: PrismaOrderBy<PrismaSelectUnion>, // sorting settings for prisma
) {
  return async (
    req: RequestProps<object, object, PaginationQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { page, limit }: PaginationQuery = req.query;
    page = Number(page);
    limit = Number(limit);

    const startIndex = (page - 1) * limit;
    const paginated: PaginationResults<PrismaModelName> = {
      totalPages: 0,
    };

    try {
      const model = prisma[modelName];
      // @ts-ignore
      paginated.data = await model.findMany({
        skip: startIndex,
        take: limit,
        select,
        orderBy,
      });

      // @ts-ignore
      const totalCount = await model.count();
      paginated.totalPages = Math.ceil(totalCount / limit);
      res.locals.paginated = paginated;

      return next();
    } catch (e) {
      logger.error(e);
      return res.status(500).send({ details: 'Pagination failed' });
    }
  };
}

export default pagination;
