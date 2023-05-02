import 'reflect-metadata';
import logger from './utils/logger';
import express from 'express';

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});

export default app;