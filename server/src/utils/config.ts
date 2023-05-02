import { CookieOptions } from 'express';

require('dotenv').config();

export const corsOptions = {
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type',
    'Accept', 'X-Access-Token', 'Authorization',
  ],
  credentials: true, // this allows to send cookies back (to client)
  methods: 'GET,HEAD,OPTIONS',
  preflightContinue: false,
};

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  // secure: isProduction,
  secure: true,
  // sameSite: (isProduction ? 'strict' : 'lax'),
  sameSite: 'none',
  // domain: process.env.BASE_DOMAIN,
  path: '/',
};

export const timeToUpdateRefreshToken = 7 * 24 * 60 * 60; // seven days
