import express from "express";
import { healthCheckRouter } from "./health";
import { sendError } from "./errors";

export const createBaseApp = (router: express.Router) => {
  const app = express();

  app.use('/health', healthCheckRouter);

  app.use(router);
  app.use((req, res) => {
    sendError(res, 404, 'Invalid endpoint or URL param.');
  })

  return app;
}