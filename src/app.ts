import express from 'express';
import { createBaseApp } from './basicService';

export const createApp = () => {
  const router = express.Router();

  return createBaseApp(router);
};
