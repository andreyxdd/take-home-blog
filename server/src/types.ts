import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export type RequestProps<TBody, TQuery> = Request<any, any, TBody, TQuery>;
export type ResponseProps<TBody, TLocal> = Response<TBody, Record<string, TLocal>>;

type IgnorePrismaBuiltins<S extends string> = string extends
  S ? string : S extends '' ? S : S extends `$${infer _T}` ? never : S;
export type PrismaModelName = IgnorePrismaBuiltins<keyof PrismaClient>;

export type PaginationQuery = {
  page: number;
  limit: number;
}
