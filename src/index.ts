import { createExpressApp } from './express';
import { logError, logInfo } from './basicService/logging/applicationLogging';
import { startApp } from './app';

const port = process.env.PORT || 8080;

try {
  const express = createExpressApp();

  startApp();

  express.listen(port, () => {
    logInfo(`Application is listening on port ${port}.`);
  });
} catch (err) {
  logError(`Could not start application. Reason: ${err}`);
  process.kill(process.pid, 'SIGINT');
}
