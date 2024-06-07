import express from 'express';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/', (req: express.Request, res: express.Response) => {
  const status = 'ok';
  res.status(200);
  res.json({ status });
});