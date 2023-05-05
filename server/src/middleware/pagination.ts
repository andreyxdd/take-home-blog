/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { PrismaModelName, RequestProps, PaginationQuery } from '../types';
import prisma from '../utils/db';
import logger from '../utils/logger';

type PaginationResults = {
  data?: any;
  totalPages: number;
}

function pagination(
  modelName: PrismaModelName,
  select: any = {},
  orderBy: any = {},
) {
  return async (
    req: RequestProps<object, PaginationQuery>,
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
    const paginated: PaginationResults = {
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
