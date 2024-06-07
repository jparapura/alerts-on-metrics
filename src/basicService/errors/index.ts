import { Response } from 'express';

const ERROR_DEFAULTS = {
  status: 500,
  message: 'Unknown error occurred'
};

export const sendError = (res: Response, status: number = ERROR_DEFAULTS.status, errorMessage: string = ERROR_DEFAULTS.message) => {
  res.status(status);
  res.json({
    error: {
      message: errorMessage
    }
  });
};