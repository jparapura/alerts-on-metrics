import express from 'express';
import { createBaseApp } from './basicService';
import { apiRouter } from './api';

export const createExpressApp = () => {
  const router = express.Router();
  router.use('/api', apiRouter());

  return createBaseApp(router);
};
