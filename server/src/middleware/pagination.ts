import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { PrismaModelName, RequestProps, PaginationQuery } from '../types'
import prisma from '../utils/db';
import logger from '../utils/logger';

type PaginationResults = {
  next?: PaginationQuery;
  previous?: PaginationQuery;
  data?: any;
}

function pagination(
  modelName: PrismaModelName,
  select: any = {},
) {
  return async (
    req: RequestProps<{}, PaginationQuery>,
    res: Response,
    next: NextFunction
  ) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { page, limit }: PaginationQuery = req.query;
    page = Number(page);
    limit = Number(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginated: PaginationResults = {};

    const model = prisma[modelName];

    // @ts-ignore
    const totalCount = await model.count()

    if (endIndex < totalCount) {
      paginated.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      paginated.previous = {
        page: page - 1,
        limit: limit
      }
    }

    try {
      // @ts-ignore
      paginated.data = await model.findMany({
        skip: startIndex,
        take: limit,
        select,
      })
      res.locals.paginated = paginated;

      return next();
    } catch (e) {
      logger.error(e);
      return res.status(500).send({ details: 'Pagination failed' });
    }
  }
}
  
export default pagination;