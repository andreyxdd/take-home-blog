import 'reflect-metadata';

import express from 'express';

import swaggerUI from 'swagger-ui-express';
import coockieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import bodyParser from 'body-parser';

import swaggerConfig from '../docs';
import { version } from '../package.json';

import { corsOptions } from './utils/config';
import logger from './utils/logger';

import authRoute from './routes/auth';
import blogRoute from './routes/blog';
import fileRoute from './routes/files';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

// -- GLOBAL MIDDLEWARE
// Enable CORS (Access-Control-Allow-Origin: only from the client!)
app.use(cors(corsOptions));

// Enable body/cookies parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coockieParser());

// Security Headers
app.use(helmet());

// Preventing parameter tampering
app.use(hpp());

// Rate Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests! Please try again in an hour!',
});
app.use('/api', limiter);

// documentation interface
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Blog API Docs',
};
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig, options));

// Compress the responses
app.use(compression());
// --

// -- ENDPOINTS
app.get('/', (_, res) => {
  res.send(`API version ${version}`);
});
app.use('/api/auth', authRoute);
app.use('/api/blog', blogRoute);
app.use('/api/files', fileRoute);
// --

app.listen(PORT, () => {
  logger.info(`Server is running at port ${PORT}`);
});

export default app;
