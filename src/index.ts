import { createApp } from "./app";
import { logError, logInfo } from "./basicService/logging/applicationLogging";

const port = process.env.PORT || 8080;

try {
  const app = createApp();

  app.listen(port, () => {
    logInfo(`Application is listening on port ${port}.`);
  })
} catch (err) {
  logError(`Could not start application. Reason: ${err}`);
  process.kill(process.pid, 'SIGINT');
}