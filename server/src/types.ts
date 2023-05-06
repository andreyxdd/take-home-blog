import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

export type RequestProps<TParams, TBody, TQuery> = Request<
  TParams,
  any,
  TBody,
  TQuery
>;
export type ResponseProps<TBody, TLocal> = Response<TBody, Record<string, TLocal>>;

type IgnorePrismaBuiltins<S extends string> = string extends
  S ? string : S extends '' ? S : S extends `$${infer _T}` ? never : S;
export type PrismaModelName = IgnorePrismaBuiltins<keyof PrismaClient>;

export type PrismaSelectUnion = Prisma.UserSelect | Prisma.PostSelect | Prisma.FileSelect;

export type PrismaOrderBy<T> = {
  [K in keyof T]?: 'desc' | 'asc';
}

export type PaginationQuery = {
  page: number;
  limit: number;
}
