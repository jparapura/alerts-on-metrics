import express from 'express';
import { registerAliveEvent } from '../../metrics';

export const metricsRouter = express.Router();

metricsRouter.post('/register-alive', (req, res) => {
  const { status, source } = req.body;

  const registrationTime = registerAliveEvent();

  res.status(200).json({ status, source, registrationTime });
});
