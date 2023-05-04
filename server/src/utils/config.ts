import { CookieOptions } from 'express';

require('dotenv').config();

const isProduction = process.env.NODE_ENV !== 'production';

export const corsOptions = {
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type',
    'Accept', 'X-Access-Token', 'Authorization',
  ],
  credentials: true, // this allows to send cookies back (to client)
  origin: "http://localhost:3000",
  methods: 'GET,HEAD,OPTIONS,PATCH',
  preflightContinue: false,
};

export const cookiesOptions: CookieOptions = {
  // httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'strict' : 'lax'),
  domain: isProduction ? process.env.BASE_DOMAIN : '*',
  path: '/',
};

export const timeToUpdateRefreshToken = 7 * 24 * 60 * 60; // seven days
