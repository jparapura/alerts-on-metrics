import express from 'express';
import { metricsRouter } from './metrics';

export const apiRouter = (): express.Router => {
  const router = express.Router();
  router.use('/metrics', metricsRouter);
  return router;
};
