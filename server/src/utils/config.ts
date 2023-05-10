import { CookieOptions } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// const isProduction = process.env.NODE_ENV !== 'production';

export const corsOptions = {
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type',
    'Accept', 'X-Access-Token', 'Authorization',
  ],
  credentials: true, // this allows to send cookies back (to client)
  origin: process.env.BASE_DOMAIN,
  methods: 'GET,HEAD,OPTIONS,PATCH,DELETE',
  preflightContinue: false,
};

export const cookiesOptions: CookieOptions = {
  // httpOnly: true,
  // secure: isProduction,
  sameSite: 'lax',
  path: '/',
};

export const timeToUpdateRefreshToken = 7 * 24 * 60 * 60; // seven days
